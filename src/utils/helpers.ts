/**
 * Utility functions for the weather AI agent
 */

/**
 * Convert temperature from Celsius to Fahrenheit
 */
export function celsiusToFahrenheit(celsius: number): number {
  return Math.round((celsius * 9/5) + 32);
}

/**
 * Convert temperature from Fahrenheit to Celsius
 */
export function fahrenheitToCelsius(fahrenheit: number): number {
  return Math.round((fahrenheit - 32) * 5/9);
}

/**
 * Convert wind speed from m/s to km/h
 */
export function msToKmh(ms: number): number {
  return Math.round(ms * 3.6);
}

/**
 * Convert wind speed from m/s to mph
 */
export function msToMph(ms: number): number {
  return Math.round(ms * 2.237);
}

/**
 * Get wind direction from degrees
 */
export function getWindDirection(degrees: number): string {
  const directions = [
    'N', 'NNE', 'NE', 'ENE',
    'E', 'ESE', 'SE', 'SSE',
    'S', 'SSW', 'SW', 'WSW',
    'W', 'WNW', 'NW', 'NNW'
  ];
  
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}

/**
 * Get weather emoji based on weather condition
 */
export function getWeatherEmoji(condition: string, icon: string): string {
  const conditionLower = condition.toLowerCase();
  
  if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
    return '☀️';
  }
  if (conditionLower.includes('cloud')) {
    return icon.includes('n') ? '☁️' : '⛅';
  }
  if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
    return '🌧️';
  }
  if (conditionLower.includes('thunder') || conditionLower.includes('storm')) {
    return '⛈️';
  }
  if (conditionLower.includes('snow')) {
    return '❄️';
  }
  if (conditionLower.includes('fog') || conditionLower.includes('mist')) {
    return '🌫️';
  }
  
  return '🌤️'; // Default
}

/**
 * Format date string to readable format
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Get clothing recommendation based on temperature
 */
export function getClothingRecommendation(temp: number): string {
  if (temp < 0) {
    return 'Heavy winter coat, gloves, and warm layers';
  } else if (temp < 10) {
    return 'Warm jacket or coat';
  } else if (temp < 20) {
    return 'Light jacket or sweater';
  } else if (temp < 25) {
    return 'Long sleeves or light layers';
  } else if (temp < 30) {
    return 'T-shirt and comfortable clothing';
  } else {
    return 'Light, breathable clothing and sun protection';
  }
}

/**
 * Get activity recommendation based on weather
 */
export function getActivityRecommendation(temp: number, condition: string, windSpeed: number): string {
  const conditionLower = condition.toLowerCase();
  
  if (conditionLower.includes('rain') || conditionLower.includes('storm')) {
    return 'Indoor activities recommended - maybe visit a museum or café';
  }
  
  if (temp < 0) {
    return 'Bundle up for winter sports or enjoy indoor activities';
  } else if (temp > 30 && conditionLower.includes('clear')) {
    return 'Great for swimming, but avoid prolonged sun exposure';
  } else if (temp >= 15 && temp <= 25 && !conditionLower.includes('rain')) {
    return 'Perfect weather for outdoor activities like walking or cycling';
  } else if (windSpeed > 10) {
    return 'Windy conditions - good for kite flying but dress warmly';
  }
  
  return 'Enjoy the day with appropriate clothing for the conditions';
}

/**
 * Validate location string
 */
export function validateLocation(location: string): boolean {
  return location && location.trim().length > 0 && location.length <= 100;
}

/**
 * Parse location string to extract city, state, country
 */
export function parseLocation(location: string): { city: string; state?: string; country?: string } {
  const parts = location.split(',').map(part => part.trim());
  
  if (parts.length === 1) {
    return { city: parts[0] };
  } else if (parts.length === 2) {
    return { city: parts[0], country: parts[1] };
  } else if (parts.length === 3) {
    return { city: parts[0], state: parts[1], country: parts[2] };
  }
  
  return { city: location };
}
