/**
 * Weather AI Agent - Entry Point
 * 
 * A smart weather assistant built with:
 * - Mastra AI Agent framework
 * - DeepSeek AI for natural language processing
 * - OpenWeatherMap API for real-time weather data
 * - TypeScript for type safety
 */

import './server';

// Re-export main components for external use
export { mastra, weatherAgent } from './mastra';
export { WeatherService } from './services/weatherService';
export { weatherTools } from './tools/weatherTools';
export * from './types/weather';
