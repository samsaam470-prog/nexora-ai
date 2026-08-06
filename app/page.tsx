export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 text-center">
        <span className="mb-6 rounded-full border border-white/20 px-4 py-2 text-sm text-gray-300">
          🚀 AI-Powered Business Platform
        </span>

        <h1 className="text-5xl font-bold leading-tight md:text-7xl">
          Build, Plan & Grow with{" "}
          <span className="text-blue-500">Nexora AI</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-400">
          Your AI business partner that helps you create business plans,
          marketing strategies, website blueprints, social media content, and
          much more—all in one place.
        </p>

        <div className="mt-10 flex gap-4">
          <button className="rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700">
            Get Started
          </button>

          <button className="rounded-xl border border-gray-600 px-6 py-3 hover:bg-white hover:text-black">
            Learn More
          </button>
        </div>
      </section>
    </main>
  );
}