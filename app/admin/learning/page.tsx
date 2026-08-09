"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

const ADMIN_EMAIL = "samsaam470@gmail.com";

type Project = {
  id: string;
  project_name: string;
  description: string | null;
  website_url: string | null;
  knowledge_notes: string | null;
  status: string;
};

export default function LearningPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [knowledgeNotes, setKnowledgeNotes] = useState("");

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

    await loadProjects();
    setLoading(false);
  }

  async function loadProjects() {
    const { data, error } = await supabase
      .from("nexora_learning_projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setProjects(data || []);
  }

  async function createProject() {
    if (!projectName.trim()) {
      alert("Project name is required.");
      return;
    }

    setSaving(true);

    const { error } = await supabase
      .from("nexora_learning_projects")
      .insert({
        project_name: projectName.trim(),
        description: description.trim(),
        website_url: websiteUrl.trim(),
        knowledge_notes: knowledgeNotes.trim(),
      });

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    setProjectName("");
    setDescription("");
    setWebsiteUrl("");
    setKnowledgeNotes("");

    await loadProjects();

    alert("Learning project created.");
  }

  async function updateStatus(
    id: string,
    status: string
  ) {
    const { error } = await supabase
      .from("nexora_learning_projects")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    await loadProjects();
  }

  async function deleteProject(id: string) {
    if (!confirm("Delete this learning project?")) {
      return;
    }

    const { error } = await supabase
      .from("nexora_learning_projects")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    await loadProjects();
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading learning system...
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
            Nexora Learning
          </h1>

          <p className="mt-2 max-w-3xl text-gray-400">
            Organize projects, websites and approved knowledge that
            Nexora can eventually use when working on related tasks.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-2xl border border-blue-500/20 bg-blue-500/[0.03] p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
            Phase 1 Foundation
          </p>

          <h2 className="mt-3 text-2xl font-bold">
            Project Knowledge
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-gray-400">
            For example, if Nexora helped create a restaurant
            website, this system can keep the restaurant&apos;s
            approved website URL and project notes available for
            future Nexora capabilities.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-bold">
            Add Learning Project
          </h2>

          <div className="mt-6 grid gap-4">
            <input
              value={projectName}
              onChange={(e) =>
                setProjectName(e.target.value)
              }
              placeholder="Project name"
              className="rounded-lg border border-white/10 bg-white/5 p-3 text-white"
            />

            <input
              value={websiteUrl}
              onChange={(e) =>
                setWebsiteUrl(e.target.value)
              }
              placeholder="Website URL"
              className="rounded-lg border border-white/10 bg-white/5 p-3 text-white"
            />

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Project description"
              rows={4}
              className="rounded-lg border border-white/10 bg-white/5 p-3 text-white"
            />

            <textarea
              value={knowledgeNotes}
              onChange={(e) =>
                setKnowledgeNotes(e.target.value)
              }
              placeholder="Approved project knowledge / notes"
              rows={8}
              className="rounded-lg border border-white/10 bg-white/5 p-3 text-white"
            />

            <button
              onClick={createProject}
              disabled={saving}
              className="rounded-lg bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Add Project"}
            </button>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold">
            Saved Projects
          </h2>

          <div className="mt-5 grid gap-5">
            {projects.length === 0 && (
              <div className="rounded-xl border border-white/10 p-6 text-gray-500">
                No learning projects created yet.
              </div>
            )}

            {projects.map((project) => (
              <div
                key={project.id}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row">
                  <div>
                    <h3 className="text-xl font-bold">
                      {project.project_name}
                    </h3>

                    {project.website_url && (
                      <p className="mt-2 break-all text-sm text-blue-400">
                        {project.website_url}
                      </p>
                    )}
                  </div>

                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-400">
                    {project.status}
                  </span>
                </div>

                {project.description && (
                  <p className="mt-4 text-sm leading-6 text-gray-400">
                    {project.description}
                  </p>
                )}

                {project.knowledge_notes && (
                  <div className="mt-5 rounded-xl bg-black/40 p-4">
                    <p className="text-xs uppercase tracking-wider text-gray-600">
                      Knowledge Notes
                    </p>

                    <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-400">
                      {project.knowledge_notes}
                    </p>
                  </div>
                )}

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    onClick={() =>
                      updateStatus(project.id, "active")
                    }
                    className="rounded-lg border border-white/10 px-4 py-2 text-sm hover:bg-white/10"
                  >
                    Activate
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(project.id, "archived")
                    }
                    className="rounded-lg border border-white/10 px-4 py-2 text-sm hover:bg-white/10"
                  >
                    Archive
                  </button>

                  <button
                    onClick={() =>
                      deleteProject(project.id)
                    }
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