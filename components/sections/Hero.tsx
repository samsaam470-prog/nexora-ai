import Link from "next/link";

export default function Hero() {
  return (
    <section className="px-6 py-24 text-center">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
          🚀 AI-Powered Business Platform
        </div>

        <h1 className="mx-auto max-w-5xl text-5xl font-extrabold leading-tight md:text-7xl">
          Build, Launch & Scale Your Business with{" "}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Nexora AI
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-lg text-gray-400">
          Generate business plans, marketing strategies, website blueprints,
          social media content, and launch roadmaps—all powered by AI in one
          platform.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/login"
            className="rounded-xl bg-blue-600 px-8 py-4 font-semibold transition hover:bg-blue-700"
          >
            Get Started
          </Link>

          <Link
            href="#features"
            className="rounded-xl border border-white/20 px-8 py-4 font-semibold transition hover:bg-white hover:text-black"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}