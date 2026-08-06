export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between">
        
        <div>
          <h2 className="text-2xl font-bold text-white">
            Nexora <span className="text-blue-500">AI</span>
          </h2>

          <p className="mt-2 text-gray-400">
            Build, plan, and grow your business with AI.
          </p>
        </div>

        <div className="flex gap-6 text-gray-400">
          <a href="#" className="hover:text-white">
            Twitter
          </a>

          <a href="#" className="hover:text-white">
            Instagram
          </a>

          <a href="#" className="hover:text-white">
            LinkedIn
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Nexora AI. All rights reserved.
      </div>
    </footer>
  );
}