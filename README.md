
# 🚀 AgentFlow — AI Automation Platform for Modern Teams
> ⚡ Built with Next.js · Groq AI · LangChain · Notion Integrations · Automation Layer

![AgentFlow UI Preview](https://github.com/1SoulHunter1/AgentFlow-AI_Automation_Platform/blob/main/AgentFlow-Banner.png)


AgentFlow is an **AI-powered automation workspace** that connects your favorite tools, research agents, and chat models into one seamless flow.  
Think of it as your personal **LangDock + Notion + Zapier**, all unified inside an intelligent dashboard.

---

## 🧠 Vision
> Empower teams to **chat, research, integrate, and automate** — all within one intuitive AI interface.

AgentFlow helps developers, analysts, and creators build, test, and scale AI agents with zero friction.  
It’s not just a chat — it’s automation with context.

---

## 🌟 Features

### 💬 AI Chat Interface
- Real-time streaming chat powered by **Groq AI (Llama 3.3 / Gemma)**.
- Dynamic markdown rendering with headers, lists, and code formatting.
- Persistent conversations stored locally.

### 🧩 Multi-Agent System
- **Web Search Agent** → Fetches real-time data using Tavily API.
- **Summarizer Agent** → Generates crisp summaries via Groq.
- **Deep Research Agent** → Performs multi-layer contextual analysis.

### 🔗 Integrations Layer
- Send summaries or research results directly to:
  - 🧠 **Notion**
  - 💬 **Slack**
  - ☁️ **Google Drive** *(coming soon)*
- Full Notion Database sync verified ✅

### 🗂 File Upload & Processing
- Upload `.pdf`, `.docx`, `.csv`, or `.txt` files.
- AgentFlow automatically extracts and summarizes text.

### 🎨 Intuitive UI
- Built using **Next.js 15**, **TailwindCSS**, and **shadcn/ui**.
- Inspired by **LangDock’s collaborative workspace**.
- Designed for clarity, speed, and smooth animations.

---

## 🛠 Tech Stack

| Category | Technology |
|-----------|-------------|
| **Frontend** | Next.js 15, TypeScript, TailwindCSS, Shadcn UI |
| **AI Models** | Groq (Llama 3.3, Gemma), Tavily Search |
| **Integrations** | Notion API, Slack (coming soon) |
| **Backend** | Next.js API Routes, Prisma ORM |
| **Database** | PostgreSQL / Prisma |
| **Deployment** | Vercel |
| **Package Manager** | pnpm |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/1SoulHunter1/AgentFlow-AI-Automation-Platform.git
cd AgentFlow-AI-Automation-Platform
````

### 2️⃣ Install Dependencies

```bash
pnpm install
```

### 3️⃣ Configure Environment Variables

Create a `.env.local` file at the project root:

```bash
GROQ_API_KEY=your_groq_api_key
TAVILY_API_KEY=your_tavily_api_key
NOTION_API_KEY=your_notion_integration_secret
NOTION_DATABASE_ID=your_notion_database_id
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4️⃣ Run the Development Server

```bash
pnpm dev
```

Your app will be live at 👉 [http://localhost:3000](http://localhost:3000)

---

## 🧩 Example Workflows

| Task           | AgentFlow Command                          | Result                                 |
| -------------- | ------------------------------------------ | -------------------------------------- |
| Deep Research  | `Deep research: AI startups in healthcare` | Fetches live data and generates report |
| Save to Notion | `@notion save findings`                    | Sends summary to Notion DB             |
| Summarize Docs | Upload + `Summarize this`                  | Generates concise overview             |
| Generate Image | `Draw a futuristic workspace poster`       | AI renders image instantly             |

---

## 🧠 Architecture Overview

```
app/
 ├── api/
 │   ├── agents/         # Core AI agents (web search, summarize, deep research)
 │   ├── integrations/   # Notion & Slack API connectors
 │   ├── chat/           # Streaming chat endpoint
 ├── dashboard/          # Frontend UI for chat and tools
 └── lib/                # Logic, utilities, and agent orchestration
```

---

## 💡 Roadmap

| Phase      | Description                                                 | Status      |
| ---------- | ----------------------------------------------------------- | ----------- |
| ✅ Phase 1  | Core AI chat, multi-agent orchestration, Notion integration | Complete    |
| 🚧 Phase 2 | Integration Hub (Slack, Drive, Airtable)                    | In Progress |
| 🔜 Phase 3 | Drag-and-Drop Workflow Builder (LangDock Canvas)            | Planned     |
| 🔮 Phase 4 | SaaS Deployment with Team Workspaces                        | Coming Soon |

---

## 💬 Example Commands

* `@search top AI tools 2025`
* `@deepresearch AI in fintech`
* `@summarize uploaded.pdf`
* `@notion save this conversation`

---

## 🧑‍💻 Contributors

| Name                            | Role                     |
| ------------------------------- | ------------------------ |
| **John Abraham (1SoulHunter1)** | Founder & Lead Developer |
| **ChatGPT (OpenAI)**            | AI Pair Programmer       |

---

## 🏁 License

MIT License — free to modify, expand, and commercialize.
AgentFlow is an open-source initiative to advance AI automation.

---

### ⭐ If you like this project

> Star ⭐ this repo and share your thoughts — every star fuels open-source innovation.

---

## 💎 AgentFlow — The Future of AI-Powered Workflows

> *Where automation meets intelligence.*

```

