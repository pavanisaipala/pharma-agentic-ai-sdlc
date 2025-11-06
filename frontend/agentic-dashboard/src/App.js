import React, { useState, useEffect } from "react";
import axios from "axios";
import { AlertTriangle, Cpu, CheckCircle, PlayCircle } from "lucide-react";

function App() {
  const [metrics, setMetrics] = useState({
    totalProjects: 12,
    autoDecisions: 125,
    humanInterventions: 4,
    complianceScore: "97%",
  });
  const [alerts, setAlerts] = useState([]);
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Simulated data fetching (replace with your FastAPI endpoints later)
  useEffect(() => {
    setAlerts([
      {
        agent: "Requirements Agent",
        message: "Missing FDA validation checklist for PharmaTrack module",
        level: "critical",
      },
      {
        agent: "Testing Agent",
        message: "Automated test suite failed on release v2.5",
        level: "warning",
      },
    ]);

    setActions([
      {
        agent: "Design Agent",
        description: "Generated UML diagrams for EHR authentication",
        status: "completed",
      },
      {
        agent: "Code Agent",
        description: "Implemented API endpoint for prescription logs",
        status: "in_progress",
      },
    ]);
  }, []);

  const triggerWorkflow = async () => {
    setLoading(true);
    try {
      // replace with your backend FastAPI call later:
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("Workflow triggered successfully ✅");
    } catch (err) {
      alert("⚠️ Could not connect to backend. Make sure FastAPI is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-blue-800 flex items-center gap-2">
          💊 Pharma SDLC Agentic Command Center
        </h1>
        <button
          onClick={triggerWorkflow}
          disabled={loading}
          className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg shadow"
        >
          {loading ? "Launching..." : "🚀 Start Workflow"}
        </button>
      </header>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <MetricCard title="Active Projects" value={metrics.totalProjects} color="text-blue-600" />
        <MetricCard title="Auto Decisions" value={metrics.autoDecisions} color="text-green-600" />
        <MetricCard title="Human Interventions" value={metrics.humanInterventions} color="text-red-600" />
        <MetricCard title="Compliance Score" value={metrics.complianceScore} color="text-yellow-600" />
      </div>

      {/* Agent Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <AgentCard name="Requirements Agent" rate="93%" tasks="42" />
        <AgentCard name="Design Agent" rate="96%" tasks="28" />
        <AgentCard name="Code Agent" rate="98%" tasks="31" />
      </div>

      {/* Alerts */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-red-700 flex items-center gap-2 mb-3">
          <AlertTriangle size={20} /> Critical Alerts
        </h2>
        {alerts.map((a, i) => (
          <div
            key={i}
            className={`p-4 mb-2 rounded-xl shadow ${
              a.level === "critical" ? "bg-red-100" : "bg-yellow-100"
            }`}
          >
            <strong>{a.agent}:</strong> {a.message}
          </div>
        ))}
      </section>

      {/* Actions */}
      <section>
        <h2 className="text-xl font-semibold text-green-700 flex items-center gap-2 mb-3">
          <Cpu size={20} /> Autonomous Actions
        </h2>
        {actions.map((a, i) => (
          <div
            key={i}
            className="p-4 mb-2 bg-white rounded-xl shadow border-l-4 border-blue-600"
          >
            <strong>{a.agent}</strong> — {a.description}{" "}
            <span
              className={`ml-2 text-sm ${
                a.status === "completed" ? "text-green-600" : "text-blue-600"
              }`}
            >
              ({a.status})
            </span>
          </div>
        ))}
      </section>
    </div>
  );
}

// Metric Card component
function MetricCard({ title, value, color }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md text-center">
      <h3 className="text-gray-600 text-sm">{title}</h3>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

// Agent Card component
function AgentCard({ name, rate, tasks }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md text-center">
      <h3 className="text-lg font-semibold text-gray-700">{name}</h3>
      <p className="text-sm text-gray-500">Success Rate: {rate}</p>
      <p className="text-sm text-gray-500">Tasks Today: {tasks}</p>
      <button className="mt-3 bg-blue-600 text-white px-3 py-1 rounded-md">
        Trigger Action
      </button>
    </div>
  );
}

export default App;
