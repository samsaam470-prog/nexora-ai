"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleReset() {
    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(
      email.trim(),
      {
        redirectTo: `${window.location.origin}/reset-password`,
      }
    );

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setSent(true);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8">
        <h1 className="text-3xl font-bold">Forgot Password?</h1>

        <p className="mt-2 text-gray-400">
          Enter your email and we&apos;ll send you a password reset link.
        </p>

        {sent ? (
          <div className="mt-8 rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-300">
            Password reset email sent. Check your inbox.
          </div>
        ) : (
          <>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="mt-8 w-full rounded-lg border border-white/10 bg-white/10 p-3 outline-none focus:border-blue-500"
            />

            <button
              type="button"
              onClick={handleReset}
              disabled={loading}
              className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </>
        )}

        <p className="mt-6 text-center text-sm text-gray-400">
          Remember your password?{" "}
          <Link
            href="/login"
            className="text-blue-400 hover:text-blue-300"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}