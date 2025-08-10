import { Tool } from '@mastra/core';
import { WeatherService } from '../services/weatherService';
import { WeatherParams, LocationParams } from '../types/weather';

const weatherService = new WeatherService();

/**
 * Tool to get current weather for a location
 */
export const getCurrentWeatherTool = new Tool({
  id: 'get_current_weather',
  description: 'Get current weather information for a specific location',
  inputSchema: {
    type: 'object',
    properties: {
      location: {
        type: 'string',
        description: 'The city name, state, and/or country (e.g., "London, UK" or "New York, NY, US")',
      },
    },
    required: ['location'],
  },
  execute: async ({ location }: { location: string }) => {
    try {
      const weatherData = await weatherService.getCurrentWeather(location);
      return {
        success: true,
        data: weatherData,
        message: `Successfully retrieved current weather for ${weatherData.location.name}, ${weatherData.location.country}`,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        message: `Failed to get weather for ${location}: ${error.message}`,
      };
    }
  },
});

/**
 * Tool to get weather forecast for a location
 */
export const getWeatherForecastTool = new Tool({
  id: 'get_weather_forecast',
  description: 'Get weather forecast for a specific location',
  inputSchema: {
    type: 'object',
    properties: {
      location: {
        type: 'string',
        description: 'The city name, state, and/or country (e.g., "London, UK" or "New York, NY, US")',
      },
      days: {
        type: 'number',
        description: 'Number of days to forecast (1-5)',
        minimum: 1,
        maximum: 5,
        default: 5,
      },
    },
    required: ['location'],
  },
  execute: async ({ location, days = 5 }: { location: string; days?: number }) => {
    try {
      const forecastData = await weatherService.getForecast(location, days);
      return {
        success: true,
        data: forecastData,
        message: `Successfully retrieved ${days}-day forecast for ${location}`,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        message: `Failed to get forecast for ${location}: ${error.message}`,
      };
    }
  },
});

/**
 * Tool to get comprehensive weather data (current + forecast)
 */
export const getComprehensiveWeatherTool = new Tool({
  id: 'get_comprehensive_weather',
  description: 'Get comprehensive weather information including current conditions and forecast for a specific location',
  inputSchema: {
    type: 'object',
    properties: {
      location: {
        type: 'string',
        description: 'The city name, state, and/or country (e.g., "London, UK" or "New York, NY, US")',
      },
      includeForecast: {
        type: 'boolean',
        description: 'Whether to include forecast data',
        default: true,
      },
      days: {
        type: 'number',
        description: 'Number of days to forecast (1-5)',
        minimum: 1,
        maximum: 5,
        default: 5,
      },
    },
    required: ['location'],
  },
  execute: async ({ location, includeForecast = true, days = 5 }: WeatherParams) => {
    try {
      const weatherData = await weatherService.getWeatherData({
        location,
        includeForecast,
        days,
      });
      return {
        success: true,
        data: weatherData,
        message: `Successfully retrieved comprehensive weather data for ${weatherData.location.name}, ${weatherData.location.country}`,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        message: `Failed to get weather data for ${location}: ${error.message}`,
      };
    }
  },
});

/**
 * Tool to search for locations
 */
export const searchLocationsTool = new Tool({
  id: 'search_locations',
  description: 'Search for locations to get accurate city names and coordinates',
  inputSchema: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'The location search query (city name, state, country)',
      },
      limit: {
        type: 'number',
        description: 'Maximum number of results to return (1-10)',
        minimum: 1,
        maximum: 10,
        default: 5,
      },
    },
    required: ['query'],
  },
  execute: async ({ query, limit = 5 }: LocationParams) => {
    try {
      const locations = await weatherService.searchLocations({ query, limit });
      return {
        success: true,
        data: locations,
        message: `Found ${locations.length} location(s) matching "${query}"`,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        message: `Failed to search for locations: ${error.message}`,
      };
    }
  },
});

// Export all tools as an array
export const weatherTools = [
  getCurrentWeatherTool,
  getWeatherForecastTool,
  getComprehensiveWeatherTool,
  searchLocationsTool,
];
