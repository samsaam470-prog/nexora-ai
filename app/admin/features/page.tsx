"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

type Feature = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  system_prompt: string;
  enabled: boolean;
  created_at: string;
  updated_at: string;
};

const ADMIN_EMAIL = "samsaam470@gmail.com";

export default function AdminFeaturesPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(
    null
  );

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    checkAdminAndLoad();
  }, []);

  async function checkAdminAndLoad() {
    const { data } = await supabase.auth.getUser();

    const email = data.user?.email?.toLowerCase() || "";

    if (email !== ADMIN_EMAIL.toLowerCase()) {
      await supabase.auth.signOut();
      window.location.href = "/login";
      return;
    }

    await loadFeatures();
    setLoading(false);
  }

  async function loadFeatures() {
    const { data, error } = await supabase
      .from("features")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setFeatures(data || []);
  }

  function resetForm() {
    setSelectedFeature(null);
    setName("");
    setSlug("");
    setDescription("");
    setSystemPrompt("");
    setEnabled(true);
  }

  function editFeature(feature: Feature) {
    setSelectedFeature(feature);
    setName(feature.name);
    setSlug(feature.slug);
    setDescription(feature.description || "");
    setSystemPrompt(feature.system_prompt);
    setEnabled(feature.enabled);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function saveFeature() {
    if (!name.trim()) {
      alert("Please enter a feature name.");
      return;
    }

    if (!slug.trim()) {
      alert("Please enter a feature slug.");
      return;
    }

    if (!systemPrompt.trim()) {
      alert("Please enter the feature instructions.");
      return;
    }

    setSaving(true);

    if (selectedFeature) {
      const { error } = await supabase
        .from("features")
        .update({
          name: name.trim(),
          slug: slug.trim().toLowerCase(),
          description: description.trim(),
          system_prompt: systemPrompt.trim(),
          enabled,
          updated_at: new Date().toISOString(),
        })
        .eq("id", selectedFeature.id);

      setSaving(false);

      if (error) {
        alert(error.message);
        return;
      }

      alert("Feature updated successfully.");
    } else {
      const { error } = await supabase.from("features").insert({
        name: name.trim(),
        slug: slug.trim().toLowerCase(),
        description: description.trim(),
        system_prompt: systemPrompt.trim(),
        enabled,
      });

      setSaving(false);

      if (error) {
        alert(error.message);
        return;
      }

      alert("Feature created successfully.");
    }

    resetForm();
    await loadFeatures();
  }

  async function toggleFeature(feature: Feature) {
    const { error } = await supabase
      .from("features")
      .update({
        enabled: !feature.enabled,
        updated_at: new Date().toISOString(),
      })
      .eq("id", feature.id);

    if (error) {
      alert(error.message);
      return;
    }

    await loadFeatures();
  }

  async function deleteFeature(feature: Feature) {
    const confirmed = window.confirm(
      `Delete "${feature.name}"? This cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    const { error } = await supabase
      .from("features")
      .delete()
      .eq("id", feature.id);

    if (error) {
      alert(error.message);
      return;
    }

    if (selectedFeature?.id === feature.id) {
      resetForm();
    }

    await loadFeatures();
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <p className="text-gray-400">Checking admin access...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10 bg-black/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <Link href="/admin" className="text-2xl font-bold">
              Nexora AI
            </Link>

            <p className="mt-1 text-sm text-gray-400">
              Admin Feature Manager
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="rounded-lg border border-white/10 px-4 py-2 text-sm hover:bg-white/10"
            >
              Admin Portal
            </Link>

            <button
              onClick={handleLogout}
              className="rounded-lg border border-white/10 px-4 py-2 text-sm hover:bg-white/10"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div>
          <h1 className="text-4xl font-bold">Feature Manager</h1>

          <p className="mt-3 max-w-3xl text-gray-400">
            Create and manage Nexora AI features, instructions, descriptions,
            and availability from one place.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {selectedFeature ? "Edit Feature" : "Create Feature"}
              </h2>

              {selectedFeature && (
                <button
                  onClick={resetForm}
                  className="text-sm text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
              )}
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-300">
                Feature Name
              </label>

              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Business Plan Generator"
                className="mt-2 w-full rounded-lg border border-white/10 bg-white/10 p-3 text-white outline-none placeholder:text-gray-500 focus:border-blue-500"
              />
            </div>

            <div className="mt-5">
              <label className="block text-sm font-medium text-gray-300">
                Feature Slug
              </label>

              <input
                value={slug}
                onChange={(event) =>
                  setSlug(
                    event.target.value
                      .toLowerCase()
                      .replace(/\s+/g, "-")
                  )
                }
                placeholder="business-plan-generator"
                className="mt-2 w-full rounded-lg border border-white/10 bg-white/10 p-3 text-white outline-none placeholder:text-gray-500 focus:border-blue-500"
              />

              <p className="mt-2 text-xs text-gray-500">
                Use a unique lowercase identifier.
              </p>
            </div>

            <div className="mt-5">
              <label className="block text-sm font-medium text-gray-300">
                Description
              </label>

              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Helps users create a practical business plan."
                rows={4}
                className="mt-2 w-full resize-none rounded-lg border border-white/10 bg-white/10 p-3 text-white outline-none placeholder:text-gray-500 focus:border-blue-500"
              />
            </div>

            <div className="mt-5">
              <label className="block text-sm font-medium text-gray-300">
                AI Instructions / System Prompt
              </label>

              <textarea
                value={systemPrompt}
                onChange={(event) => setSystemPrompt(event.target.value)}
                placeholder="Write the instructions that control how Nexora should behave for this feature..."
                rows={12}
                className="mt-2 w-full resize-y rounded-lg border border-white/10 bg-white/10 p-3 text-white outline-none placeholder:text-gray-500 focus:border-blue-500"
              />

              <p className="mt-2 text-xs leading-5 text-gray-500">
                These instructions will define how this feature should behave.
                Later we can connect this to Nexora&apos;s AI engine.
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4">
              <div>
                <p className="font-medium">Feature Status</p>

                <p className="mt-1 text-sm text-gray-500">
                  {enabled
                    ? "This feature is enabled."
                    : "This feature is disabled."}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setEnabled(!enabled)}
                className={`relative h-7 w-12 rounded-full transition ${
                  enabled ? "bg-blue-600" : "bg-white/20"
                }`}
                aria-label="Toggle feature"
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                    enabled ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>

            <button
              type="button"
              onClick={saveFeature}
              disabled={saving}
              className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving
                ? "Saving..."
                : selectedFeature
                  ? "Update Feature"
                  : "Create Feature"}
            </button>
          </section>

          <section>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Your Features</h2>

                <p className="mt-1 text-sm text-gray-500">
                  {features.length} feature
                  {features.length === 1 ? "" : "s"} configured
                </p>
              </div>

              <button
                onClick={resetForm}
                className="rounded-lg border border-white/10 px-4 py-2 text-sm hover:bg-white/10"
              >
                + New Feature
              </button>
            </div>

            <div className="mt-5 space-y-4">
              {features.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-10 text-center">
                  <h3 className="text-lg font-semibold">
                    No features yet
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    Create your first Nexora feature using the form.
                  </p>
                </div>
              ) : (
                features.map((feature) => (
                  <div
                    key={feature.id}
                    className="rounded-2xl border border-white/10 bg-white/5 p-6"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-xl font-bold">
                            {feature.name}
                          </h3>

                          <span
                            className={`rounded-full px-3 py-1 text-xs ${
                              feature.enabled
                                ? "bg-green-500/10 text-green-400"
                                : "bg-white/10 text-gray-500"
                            }`}
                          >
                            {feature.enabled ? "Enabled" : "Disabled"}
                          </span>
                        </div>

                        <p className="mt-2 text-xs text-gray-500">
                          {feature.slug}
                        </p>
                      </div>
                    </div>

                    {feature.description && (
                      <p className="mt-4 text-sm leading-6 text-gray-400">
                        {feature.description}
                      </p>
                    )}

                    <div className="mt-5 rounded-lg border border-white/10 bg-black/30 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Current Instructions
                      </p>

                      <p className="mt-2 max-h-24 overflow-hidden whitespace-pre-wrap text-sm leading-6 text-gray-400">
                        {feature.system_prompt}
                      </p>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <button
                        onClick={() => editFeature(feature)}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-700"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => toggleFeature(feature)}
                        className="rounded-lg border border-white/10 px-4 py-2 text-sm hover:bg-white/10"
                      >
                        {feature.enabled ? "Disable" : "Enable"}
                      </button>

                      <button
                        onClick={() => deleteFeature(feature)}
                        className="rounded-lg border border-red-500/20 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}