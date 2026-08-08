export default function About() {
  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            About Nexora AI
          </p>

          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            Your AI Business Partner
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">
            Nexora AI is designed to help entrepreneurs, creators, and
            businesses turn ideas into action with practical AI-powered tools
            in one platform.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-2xl font-bold">What Nexora offers</h3>

            <ul className="mt-6 space-y-4 text-gray-400">
              <li>✓ Business Plan Generator</li>
              <li>✓ Website Blueprint Generator</li>
              <li>✓ Marketing Strategy Tools</li>
              <li>✓ Social Media Content Planning</li>
              <li>✓ Launch Roadmaps</li>
              <li>✓ More AI tools coming soon</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-8">
            <h3 className="text-2xl font-bold">
              Nexora is in its early stage
            </h3>

            <p className="mt-5 leading-7 text-gray-400">
              We are continuously improving Nexora AI and adding new tools,
              features, packages, and guides to make the platform more useful
              for businesses.
            </p>

            <div className="mt-8 rounded-xl border border-white/10 bg-black/30 p-5">
              <p className="font-semibold">
                🚀 New features are coming
              </p>

              <p className="mt-2 text-sm text-gray-400">
                Nexora is growing day by day. Stay connected for upcoming
                features and improvements.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
          <h3 className="text-2xl font-bold">
            Built to grow with your business
          </h3>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-400">
            From developing your first idea to planning your launch and
            growing your business, Nexora AI brings useful tools together in
            one platform.
          </p>
        </div>
      </div>
    </section>
  );
}