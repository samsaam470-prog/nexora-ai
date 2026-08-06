export default function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-white/10 bg-black px-8 text-white">
      <h1 className="text-xl font-semibold">
        Dashboard
      </h1>

      <div className="rounded-full bg-white/10 px-4 py-2">
        Free Plan
      </div>
    </header>
  );
}