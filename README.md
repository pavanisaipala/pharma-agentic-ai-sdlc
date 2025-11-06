💊 Pharma Agentic AI SDLC Solution
An end-to-end Agentic AI system that automates and optimizes the Software Development Lifecycle (SDLC) for the Pharmaceutical domain.
Built with FastAPI, Redis, Python Agents, and a React + TailwindCSS Dashboard.
🚀 Project Overview
This project demonstrates how Agentic AI can autonomously manage and optimize the entire Software Development Lifecycle (SDLC) for pharmaceutical applications.
Each agent specializes in a stage of the lifecycle — from requirements gathering to compliance — ensuring speed, accuracy, and regulatory alignment (e.g., FDA 21 CFR Part 11).
🧠 The goal: reduce manual dependencies and enhance development efficiency in regulated pharma environments using intelligent, autonomous agents.
🧩 System Architecture
Frontend (React + Tailwind)
          │
          ▼
FastAPI Orchestrator  ⇆  Redis (Message Broker)
          │
          ├── Requirements Agent
          ├── Design Agent
          ├── Code Agent
          ├── Test Agent
          ├── Security Agent
          ├── Compliance Agent
          └── Release Agent
Each component works autonomously to complete SDLC tasks.
🧠 Features
| Category                    | Description                                                  |
| --------------------------- | ------------------------------------------------------------ |
| 🤖 **Agentic AI**           | Multiple agents coordinate to perform each SDLC phase        |
| ⚙️ **FastAPI Orchestrator** | Manages agent communication and workflow triggers            |
| 💬 **Redis Pub/Sub**        | Enables asynchronous messaging between agents                |
| 💻 **React Dashboard**      | Real-time monitoring of agent actions, alerts, and decisions |
| 📊 **Metrics Tracking**     | Auto decisions, compliance scores, and human interventions   |
| 🔒 **Regulatory Focus**     | Integrates FDA compliance (21 CFR Part 11) checks            |
| ☁️ **Deployable**           | Can be hosted on Render (backend) & Vercel (frontend)        |
🧾 Tech Stack
Backend: FastAPI · Python · Redis · AsyncIO
Frontend: ReactJS · TailwindCSS · Axios · Lucide-React
Infra: Docker 
🏗️ Project Structure
pharma-agentic-ai-sdlc/
├── agents/
│   ├── requirements_agent.py
│   ├── design_agent.py
│   ├── code_agent.py
│   └── ...
├── orchestrator.py
├── requirements.txt
├── frontend/
│   └── pharma-dashboard/
│       ├── src/
│       ├── package.json
│       └── tailwind.config.js
└── README.md
⚙️ Installation & Setup
🧩 Backend Setup
# Create and activate virtual environment
python -m venv venv
venv\Scripts\activate   # (Windows)
# or
source venv/bin/activate  # (Linux/Mac)
# Install dependencies
pip install -r requirements.txt
# Start Redis via Docker
docker run -d -p 6379:6379 redis:7
# Run FastAPI orchestrator
uvicorn orchestrator:app --reload
✅ Visit http://127.0.0.1:8000/docs to view API endpoints.
🤖 Agent Setup
In separate terminals (with venv activated):
python agents/requirements_agent.py
python agents/design_agent.py
python agents/code_agent.py
# ... and other agents
💻 Frontend Setup
cd frontend/pharma-dashboard
npm install
npm start
✅ Access the live dashboard at: http://localhost:3000
📊 Dashboard Features
📈 Metrics View: Auto decisions, compliance, interventions, project counts
🧠 Agent Panels: Requirements, Design, and Code agents with live success rates
⚠️ Critical Alerts: Shows AI-detected compliance or testing issues
⚡ Autonomous Actions: Displays tasks completed by AI agents
🚀 Trigger Workflow: Launch full SDLC cycle via one click
🧪 Example API Workflow
POST http://127.0.0.1:8000/start_workflow
Content-Type: application/json
{
  "title": "Pharma EHR",
  "description": "Secure login module for EHR system",
  "regulatory_context": "FDA 21 CFR Part 11"
}
🧠 Future Enhancements
✅ Integrate LLM reasoning for better task allocation between agents
✅ Add persistent state database (PostgreSQL)
✅ CI/CD pipeline with GitHub Actions
✅ Role-based access control in frontend
✅ Cloud Redis and containerized deployment
🌐 Deployment Options
| Component             | Platform                     | Command                                                |
| --------------------- | ---------------------------- | ------------------------------------------------------ |
| **Frontend (React)**  | [Vercel](https://vercel.com) | Deploy directly from GitHub                            |
| **Backend (FastAPI)** | [Render](https://render.com) | `uvicorn orchestrator:app --host 0.0.0.0 --port 10000` |
| **Redis**             | Docker or Redis Cloud        | `docker run -d -p 6379:6379 redis:7`                   |
🧑‍💻 Author
👩 Pavani Sai Pala
🎓 B.E. – Artificial Intelligence & Machine Learning, Osmania University.
🏁 Project Status
✅ Completed: End-to-end Agentic AI SDLC implementation (Backend + Frontend)
🚧 Next Phase: Real-time backend integration with frontend metrics dashboard
⭐ Acknowledgements
Special thanks to:
Mr. Durga Prasad, Founder & CEO - BigDatamatica Solutions Pvt Ltd
FastAPI & React communities
Redis Labs for async data streaming
OpenAI / LangChain community inspiration for Agentic workflows
📬 Contact
📧 Email: pavanisaipala@gmail.com
🌍 GitHub: github.com/pavanisaipala
✅ This project demonstrates practical Agentic AI workflow orchestration for the pharma industry, integrating AI autonomy, SDLC automation, and compliance.
