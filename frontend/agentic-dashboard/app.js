import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [jobStatus, setJobStatus] = useState(null);

  const startWorkflow = async () => {
    const res = await axios.post("http://127.0.0.1:8000/start_workflow", {
      title: "Pharma EHR",
      description: "Secure login",
      regulatory_context: "FDA 21 CFR Part 11"
    });
    setJobStatus(res.data);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Pharma SDLC Agentic Command Center</h1>
      <button onClick={startWorkflow} className="bg-blue-600 text-white px-4 py-2 rounded">
        Trigger Workflow
      </button>

      {jobStatus && (
        <div className="mt-6 p-4 bg-white rounded shadow">
          <p><strong>Job ID:</strong> {jobStatus.job_id}</p>
          <p><strong>Status:</strong> {jobStatus.status}</p>
        </div>
      )}
    </div>
  );
}

export default App;
