import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 py-24 text-center">
      <div className="mb-6 text-sm font-semibold text-blue-400">
        🚀 AI-Powered Business Platform
      </div>

      <h1 className="max-w-5xl text-5xl font-extrabold leading-tight md:text-7xl">
        Build, Launch & Scale Your Business with{" "}
        <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Nexora AI
        </span>
      </h1>

      <p className="mt-8 max-w-3xl text-lg text-gray-400">
        Generate business plans, marketing strategies, website
        blueprints, social media content, and launch roadmaps—all
        powered by AI in one platform.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/dashboard"
          className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
        >
          Start Free →
        </Link>

        <a
          href="#features"
          className="rounded-xl border border-white/20 px-8 py-4 font-semibold transition hover:bg-white hover:text-black"
        >
          Learn More
        </a>
      </div>
    </section>
  );
}