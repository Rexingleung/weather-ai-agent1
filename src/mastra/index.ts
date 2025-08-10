import { Mastra } from '@mastra/core';
import { weatherAgent } from '../agents/weatherAgent';
import { env } from '../config/environment';

/**
 * Main Mastra instance configuration
 * Registers the weather agent and sets up the framework
 */
export const mastra = new Mastra({
  agents: {
    weatherAgent,
  },
  // Add any global configuration here
  logger: {
    level: env.mastra.logLevel as any,
  },
});

// Export the weather agent for direct access
export { weatherAgent };
