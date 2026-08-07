"use client";

import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10">
          <p className="mb-2 text-sm text-blue-400">Nexora AI</p>

          <h1 className="text-4xl font-bold tracking-tight">
            Dashboard
          </h1>

          <p className="mt-3 max-w-2xl text-white/60">
            Your Nexora workspace. Choose a tool below to get started.
          </p>
        </div>

        {/* Tools */}
        <section>
          <h2 className="mb-4 text-xl font-semibold">
            Your Tools
          </h2>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Business Planner */}
            <Link
              href="/dashboard/business-plan"
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-blue-500/40 hover:bg-white/10"
            >
              <div className="mb-4 text-3xl">🚀</div>

              <h3 className="text-xl font-semibold">
                Business Planner
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/60">
                Build a practical business plan using Nexora's
                industry knowledge.
              </p>

              <div className="mt-5 text-sm font-medium text-blue-400 group-hover:text-blue-300">
                Open Business Planner →
              </div>
            </Link>

            {/* Coming Soon */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 opacity-70">
              <div className="mb-4 text-3xl">📄</div>

              <h3 className="text-xl font-semibold">
                Resume Builder
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/60">
                Create professional resumes using templates and
                structured knowledge.
              </p>

              <div className="mt-5 text-sm text-white/40">
                Coming soon
              </div>
            </div>

            {/* Coming Soon */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 opacity-70">
              <div className="mb-4 text-3xl">✉️</div>

              <h3 className="text-xl font-semibold">
                Email Writer
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/60">
                Create professional emails using Nexora templates
                and knowledge.
              </p>

              <div className="mt-5 text-sm text-white/40">
                Coming soon
              </div>
            </div>
          </div>
        </section>

        {/* Status */}
        <section className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">
            Nexora Development
          </h2>

          <p className="mt-2 text-sm leading-6 text-white/60">
            Nexora is currently in its learning and development
            stage. More tools, templates, and industry knowledge
            will be added over time.
          </p>
        </section>
      </div>
    </main>
  );
}