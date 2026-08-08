"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

const ADMIN_EMAIL = "samsaam470@gmail.com";

const adminSections = [
  {
    title: "Overview",
    description: "Monitor Nexora and view important activity.",
    icon: "📊",
  },
  {
    title: "Users",
    description: "View and manage Nexora users.",
    icon: "👥",
  },
  {
    title: "Feedback",
    description: "Review feedback submitted by users.",
    icon: "💬",
  },
  {
    title: "Nexora Behavior",
    description: "Control how Nexora behaves and responds.",
    icon: "🧠",
  },
  {
    title: "Prompts",
    description: "Manage system prompts and instructions.",
    icon: "✍️",
  },
  {
    title: "Knowledge",
    description: "Add links, PDFs, images, and other knowledge.",
    icon: "📚",
  },
  {
    title: "Templates",
    description: "Add and manage reusable templates and assets.",
    icon: "🎨",
  },
  {
    title: "Nexora Learning",
    description: "Connect projects, websites, knowledge, and assets.",
    icon: "⚡",
  },
  {
    title: "Features",
    description: "Manage Nexora capabilities and future features.",
    icon: "🧩",
  },
  {
    title: "Settings",
    description: "Manage administrator and platform settings.",
    icon: "⚙️",
  },
];

export default function AdminPage() {
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [adminEmail, setAdminEmail] = useState("");

  useEffect(() => {
    async function checkAdmin() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      const email = user.email?.toLowerCase();

      if (email !== ADMIN_EMAIL.toLowerCase()) {
        router.replace("/dashboard");
        return;
      }

      setAdminEmail(user.email ?? "");
      setChecking(false);
    }

    checkAdmin();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-blue-500" />

          <p className="mt-4 text-gray-400">
            Checking admin access...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10 bg-black/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-sm font-medium text-blue-400">
              Nexora AI
            </p>

            <h1 className="mt-1 text-2xl font-bold">
              Admin Portal
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm text-gray-400">
                Administrator
              </p>

              <p className="text-sm font-medium">
                {adminEmail}
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
            Phase 1A
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Nexora Control Center
          </h2>

          <p className="mt-3 max-w-2xl text-gray-400">
            Manage the systems that will control Nexora's knowledge,
            behavior, templates, learning, features, and user feedback.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {adminSections.map((section) => (
            <button
              key={section.title}
              type="button"
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 text-left transition hover:border-blue-500/40 hover:bg-white/10"
            >
              <div className="flex items-start justify-between">
                <span className="text-3xl">
                  {section.icon}
                </span>

                <span className="rounded-full border border-white/10 px-2 py-1 text-xs text-gray-500">
                  Coming
                </span>
              </div>

              <h3 className="mt-6 text-xl font-semibold">
                {section.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                {section.description}
              </p>

              <p className="mt-5 text-sm font-medium text-blue-400 opacity-0 transition group-hover:opacity-100">
                Open →
              </p>
            </button>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6">
          <p className="text-sm font-semibold text-blue-400">
            Phase 1 foundation
          </p>

          <h3 className="mt-2 text-xl font-semibold">
            Your Nexora control center is ready.
          </h3>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-400">
            The sections above are currently placeholders. We will
            connect them one by one to Supabase so you can manage
            Nexora without editing the application code every time.
          </p>
        </div>
      </section>
    </main>
  );
}