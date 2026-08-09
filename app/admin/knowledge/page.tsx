"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

type Knowledge = {
  id: string;
  title: string;
  source_type: string;
  source_url: string | null;
  content: string | null;
  description: string | null;
  enabled: boolean;
  created_at: string;
};

const ADMIN_EMAIL = "samsaam470@gmail.com";

export default function KnowledgePage() {
  const [loading, setLoading] = useState(true);
  const [knowledge, setKnowledge] = useState<Knowledge[]>([]);
  const [message, setMessage] = useState("");

  const [title, setTitle] = useState("");
  const [type, setType] = useState("website");
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    checkAdminAndLoad();
  }, []);

  async function checkAdminAndLoad() {
    const { data } = await supabase.auth.getUser();

    const email = data.user?.email?.toLowerCase() || "";

    if (email !== ADMIN_EMAIL.toLowerCase()) {
      window.location.href = "/login";
      return;
    }

    await loadKnowledge();

    setLoading(false);
  }

  async function loadKnowledge() {
    const { data, error } = await supabase
      .from("knowledge")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setMessage(error.message);
      return;
    }

    setKnowledge(data || []);
  }

  async function addKnowledge() {
    setMessage("");

    if (!title.trim()) {
      setMessage("Please enter a title.");
      return;
    }

    if (type === "website" && !url.trim()) {
      setMessage("Please enter a website URL.");
      return;
    }

    if (type === "text" && !content.trim()) {
      setMessage("Please enter knowledge text.");
      return;
    }

    if (
      ["pdf", "document", "image"].includes(type) &&
      !file
    ) {
      setMessage("Please select a file.");
      return;
    }

    setSaving(true);

    try {
      let knowledgeId: string | null = null;
      let filePath: string | null = null;
      let fileUrl: string | null = null;

      const { data: inserted, error: insertError } = await supabase
        .from("knowledge")
        .insert({
          title: title.trim(),
          source_type: type,
          source_url: type === "website" ? url.trim() : null,
          content: type === "text" ? content.trim() : null,
          description: description.trim() || null,
          enabled: true,
        })
        .select()
        .single();

      if (insertError) {
        throw new Error(insertError.message);
      }

      knowledgeId = inserted.id;

      if (file && knowledgeId) {
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");

        filePath = `${knowledgeId}/${Date.now()}-${safeName}`;

        const { error: uploadError } = await supabase.storage
          .from("nexora-knowledge")
          .upload(filePath, file);

        if (uploadError) {
          await supabase
            .from("knowledge")
            .delete()
            .eq("id", knowledgeId);

          throw new Error(uploadError.message);
        }

        const { data: signedUrlData, error: signedUrlError } =
          await supabase.storage
            .from("nexora-knowledge")
            .createSignedUrl(filePath, 60 * 60);

        if (signedUrlError) {
          throw new Error(signedUrlError.message);
        }

        fileUrl = signedUrlData.signedUrl;

        const { error: fileRecordError } = await supabase
          .from("knowledge_files")
          .insert({
            knowledge_id: knowledgeId,
            file_name: file.name,
            file_type: type,
            file_path: filePath,
            file_url: fileUrl,
            file_size: file.size,
            mime_type: file.type,
            enabled: true,
          });

        if (fileRecordError) {
          throw new Error(fileRecordError.message);
        }
      }

      setTitle("");
      setType("website");
      setUrl("");
      setContent("");
      setDescription("");
      setFile(null);

      const fileInput = document.getElementById(
        "knowledge-file"
      ) as HTMLInputElement | null;

      if (fileInput) {
        fileInput.value = "";
      }

      setMessage("Knowledge added successfully.");

      await loadKnowledge();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  }

  async function toggleKnowledge(item: Knowledge) {
    const { error } = await supabase
      .from("knowledge")
      .update({
        enabled: !item.enabled,
        updated_at: new Date().toISOString(),
      })
      .eq("id", item.id);

    if (error) {
      setMessage(error.message);
      return;
    }

    await loadKnowledge();
  }

  async function deleteKnowledge(item: Knowledge) {
    const confirmed = window.confirm(
      `Delete "${item.title}"?`
    );

    if (!confirmed) return;

    const { data: files } = await supabase
      .from("knowledge_files")
      .select("file_path")
      .eq("knowledge_id", item.id);

    if (files && files.length > 0) {
      const paths = files
        .map((file) => file.file_path)
        .filter(Boolean);

      if (paths.length > 0) {
        await supabase.storage
          .from("nexora-knowledge")
          .remove(paths);
      }
    }

    const { error } = await supabase
      .from("knowledge")
      .delete()
      .eq("id", item.id);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Knowledge deleted.");

    await loadKnowledge();
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">
          Checking admin access...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <Link
              href="/admin"
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              ← Back to Admin Portal
            </Link>

            <h1 className="mt-2 text-3xl font-bold">
              Knowledge Manager
            </h1>

            <p className="mt-1 text-sm text-gray-400">
              Manage websites, text, PDFs, documents and images
              used by Nexora.
            </p>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-bold">
            Add Knowledge
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            Add a website, text source or upload a knowledge file.
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <label className="text-sm text-gray-300">
                Title
              </label>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Restaurant Website"
                className="mt-2 w-full rounded-lg border border-white/10 bg-black p-3 text-white outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">
                Source Type
              </label>

              <select
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  setFile(null);
                }}
                className="mt-2 w-full rounded-lg border border-white/10 bg-black p-3 text-white outline-none"
              >
                <option value="website">
                  Website URL
                </option>

                <option value="text">
                  Manual Text
                </option>

                <option value="pdf">
                  PDF
                </option>

                <option value="document">
                  Document
                </option>

                <option value="image">
                  Image
                </option>
              </select>
            </div>
          </div>

          <div className="mt-5">
            <label className="text-sm text-gray-300">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is this knowledge about?"
              rows={3}
              className="mt-2 w-full rounded-lg border border-white/10 bg-black p-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          {type === "website" && (
            <div className="mt-5">
              <label className="text-sm text-gray-300">
                Website URL
              </label>

              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="mt-2 w-full rounded-lg border border-white/10 bg-black p-3 text-white outline-none focus:border-blue-500"
              />
            </div>
          )}

          {type === "text" && (
            <div className="mt-5">
              <label className="text-sm text-gray-300">
                Knowledge Content
              </label>

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter Nexora knowledge here..."
                rows={8}
                className="mt-2 w-full rounded-lg border border-white/10 bg-black p-3 text-white outline-none focus:border-blue-500"
              />
            </div>
          )}

          {["pdf", "document", "image"].includes(type) && (
            <div className="mt-5">
              <label
                htmlFor="knowledge-file"
                className="text-sm text-gray-300"
              >
                Upload File
              </label>

              <input
                id="knowledge-file"
                type="file"
                accept={
                  type === "pdf"
                    ? ".pdf,application/pdf"
                    : type === "image"
                    ? "image/*"
                    : ".doc,.docx,.txt,.md,.csv,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                }
                onChange={(e) =>
                  setFile(e.target.files?.[0] || null)
                }
                className="mt-2 block w-full rounded-lg border border-white/10 bg-black p-3 text-sm text-gray-300"
              />

              {file && (
                <p className="mt-2 text-sm text-gray-500">
                  Selected: {file.name}
                </p>
              )}
            </div>
          )}

          {message && (
            <div className="mt-5 rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-gray-300">
              {message}
            </div>
          )}

          <button
            type="button"
            onClick={addKnowledge}
            disabled={saving}
            className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Adding..." : "Add Knowledge"}
          </button>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold">
            Knowledge Library
          </h2>

          {knowledge.length === 0 ? (
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-gray-400">
              No knowledge sources added yet.
            </div>
          ) : (
            <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {knowledge.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-bold">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-xs uppercase tracking-wide text-blue-400">
                        {item.source_type}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs ${
                        item.enabled
                          ? "bg-green-500/10 text-green-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {item.enabled
                        ? "Enabled"
                        : "Disabled"}
                    </span>
                  </div>

                  {item.description && (
                    <p className="mt-4 text-sm text-gray-400">
                      {item.description}
                    </p>
                  )}

                  {item.source_url && (
                    <p className="mt-3 truncate text-sm text-gray-500">
                      {item.source_url}
                    </p>
                  )}

                  <div className="mt-5 flex gap-2">
                    <button
                      onClick={() =>
                        toggleKnowledge(item)
                      }
                      className="rounded-lg border border-white/10 px-3 py-2 text-sm hover:bg-white/10"
                    >
                      {item.enabled
                        ? "Disable"
                        : "Enable"}
                    </button>

                    <button
                      onClick={() =>
                        deleteKnowledge(item)
                      }
                      className="rounded-lg border border-red-500/20 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}