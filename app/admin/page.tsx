"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

const ADMIN_EMAIL = "samsaam470@gmail.com";

export default function AdminPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function checkAdmin() {
      const { data } = await supabase.auth.getUser();

      const userEmail = data.user?.email?.toLowerCase() || "";

      if (!userEmail || userEmail !== ADMIN_EMAIL.toLowerCase()) {
        await supabase.auth.signOut();
        router.replace("/login");
        return;
      }

      setEmail(userEmail);
      setLoading(false);
    }

    checkAdmin();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <p className="text-lg font-semibold">
            Checking admin access...
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Please wait.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HEADER */}
      <header className="border-b border-white/10 bg-black/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <Link
              href="/"
              className="text-xl font-bold tracking-tight"
            >
              Nexora AI
            </Link>

            <p className="mt-1 text-sm text-gray-400">
              Admin Control Center
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-gray-200">
                Administrator
              </p>

              <p className="text-xs text-gray-500">
                {email}
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium transition hover:bg-white/10"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        {/* INTRO */}
        <div>
          <div className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
            Phase 1
          </div>

          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
            Nexora Control Center
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-gray-400">
            Manage Nexora&apos;s features, knowledge, templates,
            behaviour, learning systems, users and feedback from
            one central administration area.
          </p>
        </div>

        {/* QUICK STATUS */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatusCard
            title="Features"
            value="Active"
            description="Manage Nexora capabilities"
          />

          <StatusCard
            title="Knowledge"
            value="Ready"
            description="URLs, text and files"
          />

          <StatusCard
            title="Templates"
            value="Phase 1"
            description="Reusable generation templates"
          />

          <StatusCard
            title="Learning"
            value="Preparing"
            description="Project knowledge system"
          />
        </div>

        {/* CORE MANAGEMENT */}
        <div className="mt-14">
          <SectionHeading
            title="Core Management"
            description="The main controls for building and improving Nexora."
          />

          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AdminLinkCard
              href="/admin/features"
              icon="⚡"
              title="Features"
              description="Create, edit, enable, disable and test the capabilities Nexora provides."
              status="Phase 1"
            />

            <AdminLinkCard
              href="/admin/knowledge"
              icon="🧠"
              title="Knowledge"
              description="Add websites, URLs, text, PDFs, documents and images for Nexora to use as knowledge."
              status="Ready"
            />

            <AdminLinkCard
              href="/admin/templates"
              icon="📋"
              title="Templates"
              description="Create and manage reusable templates that Nexora can use when generating content."
              status="Phase 1"
            />

            <AdminLinkCard
              href="/admin/behaviour"
              icon="🎛️"
              title="AI Behaviour"
              description="Control Nexora's instructions, tone, response style, rules and behaviour."
              status="Phase 1"
            />

            <AdminLinkCard
              href="/admin/learning"
              icon="🔗"
              title="Learning"
              description="Manage project knowledge and prepare Nexora to learn from websites and previous projects."
              status="Coming Soon"
            />

            <AdminLinkCard
              href="/admin/feedback"
              icon="💬"
              title="Feedback"
              description="Review user feedback, feature requests, suggestions and bug reports."
              status="Phase 1"
            />
          </div>
        </div>

        {/* NEXORA KNOWLEDGE SYSTEM */}
        <div className="mt-14">
          <SectionHeading
            title="Nexora Knowledge System"
            description="The foundation for allowing Nexora to work with information supplied by you."
          />

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="grid gap-6 md:grid-cols-4">
              <SystemStep
                number="01"
                title="Website"
                description="Add a URL that Nexora can use as a knowledge source."
              />

              <SystemStep
                number="02"
                title="Files"
                description="Store PDFs, documents and images in private storage."
              />

              <SystemStep
                number="03"
                title="Organize"
                description="Connect knowledge to the features that need it."
              />

              <SystemStep
                number="04"
                title="Use"
                description="Eventually allow Nexora to retrieve and use that knowledge."
              />
            </div>
          </div>
        </div>

        {/* FUTURE LEARNING */}
        <div className="mt-14">
          <SectionHeading
            title="Future Learning System"
            description="The foundation for Nexora's project-based learning capabilities."
          />

          <div className="mt-6 rounded-2xl border border-blue-500/20 bg-blue-500/[0.04] p-6">
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                  Planned Capability
                </span>

                <h3 className="mt-3 text-2xl font-bold">
                  Learn from previous projects
                </h3>

                <p className="mt-4 leading-7 text-gray-400">
                  If Nexora previously helped create a restaurant
                  website, the project&apos;s approved knowledge can
                  eventually be reused when the user asks Nexora to
                  create something new for that restaurant.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/30 p-5">
                <p className="text-sm font-semibold text-gray-200">
                  Example
                </p>

                <p className="mt-3 text-sm leading-6 text-gray-400">
                  &quot;Create a promotional video for my restaurant
                  using this footage.&quot;
                </p>

                <p className="mt-4 text-sm leading-6 text-gray-500">
                  Nexora could eventually use the restaurant&apos;s
                  approved website knowledge, brand information,
                  previous project context and provided footage to
                  produce a more relevant result.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECURITY */}
        <div className="mt-14">
          <SectionHeading
            title="Account & Security"
            description="Manage administrator account security."
          />

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-xl font-bold">
                  Admin Account
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  Signed in as {email}
                </p>
              </div>

              <Link
                href="/change-password"
                className="rounded-lg bg-blue-600 px-5 py-3 text-center text-sm font-semibold transition hover:bg-blue-700"
              >
                Change Password
              </Link>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-16 border-t border-white/10 pt-6">
          <p className="text-center text-xs text-gray-600">
            Nexora AI Admin Portal • Phase 1
          </p>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   STATUS CARD
========================================================= */

function StatusCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold">
        {value}
      </p>

      <p className="mt-2 text-xs text-gray-500">
        {description}
      </p>
    </div>
  );
}

/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold">
        {title}
      </h2>

      <p className="mt-2 text-sm leading-6 text-gray-500">
        {description}
      </p>
    </div>
  );
}

/* =========================================================
   ADMIN LINK CARD
========================================================= */

function AdminLinkCard({
  href,
  icon,
  title,
  description,
  status,
}: {
  href: string;
  icon: string;
  title: string;
  description: string;
  status: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-0.5 hover:border-blue-500/30 hover:bg-white/[0.06]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xl">
          {icon}
        </div>

        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-500">
          {status}
        </span>
      </div>

      <h3 className="mt-5 text-xl font-bold group-hover:text-blue-400">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-gray-400">
        {description}
      </p>

      <div className="mt-5 text-sm font-semibold text-blue-400">
        Open →
      </div>
    </Link>
  );
}

/* =========================================================
   SYSTEM STEP
========================================================= */

function SystemStep({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <span className="text-xs font-bold text-blue-400">
        {number}
      </span>

      <h3 className="mt-2 font-bold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-500">
        {description}
      </p>
    </div>
  );
}