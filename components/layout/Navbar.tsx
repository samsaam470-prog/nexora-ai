"use client";

import Link from "next/link";

export default function Navbar() {
  function comingSoon(platform: string) {
    alert(
      `Nexora AI is currently in its early stage.\n\n${platform} access will be available soon.`
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="#home"
          className="text-2xl font-extrabold tracking-tight"
        >
          Nexora{" "}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            AI
          </span>
        </Link>

        {/* Main navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="#home"
            className="text-sm text-gray-300 transition hover:text-white"
          >
            Home
          </Link>

          <Link
            href="#features"
            className="text-sm text-gray-300 transition hover:text-white"
          >
            Features
          </Link>

          <Link
            href="#pricing"
            className="text-sm text-gray-300 transition hover:text-white"
          >
            Pricing
          </Link>

          <Link
            href="#about"
            className="text-sm text-gray-300 transition hover:text-white"
          >
            About
          </Link>
        </div>

        {/* Social / account actions */}
        <div className="flex items-center gap-3">
          <a
            href="https://www.instagram.com/nexora.ai._/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Nexora AI Instagram"
            className="rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-300 transition hover:border-pink-500/50 hover:text-white"
          >
            Instagram
          </a>

          <button
            type="button"
            onClick={() => comingSoon("LinkedIn")}
            className="hidden rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-300 transition hover:border-blue-500/50 hover:text-white sm:block"
          >
            LinkedIn
          </button>

          <button
            type="button"
            onClick={() => comingSoon("Twitter / X")}
            className="hidden rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-300 transition hover:border-white/30 hover:text-white sm:block"
          >
            Twitter
          </button>

          <Link
            href="/login"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold transition hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  );
}