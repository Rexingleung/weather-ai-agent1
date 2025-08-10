import { WeatherService } from '../src/services/weatherService';
import { 
  celsiusToFahrenheit, 
  fahrenheitToCelsius, 
  getWindDirection, 
  getWeatherEmoji,
  validateLocation,
  parseLocation
} from '../src/utils/helpers';

// Mock environment for testing
jest.mock('../src/config/environment', () => ({
  env: {
    openWeather: {
      apiKey: 'test-api-key',
      baseUrl: 'https://api.openweathermap.org/data/2.5'
    }
  }
}));

describe('Weather Utility Functions', () => {
  describe('Temperature Conversion', () => {
    test('should convert Celsius to Fahrenheit correctly', () => {
      expect(celsiusToFahrenheit(0)).toBe(32);
      expect(celsiusToFahrenheit(100)).toBe(212);
      expect(celsiusToFahrenheit(25)).toBe(77);
      expect(celsiusToFahrenheit(-10)).toBe(14);
    });

    test('should convert Fahrenheit to Celsius correctly', () => {
      expect(fahrenheitToCelsius(32)).toBe(0);
      expect(fahrenheitToCelsius(212)).toBe(100);
      expect(fahrenheitToCelsius(77)).toBe(25);
      expect(fahrenheitToCelsius(14)).toBe(-10);
    });
  });

  describe('Wind Direction', () => {
    test('should return correct wind direction', () => {
      expect(getWindDirection(0)).toBe('N');
      expect(getWindDirection(90)).toBe('E');
      expect(getWindDirection(180)).toBe('S');
      expect(getWindDirection(270)).toBe('W');
      expect(getWindDirection(45)).toBe('NE');
    });
  });

  describe('Weather Emoji', () => {
    test('should return correct emoji for weather conditions', () => {
      expect(getWeatherEmoji('clear sky', '01d')).toBe('☀️');
      expect(getWeatherEmoji('few clouds', '02d')).toBe('⛅');
      expect(getWeatherEmoji('light rain', '10d')).toBe('🌧️');
      expect(getWeatherEmoji('thunderstorm', '11d')).toBe('⛈️');
      expect(getWeatherEmoji('snow', '13d')).toBe('❄️');
    });
  });

  describe('Location Validation', () => {
    test('should validate location strings correctly', () => {
      expect(validateLocation('London')).toBe(true);
      expect(validateLocation('New York, NY')).toBe(true);
      expect(validateLocation('')).toBe(false);
      expect(validateLocation('   ')).toBe(false);
      expect(validateLocation('a'.repeat(101))).toBe(false);
    });

    test('should parse location strings correctly', () => {
      expect(parseLocation('London')).toEqual({ city: 'London' });
      expect(parseLocation('London, UK')).toEqual({ city: 'London', country: 'UK' });
      expect(parseLocation('New York, NY, US')).toEqual({ city: 'New York', state: 'NY', country: 'US' });
    });
  });
});

describe('WeatherService', () => {
  let weatherService: WeatherService;

  beforeEach(() => {
    weatherService = new WeatherService();
  });

  // Note: These tests would require API mocking for full implementation
  test('should initialize correctly', () => {
    expect(weatherService).toBeInstanceOf(WeatherService);
  });
});
