"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        setReady(true);
      }
    }

    checkSession();
  }, []);

  async function handleUpdatePassword() {
    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Password changed successfully.");
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8">
        <h1 className="text-3xl font-bold">
          Create New Password
        </h1>

        <p className="mt-2 text-gray-400">
          Choose a new password for your Nexora AI account.
        </p>

        {!ready ? (
          <p className="mt-8 text-gray-400">
            Waiting for password reset session...
          </p>
        ) : (
          <>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="New password"
              className="mt-8 w-full rounded-lg border border-white/10 bg-white/10 p-3 outline-none focus:border-blue-500"
            />

            <input
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
              placeholder="Confirm new password"
              className="mt-4 w-full rounded-lg border border-white/10 bg-white/10 p-3 outline-none focus:border-blue-500"
            />

            <button
              type="button"
              onClick={handleUpdatePassword}
              disabled={loading}
              className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </>
        )}
      </div>
    </main>
  );
}