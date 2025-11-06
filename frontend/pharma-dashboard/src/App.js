import React, { useState, useEffect } from "react";
import axios from "axios";
import { AlertTriangle, Cpu } from "lucide-react";

function App() {
  const [metrics, setMetrics] = useState({
    activeProjects: 5,
    autoDecisions: 240,
    humanInterventions: 12,
    complianceScore: "98%",
  });

  const [alerts, setAlerts] = useState([]);
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Simulated API data (you can replace this with your FastAPI endpoints later)
  useEffect(() => {
    setAlerts([
      {
        agent: "Requirements Agent",
        message:
          "Incomplete FDA documentation for PharmaPlus project — requires review.",
        level: "critical",
      },
      {
        agent: "Testing Agent",
        message:
          "Automated regression test failed for PrescriptionService module.",
        level: "warning",
      },
    ]);

    setActions([
      {
        agent: "Design Agent",
        description: "Generated new UML diagrams for Pharma EHR v3.2",
        status: "completed",
      },
      {
        agent: "Code Agent",
        description: "Optimized REST API for DrugInventory endpoint",
        status: "in_progress",
      },
    ]);
  }, []);

  const triggerWorkflow = async () => {
    setLoading(true);
    try {
      // Later this will call your FastAPI endpoint
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("🚀 Workflow triggered successfully!");
    } catch (error) {
      alert("⚠️ Backend not connected — please start FastAPI server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-blue-800 flex items-center gap-2">
          💊 Pharma SDLC Agentic Command Center
        </h1>
        <button
          onClick={triggerWorkflow}
          disabled={loading}
          className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg shadow"
        >
          {loading ? "Launching..." : "🚀 Start New Workflow"}
        </button>
      </header>

      {/* Top Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-10">
        <MetricCard
          title="Active Projects"
          value={metrics.activeProjects}
          color="text-blue-600"
        />
        <MetricCard
          title="Auto Decisions"
          value={metrics.autoDecisions}
          color="text-green-600"
        />
        <MetricCard
          title="Human Interventions"
          value={metrics.humanInterventions}
          color="text-red-600"
        />
        <MetricCard
          title="Compliance Score"
          value={metrics.complianceScore}
          color="text-yellow-600"
        />
      </div>

      {/* Agent Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <AgentCard name="Requirements Agent" rate="93%" tasks="42" />
        <AgentCard name="Design Agent" rate="96%" tasks="31" />
        <AgentCard name="Code Agent" rate="98%" tasks="25" />
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

/* ======= Reusable Components ======= */

function MetricCard({ title, value, color }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md text-center">
      <h3 className="text-gray-600 text-sm">{title}</h3>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

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
