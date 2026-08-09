"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

const ADMIN_EMAIL = "samsaam470@gmail.com";

export default function BehaviourPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("Nexora Default Behaviour");
  const [instructions, setInstructions] = useState("");
  const [tone, setTone] = useState("");
  const [motion, setMotion] = useState("");
  const [responseStyle, setResponseStyle] = useState("");

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

    await loadBehaviour();
    setLoading(false);
  }

  async function loadBehaviour() {
    const { data, error } = await supabase
      .from("nexora_behaviour")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      alert(error.message);
      return;
    }

    if (data) {
      setName(data.name || "");
      setInstructions(data.instructions || "");
      setTone(data.tone || "");
      setMotion(data.motion || "");
      setResponseStyle(data.response_style || "");
    }
  }

  async function saveBehaviour() {
    if (!name.trim() || !instructions.trim()) {
      alert("Name and instructions are required.");
      return;
    }

    setSaving(true);

    await supabase
      .from("nexora_behaviour")
      .update({ is_active: false })
      .eq("is_active", true);

    const { error } = await supabase
      .from("nexora_behaviour")
      .insert({
        name: name.trim(),
        instructions: instructions.trim(),
        tone: tone.trim(),
        motion: motion.trim(),
        response_style: responseStyle.trim(),
        is_active: true,
      });

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Nexora behaviour saved.");
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading behaviour settings...
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
            AI Behaviour
          </h1>

          <p className="mt-2 text-gray-400">
            Control how Nexora should behave and respond.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="grid gap-5">
            <div>
              <label className="text-sm text-gray-400">
                Behaviour Name
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">
                Main Instructions
              </label>

              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                rows={10}
                placeholder="Tell Nexora how it should behave..."
                className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">
                Tone
              </label>

              <input
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                placeholder="Helpful, professional, friendly..."
                className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">
                Motion / Interaction Behaviour
              </label>

              <textarea
                value={motion}
                onChange={(e) => setMotion(e.target.value)}
                rows={5}
                placeholder="Describe how Nexora's interface or interactions should behave..."
                className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">
                Response Style
              </label>

              <textarea
                value={responseStyle}
                onChange={(e) => setResponseStyle(e.target.value)}
                rows={5}
                placeholder="Describe the desired response style..."
                className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white"
              />
            </div>

            <button
              onClick={saveBehaviour}
              disabled={saving}
              className="rounded-lg bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Behaviour"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}