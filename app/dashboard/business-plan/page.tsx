"use client";

import { useState } from "react";

export default function BusinessPlanPage() {
  const [idea, setIdea] = useState("");
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);

  async function generatePlan() {
    setLoading(true);

    const response = await fetch("/api/generate-plan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idea,
      }),
    });

    const data = await response.json();

    setPlan(data.plan);
    setLoading(false);
  }


  return (
    <main className="min-h-screen bg-black p-8 text-white">

      <h1 className="text-4xl font-bold">
        AI Business Plan Generator 🚀
      </h1>


      <textarea
        className="mt-8 h-40 w-full max-w-3xl rounded-xl border border-white/10 bg-white/5 p-4"
        placeholder="Example: AI fitness app for students..."
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
      />


      <button
        onClick={generatePlan}
        className="mt-5 rounded-xl bg-blue-600 px-6 py-3"
      >
        {loading ? "Generating..." : "Generate Business Plan"}
      </button>


      {plan && (
        <div className="mt-8 max-w-3xl whitespace-pre-line rounded-xl border border-white/10 bg-white/5 p-6">
          {plan}
        </div>
      )}

    </main>
  );
}