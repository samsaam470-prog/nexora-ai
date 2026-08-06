"use client";

import { useState } from "react";

export default function DashboardPage() {

  const [idea, setIdea] = useState("");
  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(false);


  async function generatePlan() {

    if (!idea) return;

    setLoading(true);

    const response = await fetch("/api/generate", {
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
    <main className="min-h-screen p-8">

      <h1 className="text-4xl font-bold">
        Nexora AI Dashboard
      </h1>


      <div className="mt-8">

        <textarea
          className="w-full border rounded-lg p-4"
          placeholder="Describe your business idea..."
          value={idea}
          onChange={(e)=>setIdea(e.target.value)}
        />


        <button
          onClick={generatePlan}
          className="mt-4 px-6 py-3 rounded-lg bg-black text-white"
        >
          {loading ? "Generating..." : "Generate Business Plan"}
        </button>

      </div>


      {plan && (

        <div className="mt-10 space-y-5">

          <h2 className="text-2xl font-bold">
            {plan.industry}
          </h2>


          {plan.sections.map(
            (section:any)=>(
              
              <div 
                key={section.title}
                className="border rounded-lg p-4"
              >

                <h3 className="font-bold">
                  {section.title}
                </h3>

                <p className="mt-2">
                  {section.content}
                </p>

              </div>

            )
          )}

        </div>

      )}

    </main>
  );
}