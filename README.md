# DevPulse AI
![Node.js](https://img.shields.io/badge/Node.js-22-green)
![Slack](https://img.shields.io/badge/Slack-Bolt-blue)
![GitHub API](https://img.shields.io/badge/API-GitHub-black)
![Jira API](https://img.shields.io/badge/API-Jira-blue)
![OpenRouter](https://img.shields.io/badge/AI-OpenRouter-purple)
![License](https://img.shields.io/badge/License-MIT-yellow)

DevPulse AI is an AI-powered Slack assistant that integrates GitHub, Jira, and Large Language Models to help development teams monitor repositories, analyze project health, and retrieve project insights using natural language commands.

The application combines repository analytics, Jira project management, AI-generated summaries, and Slack automation into a single conversational interface.

---

## Overview

DevPulse AI enables developers to interact with their development workflow directly from Slack. Instead of manually navigating GitHub or Jira, users can request repository statistics, project summaries, issue information, dashboards, and health reports using simple commands or natural language.

The project demonstrates integration between multiple APIs, AI-powered intent routing, and Slack's interactive messaging platform.

---

## Features

### GitHub Integration

- View authenticated GitHub profile
- List repositories
- Retrieve recent commits
- View open pull requests
- View open issues
- Generate AI-powered repository summaries
- Interactive repository dashboard
- Repository health analysis

### Jira Integration

- View authenticated Jira profile
- List available projects
- View assigned issues
- Sprint information support (extensible)

### AI Capabilities

- Natural language intent classification
- AI-generated repository summaries
- AI-generated project health reports
- AI explanations for repository activity
- Intelligent request routing

### Slack Integration

- Slack Bolt based application
- Conversational command interface
- Block Kit dashboards
- AI responses inside Slack channels

---

## Architecture

```
Slack Workspace
       │
       ▼
Slack Bolt Application
       │
       ▼
Message Handler
       │
 ┌─────┼──────────────┐
 │     │              │
 ▼     ▼              ▼
GitHub Jira          AI Router
Handler Handler          │
 │      │               ▼
 │      │        OpenRouter LLM
 │      │
 ▼      ▼
GitHub REST API     Jira REST API
```

---

## Project Structure

```
DevPulse-ai
│
├── app.js
├── handlers
│   ├── githubHandler.js
│   ├── jiraHandler.js
│   ├── healthHandler.js
│   ├── standupHandler.js
│   ├── messageHandler.js
│   └── commandHandler.js
│
├── services
│   ├── ai
│   ├── github
│   ├── jira
│   └── mcp
│
├── utils
│
├── .env.example
├── package.json
└── README.md
```

---

## Technology Stack

| Category | Technology |
|----------|------------|
| Runtime | Node.js |
| Framework | Slack Bolt |
| Language | JavaScript |
| AI Provider | OpenRouter |
| APIs | GitHub REST API, Jira REST API |
| HTTP Client | Axios |
| Environment | dotenv |

---

## Installation

Clone the repository

```bash
git clone https://github.com/<username>/DevPulse-ai.git
```

Move into the project

```bash
cd DevPulse-ai
```

Install dependencies

```bash
npm install
```

Create an environment file

```bash
cp .env.example .env
```

Configure the required environment variables.

Start the application

```bash
node app.js
```

---

## Environment Variables

```
SLACK_BOT_TOKEN=

SLACK_APP_TOKEN=

SLACK_SIGNING_SECRET=

GITHUB_TOKEN=

GITHUB_USERNAME=

JIRA_BASE_URL=

JIRA_EMAIL=

JIRA_API_TOKEN=

OPENROUTER_API_KEY=
```

---

## Available Commands

### GitHub

```
github profile

github repos

github commits <repository>

github pulls <repository>

github issues <repository>

github summary <repository>

github dashboard <repository>
```

### Jira

```
jira profile

jira projects

jira issues
```

### AI

```
project health <repository>

standup
```

Natural language examples

```
Show my GitHub profile

Summarize DevPulse-ai

How healthy is DevPulse-ai?

Show my Jira issues
```

---

## Key Capabilities

- AI-assisted software project analysis
- GitHub repository monitoring
- Jira task tracking
- Slack conversational interface
- Project health scoring
- Repository summarization
- Intent classification for natural language queries

---

## Design Principles

- Modular service-based architecture
- Separation of handlers and API services
- AI-assisted request routing
- Reusable utility functions
- Extensible command structure
- Slack-first user experience

---

## Future Enhancements

- GitHub Actions CI/CD
- Unit and integration testing
- Issue and pull request templates
- Scheduled daily reports
- Sprint analytics
- Deployment using Docker
- Slack Home Dashboard
- Web dashboard for analytics

---

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/new-feature
```

3. Commit your changes.

```bash
git commit -m "Add new feature"
```

4. Push the branch.

```bash
git push origin feature/new-feature
```

5. Open a Pull Request.

---

## License

This project is licensed under the MIT License.
