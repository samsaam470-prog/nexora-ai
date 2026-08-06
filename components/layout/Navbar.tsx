export default function Navbar() {
  return (
    <nav className="w-full border-b border-white/10 bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-white">
          Nexora <span className="text-blue-500">AI</span>
        </h1>

        <div className="hidden md:flex items-center gap-8 text-gray-300">
          <a href="#">Home</a>
          <a href="#">Features</a>
          <a href="#">Pricing</a>
          <a href="#">About</a>
        </div>

        <button className="rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700">
          Get Started
        </button>
      </div>
    </nav>
  );
}