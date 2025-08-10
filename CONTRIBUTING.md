# Contributing to Weather AI Agent

We love your input! We want to make contributing to Weather AI Agent as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

### Pull Request Process

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

### Code Style

- We use TypeScript for type safety
- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Ensure all tests pass

### Setting Up Development Environment

1. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/weather-ai-agent1.git
   cd weather-ai-agent1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

4. **Run tests**
   ```bash
   npm test
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

### Testing

- Write tests for new features
- Ensure existing tests still pass
- Aim for good test coverage
- Test both success and error cases

### Commit Messages

We follow conventional commits:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `test:` for test additions/changes
- `refactor:` for code refactoring
- `style:` for formatting changes
- `chore:` for maintenance tasks

Example: `feat: add weather alerts functionality`

## Bug Reports

We use GitHub issues to track public bugs. Report a bug by opening a new issue.

### Great Bug Reports Include:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening)

## Feature Requests

We welcome feature requests! Please:

1. Check if the feature already exists
2. Search existing issues for similar requests
3. Provide a clear description of the feature
4. Explain why this feature would be useful
5. Consider providing a basic implementation plan

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

Thank you for contributing! 🎉
