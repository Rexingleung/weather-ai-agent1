import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { mastra, weatherAgent } from './mastra';
import { env } from './config/environment';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: env.server.nodeEnv,
  });
});

// Weather agent endpoint
app.post('/api/weather/chat', async (req, res) => {
  try {
    const { message, messages } = req.body;
    
    if (!message && !messages) {
      return res.status(400).json({
        error: 'Message or messages array is required',
      });
    }

    // Handle single message or message array
    const messageInput = messages || [message];
    
    const response = await weatherAgent.generate(messageInput);
    
    res.json({
      success: true,
      response: response.text,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error processing weather chat:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message,
    });
  }
});

// Get weather for location endpoint
app.get('/api/weather/:location', async (req, res) => {
  try {
    const { location } = req.params;
    const { forecast = 'true', days = '5' } = req.query;
    
    const message = `Get ${forecast === 'true' ? 'comprehensive' : 'current'} weather for ${location}${forecast === 'true' ? ` with ${days} day forecast` : ''}`;
    
    const response = await weatherAgent.generate(message);
    
    res.json({
      success: true,
      location,
      response: response.text,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error getting weather:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message,
    });
  }
});

// API documentation endpoint
app.get('/api/docs', (req, res) => {
  res.json({
    title: 'Weather AI Agent API',
    version: '1.0.0',
    description: 'AI-powered weather information service using DeepSeek and OpenWeatherMap',
    endpoints: {
      'GET /health': 'Health check endpoint',
      'POST /api/weather/chat': 'Chat with the weather agent',
      'GET /api/weather/:location': 'Get weather for a specific location',
      'GET /api/docs': 'This documentation',
    },
    examples: {
      chat: {
        url: 'POST /api/weather/chat',
        body: {
          message: 'What\'s the weather like in Tokyo?',
        },
      },
      weather: {
        url: 'GET /api/weather/London,UK?forecast=true&days=3',
        description: 'Get 3-day forecast for London, UK',
      },
    },
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: 'The requested endpoint does not exist',
    availableEndpoints: ['/health', '/api/weather/chat', '/api/weather/:location', '/api/docs'],
  });
});

// Error handler
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: env.server.nodeEnv === 'development' ? error.message : 'Something went wrong',
  });
});

// Start server
const PORT = env.server.port;

app.listen(PORT, () => {
  console.log(`\n🌤️  Weather AI Agent Server is running!`);
  console.log(`📍 Server: http://localhost:${PORT}`);
  console.log(`🏥 Health: http://localhost:${PORT}/health`);
  console.log(`📚 Docs: http://localhost:${PORT}/api/docs`);
  console.log(`🤖 Chat: POST http://localhost:${PORT}/api/weather/chat`);
  console.log(`🌡️  Weather: GET http://localhost:${PORT}/api/weather/:location`);
  console.log(`\n🚀 Ready to provide weather information!\n`);
});

export default app;
