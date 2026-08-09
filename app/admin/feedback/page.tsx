"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

const ADMIN_EMAIL = "samsaam470@gmail.com";

type Feedback = {
  id: string;
  user_email: string | null;
  type: string;
  message: string;
  status: string;
  admin_reply: string | null;
  created_at: string;
};

export default function FeedbackPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<Feedback[]>([]);

  useEffect(() => {
    checkAdmin();
  }, []);

  async function checkAdmin() {
    const { data } = await supabase.auth.getUser();

    const email = data.user?.email?.toLowerCase();

    if (email !== ADMIN_EMAIL.toLowerCase()) {
      await supabase.auth.signOut();
      router.replace("/login");
      return;
    }

    await loadFeedback();
    setLoading(false);
  }

  async function loadFeedback() {
    const { data, error } = await supabase
      .from("nexora_feedback")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setFeedback(data || []);
  }

  async function updateStatus(
    id: string,
    status: string
  ) {
    const { error } = await supabase
      .from("nexora_feedback")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    await loadFeedback();
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading feedback...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <Link href="/admin" className="font-bold">
            ← Admin Control Center
          </Link>

          <h1 className="mt-5 text-3xl font-bold">
            User Feedback
          </h1>

          <p className="mt-2 text-gray-400">
            Review feedback, suggestions and reports from Nexora users.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-10">
        {feedback.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
            <h2 className="text-xl font-bold">
              No feedback yet
            </h2>

            <p className="mt-2 text-gray-500">
              User feedback will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-5">
            {feedback.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="flex flex-col justify-between gap-3 sm:flex-row">
                  <div>
                    <p className="text-sm text-blue-400">
                      {item.type}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {item.user_email || "Unknown user"}
                    </p>
                  </div>

                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-400">
                    {item.status}
                  </span>
                </div>

                <p className="mt-5 whitespace-pre-wrap leading-7 text-gray-300">
                  {item.message}
                </p>

                {item.admin_reply && (
                  <div className="mt-5 rounded-xl bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-wider text-gray-500">
                      Admin Reply
                    </p>

                    <p className="mt-2 text-sm text-gray-300">
                      {item.admin_reply}
                    </p>
                  </div>
                )}

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() =>
                      updateStatus(item.id, "reviewed")
                    }
                    className="rounded-lg border border-white/10 px-4 py-2 text-sm hover:bg-white/10"
                  >
                    Mark Reviewed
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(item.id, "resolved")
                    }
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-700"
                  >
                    Resolve
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}