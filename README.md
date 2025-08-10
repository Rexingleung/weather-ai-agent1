# 🌤️ Weather AI Agent

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Mastra](https://img.shields.io/badge/Mastra-AI_Framework-blue?style=for-the-badge)](https://mastra.ai/)
[![DeepSeek](https://img.shields.io/badge/DeepSeek-AI_Model-purple?style=for-the-badge)](https://api.deepseek.com/)
[![OpenWeatherMap](https://img.shields.io/badge/OpenWeatherMap-API-orange?style=for-the-badge)](https://openweathermap.org/)

A smart, conversational weather AI agent built with **Mastra AI framework**, **TypeScript**, and **DeepSeek API**. Get intelligent weather information, forecasts, and personalized recommendations through natural language conversations.

## ✨ Features

- 🤖 **Intelligent Conversations**: Natural language weather queries powered by DeepSeek AI
- 🌍 **Global Coverage**: Weather data for any location worldwide
- 📅 **5-Day Forecasts**: Detailed weather predictions with daily breakdowns
- 🔍 **Smart Location Search**: Automatic location disambiguation and suggestions
- 💡 **Contextual Recommendations**: Clothing and activity suggestions based on weather
- 🚀 **Fast & Reliable**: Built on Mastra's production-ready framework
- 📱 **REST API**: Easy integration with web and mobile applications
- 🎯 **Type-Safe**: Full TypeScript implementation with comprehensive type definitions

## 🏗️ Tech Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| **AI Framework** | [Mastra](https://mastra.ai/) | Agent orchestration and workflow management |
| **LLM Provider** | [DeepSeek API](https://api.deepseek.com/) | Natural language processing and understanding |
| **Weather Data** | [OpenWeatherMap](https://openweathermap.org/) | Real-time weather information and forecasts |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Type-safe development |
| **Runtime** | [Node.js](https://nodejs.org/) | Server runtime environment |
| **Web Framework** | [Express.js](https://expressjs.com/) | REST API server |

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0.0 or higher
- **npm** or **yarn** package manager
- **DeepSeek API Key** ([Get one here](https://api.deepseek.com/))
- **OpenWeatherMap API Key** ([Get one here](https://openweathermap.org/api))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rexingleung/weather-ai-agent1.git
   cd weather-ai-agent1
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your API keys:
   ```env
   # DeepSeek API Configuration
   DEEPSEEK_API_KEY=your_deepseek_api_key_here
   DEEPSEEK_BASE_URL=https://api.deepseek.com
   
   # OpenWeatherMap API Configuration
   OPENWEATHER_API_KEY=your_openweathermap_api_key_here
   OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5
   
   # Server Configuration
   PORT=4111
   NODE_ENV=development
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **🎉 Your weather agent is ready!**
   - Server: http://localhost:4111
   - Health Check: http://localhost:4111/health
   - API Docs: http://localhost:4111/api/docs

## 🎯 Usage Examples

### Chat with the Agent

```bash
curl -X POST http://localhost:4111/api/weather/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What'\''s the weather like in Tokyo?"}'
```

### Get Weather for a Location

```bash
# Current weather
curl http://localhost:4111/api/weather/London,UK

# 3-day forecast
curl "http://localhost:4111/api/weather/New York,NY,US?forecast=true&days=3"
```

### Example Conversations

| Query | Agent Response |
|-------|---------------|
| "What's the weather in Paris?" | "It's currently 18°C and partly cloudy in Paris, France with light winds at 8 km/h. Perfect weather for a stroll along the Seine! 🌤️" |
| "Should I bring an umbrella to London tomorrow?" | "Yes, I'd recommend bringing an umbrella! Tomorrow shows a 70% chance of rain in London with scattered showers expected in the afternoon. ☔" |
| "What's the 5-day outlook for Tokyo?" | "Here's Tokyo's 5-day forecast: Sunny and warm today (25°C), light rain tomorrow (22°C), then clearing up with temperatures rising to 28°C by the weekend. Great weather ahead! 🌸" |

## 📚 API Documentation

### Endpoints

#### Health Check
```
GET /health
```
Returns server status and basic information.

#### Chat with Weather Agent
```
POST /api/weather/chat
Content-Type: application/json

{
  "message": "Your weather question here"
}
```

#### Get Weather Data
```
GET /api/weather/:location
Query Parameters:
- forecast: true/false (default: true)
- days: 1-5 (default: 5)
```

#### API Documentation
```
GET /api/docs
```
Returns interactive API documentation.

### Response Format

```json
{
  "success": true,
  "response": "AI agent response text",
  "timestamp": "2025-08-10T12:00:00.000Z"
}
```

## 🛠️ Development

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run type-check` | Run TypeScript type checking |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues automatically |
| `npm run test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |

### Project Structure

```
weather-ai-agent1/
├── src/
│   ├── agents/           # AI agent definitions
│   │   └── weatherAgent.ts
│   ├── config/           # Configuration files
│   │   └── environment.ts
│   ├── mastra/           # Mastra framework setup
│   │   └── index.ts
│   ├── services/         # Business logic services
│   │   └── weatherService.ts
│   ├── tools/            # Agent tools and functions
│   │   └── weatherTools.ts
│   ├── types/            # TypeScript type definitions
│   │   └── weather.ts
│   ├── utils/            # Utility functions
│   │   └── helpers.ts
│   ├── scripts/          # Development scripts
│   │   └── testAgent.ts
│   ├── index.ts          # Main entry point
│   └── server.ts         # Express server setup
├── tests/                # Test files
│   ├── weather.test.ts
│   └── setup.ts
├── dist/                 # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
├── jest.config.js
├── .env.example
├── .gitignore
└── README.md
```

### Testing the Agent

Run the included test script to verify your setup:

```bash
npx ts-node src/scripts/testAgent.ts
```

This will test various weather queries and display the agent's responses.

## 🔧 Configuration

### Environment Variables

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `DEEPSEEK_API_KEY` | ✅ | Your DeepSeek API key | - |
| `DEEPSEEK_BASE_URL` | ❌ | DeepSeek API base URL | `https://api.deepseek.com` |
| `DEEPSEEK_MODEL` | ❌ | DeepSeek model to use | `deepseek-chat` |
| `OPENWEATHER_API_KEY` | ✅ | Your OpenWeatherMap API key | - |
| `OPENWEATHER_BASE_URL` | ❌ | OpenWeatherMap API base URL | `https://api.openweathermap.org/data/2.5` |
| `PORT` | ❌ | Server port | `4111` |
| `NODE_ENV` | ❌ | Environment mode | `development` |
| `MASTRA_LOG_LEVEL` | ❌ | Logging level | `info` |

### Getting API Keys

#### DeepSeek API Key
1. Visit [DeepSeek API Platform](https://api.deepseek.com/)
2. Sign up for an account
3. Navigate to API Keys section
4. Generate a new API key
5. Copy the key to your `.env` file

#### OpenWeatherMap API Key
1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Go to API Keys section in your profile
4. Copy the default API key or create a new one
5. Add the key to your `.env` file

## 🚀 Deployment

### Using Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

3. **Set environment variables** in Vercel dashboard

### Using Docker

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY dist ./dist
   EXPOSE 4111
   CMD ["node", "dist/index.js"]
   ```

2. **Build and run**
   ```bash
   npm run build
   docker build -t weather-ai-agent .
   docker run -p 4111:4111 --env-file .env weather-ai-agent
   ```

### Using PM2

1. **Install PM2**
   ```bash
   npm install -g pm2
   ```

2. **Create ecosystem file**
   ```javascript
   // ecosystem.config.js
   module.exports = {
     apps: [{
       name: 'weather-ai-agent',
       script: 'dist/index.js',
       instances: 'max',
       exec_mode: 'cluster',
       env: {
         NODE_ENV: 'production',
         PORT: 4111
       }
     }]
   }
   ```

3. **Deploy**
   ```bash
   npm run build
   pm2 start ecosystem.config.js
   ```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Add tests** for new functionality
5. **Run tests** and ensure they pass
   ```bash
   npm test
   ```
6. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
7. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
8. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Add tests for new features
- Update documentation for API changes
- Use meaningful commit messages
- Ensure code passes linting and type checks

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[Mastra Team](https://mastra.ai/)** - For building an amazing AI agent framework
- **[DeepSeek](https://api.deepseek.com/)** - For providing powerful and accessible AI models
- **[OpenWeatherMap](https://openweathermap.org/)** - For comprehensive weather data APIs
- **Open Source Community** - For the incredible tools and libraries that make this possible

## 📞 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: [GitHub Issues](https://github.com/Rexingleung/weather-ai-agent1/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Rexingleung/weather-ai-agent1/discussions)

## 🔮 Future Enhancements

- [ ] **Weather Alerts**: Push notifications for severe weather
- [ ] **Historical Data**: Access to historical weather patterns
- [ ] **Multiple Languages**: Internationalization support
- [ ] **Weather Maps**: Integration with weather visualization
- [ ] **Voice Interface**: Speech-to-text and text-to-speech
- [ ] **Mobile App**: React Native companion app
- [ ] **Weather Analytics**: Trends and insights dashboard
- [ ] **Custom Locations**: Save favorite locations and preferences

---

**Built with ❤️ using TypeScript, Mastra AI, and DeepSeek**