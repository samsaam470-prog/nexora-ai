export default function Sidebar() {
  return (
    <aside className="h-screen w-64 border-r border-white/10 bg-black p-6 text-white">
      <h2 className="text-2xl font-bold">
        Nexora AI
      </h2>

      <nav className="mt-8 space-y-4 text-gray-300">
        <p>🤖 AI Business Plan</p>
        <p>📈 Marketing Strategy</p>
        <p>🌐 Website Blueprint</p>
        <p>📱 Social Media Content</p>
        <p>⚙️ Settings</p>
      </nav>
    </aside>
  );
}