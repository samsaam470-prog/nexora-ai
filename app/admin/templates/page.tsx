"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

const ADMIN_EMAIL = "samsaam470@gmail.com";

type Template = {
  id: string;
  name: string;
  description: string | null;
  category: string | null;
  prompt: string;
  is_active: boolean;
};

export default function TemplatesPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [templates, setTemplates] = useState<Template[]>([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [prompt, setPrompt] = useState("");

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

    await loadTemplates();
    setLoading(false);
  }

  async function loadTemplates() {
    const { data, error } = await supabase
      .from("nexora_templates")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setTemplates(data || []);
  }

  async function createTemplate() {
    if (!name.trim() || !prompt.trim()) {
      alert("Template name and prompt are required.");
      return;
    }

    setSaving(true);

    const { error } = await supabase
      .from("nexora_templates")
      .insert({
        name: name.trim(),
        description: description.trim(),
        category: category.trim(),
        prompt: prompt.trim(),
      });

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    setName("");
    setDescription("");
    setCategory("");
    setPrompt("");

    await loadTemplates();

    alert("Template created successfully.");
  }

  async function toggleTemplate(template: Template) {
    const { error } = await supabase
      .from("nexora_templates")
      .update({
        is_active: !template.is_active,
        updated_at: new Date().toISOString(),
      })
      .eq("id", template.id);

    if (error) {
      alert(error.message);
      return;
    }

    await loadTemplates();
  }

  async function deleteTemplate(id: string) {
    if (!confirm("Delete this template?")) {
      return;
    }

    const { error } = await supabase
      .from("nexora_templates")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    await loadTemplates();
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading templates...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <Link href="/admin" className="font-bold">
              ← Admin Control Center
            </Link>

            <h1 className="mt-4 text-3xl font-bold">
              Templates
            </h1>

            <p className="mt-2 text-gray-400">
              Create reusable instructions that Nexora can use.
            </p>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-bold">
            Create Template
          </h2>

          <div className="mt-6 grid gap-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Template name"
              className="rounded-lg border border-white/10 bg-white/5 p-3 text-white outline-none"
            />

            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category e.g. Website, Video, Marketing"
              className="rounded-lg border border-white/10 bg-white/5 p-3 text-white outline-none"
            />

            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description"
              className="rounded-lg border border-white/10 bg-white/5 p-3 text-white outline-none"
            />

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Template prompt / instructions..."
              rows={8}
              className="rounded-lg border border-white/10 bg-white/5 p-3 text-white outline-none"
            />

            <button
              onClick={createTemplate}
              disabled={saving}
              className="rounded-lg bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Create Template"}
            </button>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold">
            Existing Templates
          </h2>

          <div className="mt-5 grid gap-5">
            {templates.length === 0 && (
              <div className="rounded-xl border border-white/10 p-6 text-gray-500">
                No templates created yet.
              </div>
            )}

            {templates.map((template) => (
              <div
                key={template.id}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row">
                  <div>
                    <h3 className="text-xl font-bold">
                      {template.name}
                    </h3>

                    <p className="mt-1 text-sm text-blue-400">
                      {template.category || "Uncategorized"}
                    </p>

                    <p className="mt-3 text-sm text-gray-400">
                      {template.description}
                    </p>
                  </div>

                  <span className="text-sm text-gray-500">
                    {template.is_active ? "Active" : "Disabled"}
                  </span>
                </div>

                <pre className="mt-5 whitespace-pre-wrap rounded-xl bg-black/40 p-4 text-sm text-gray-400">
                  {template.prompt}
                </pre>

                <div className="mt-5 flex gap-3">
                  <button
                    onClick={() => toggleTemplate(template)}
                    className="rounded-lg border border-white/10 px-4 py-2 text-sm hover:bg-white/10"
                  >
                    {template.is_active ? "Disable" : "Enable"}
                  </button>

                  <button
                    onClick={() => deleteTemplate(template.id)}
                    className="rounded-lg border border-red-500/20 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}