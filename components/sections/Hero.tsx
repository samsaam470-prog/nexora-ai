export default function Hero() {
  return (
    <section className="mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
      <span className="mb-6 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
        🚀 AI-Powered Business Platform
      </span>

      <h1 className="max-w-5xl text-5xl font-extrabold leading-tight md:text-7xl">
        Build, Launch & Scale Your Business with{" "}
        <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Nexora AI
        </span>
      </h1>

      <p className="mt-8 max-w-3xl text-lg text-gray-400">
        Generate business plans, marketing strategies, website blueprints,
        social media content, and launch roadmaps—all powered by AI in one
        platform.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <button className="rounded-xl bg-blue-600 px-8 py-4 font-semibold transition hover:bg-blue-700">
          Start Free
        </button>

        <button className="rounded-xl border border-white/20 px-8 py-4 font-semibold transition hover:bg-white hover:text-black">
          Watch Demo
        </button>
      </div>
    </section>
  );
}