import axios from 'axios';
import { env } from '../config/environment';
import {
  WeatherData,
  OpenWeatherCurrentResponse,
  OpenWeatherForecastResponse,
  ForecastDay,
  LocationResult,
  WeatherParams,
  LocationParams
} from '../types/weather';

export class WeatherService {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor() {
    this.apiKey = env.openWeather.apiKey;
    this.baseUrl = env.openWeather.baseUrl;
  }

  /**
   * Search for locations by name
   */
  async searchLocations(params: LocationParams): Promise<LocationResult[]> {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct`,
        {
          params: {
            q: params.query,
            limit: params.limit || 5,
            appid: this.apiKey,
          },
        }
      );

      return response.data.map((item: any) => ({
        name: item.name,
        country: item.country,
        state: item.state,
        lat: item.lat,
        lon: item.lon,
      }));
    } catch (error) {
      console.error('Error searching locations:', error);
      throw new Error('Failed to search locations');
    }
  }

  /**
   * Get current weather data for a location
   */
  async getCurrentWeather(location: string): Promise<WeatherData> {
    try {
      const response = await axios.get<OpenWeatherCurrentResponse>(
        `${this.baseUrl}/weather`,
        {
          params: {
            q: location,
            appid: this.apiKey,
            units: 'metric',
          },
        }
      );

      const data = response.data;
      return this.transformCurrentWeather(data);
    } catch (error: any) {
      console.error('Error fetching current weather:', error);
      if (error.response?.status === 404) {
        throw new Error(`Location "${location}" not found`);
      }
      throw new Error('Failed to fetch weather data');
    }
  }

  /**
   * Get weather forecast for a location
   */
  async getForecast(location: string, days: number = 5): Promise<ForecastDay[]> {
    try {
      const response = await axios.get<OpenWeatherForecastResponse>(
        `${this.baseUrl}/forecast`,
        {
          params: {
            q: location,
            appid: this.apiKey,
            units: 'metric',
            cnt: days * 8, // 8 forecasts per day (3-hour intervals)
          },
        }
      );

      return this.transformForecast(response.data);
    } catch (error: any) {
      console.error('Error fetching forecast:', error);
      if (error.response?.status === 404) {
        throw new Error(`Location "${location}" not found`);
      }
      throw new Error('Failed to fetch forecast data');
    }
  }

  /**
   * Get comprehensive weather data (current + forecast)
   */
  async getWeatherData(params: WeatherParams): Promise<WeatherData> {
    try {
      const currentWeather = await this.getCurrentWeather(params.location);
      
      if (params.includeForecast) {
        const forecast = await this.getForecast(params.location, params.days || 5);
        currentWeather.forecast = forecast;
      }

      return currentWeather;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  }

  /**
   * Transform OpenWeatherMap current weather response to our format
   */
  private transformCurrentWeather(data: OpenWeatherCurrentResponse): WeatherData {
    return {
      location: {
        name: data.name,
        country: data.sys.country,
        lat: data.coord.lat,
        lon: data.coord.lon,
      },
      current: {
        temperature: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        windSpeed: data.wind.speed,
        windDirection: data.wind.deg,
        visibility: data.visibility / 1000, // Convert to km
        uvIndex: 0, // Not available in current weather API
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      },
    };
  }

  /**
   * Transform OpenWeatherMap forecast response to our format
   */
  private transformForecast(data: OpenWeatherForecastResponse): ForecastDay[] {
    const dailyForecasts: { [date: string]: any[] } = {};

    // Group forecasts by date
    data.list.forEach((item) => {
      const date = item.dt_txt.split(' ')[0];
      if (!dailyForecasts[date]) {
        dailyForecasts[date] = [];
      }
      dailyForecasts[date].push(item);
    });

    // Convert to daily summaries
    return Object.entries(dailyForecasts).map(([date, forecasts]) => {
      const temps = forecasts.map((f) => f.main.temp);
      const minTemp = Math.min(...temps);
      const maxTemp = Math.max(...temps);
      const avgHumidity = forecasts.reduce((sum, f) => sum + f.main.humidity, 0) / forecasts.length;
      const avgWindSpeed = forecasts.reduce((sum, f) => sum + f.wind.speed, 0) / forecasts.length;
      const maxPrecipChance = Math.max(...forecasts.map((f) => f.pop * 100));
      
      // Use the most common weather description
      const descriptions = forecasts.map((f) => f.weather[0].description);
      const description = descriptions[0]; // Simplified: use first description

      return {
        date,
        temperature: {
          min: Math.round(minTemp),
          max: Math.round(maxTemp),
        },
        description,
        humidity: Math.round(avgHumidity),
        windSpeed: Math.round(avgWindSpeed),
        precipitationChance: Math.round(maxPrecipChance),
      };
    });
  }
}
