"use client";

export default function Footer() {
  function comingSoon(platform: string) {
    alert(
      `Nexora is still in its early stage. ${platform} access will be available soon!`
    );
  }

  return (
    <footer className="border-t border-white/10 px-6 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <div>
          <h2 className="text-xl font-bold">Nexora AI</h2>

          <p className="mt-2 text-sm text-gray-500">
            Build, launch, and grow with AI.
          </p>
        </div>

        <div className="flex items-center gap-6">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/nexora.ai._/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Nexora AI on Instagram"
            className="text-gray-400 transition hover:text-white"
          >
            Instagram
          </a>

          {/* LinkedIn */}
          <button
            type="button"
            onClick={() => comingSoon("LinkedIn")}
            className="text-gray-400 transition hover:text-white"
          >
            LinkedIn
          </button>

          {/* Twitter / X */}
          <button
            type="button"
            onClick={() => comingSoon("Twitter/X")}
            className="text-gray-400 transition hover:text-white"
          >
            Twitter
          </button>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl border-t border-white/10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Nexora AI. All rights reserved.
      </div>
    </footer>
  );
}