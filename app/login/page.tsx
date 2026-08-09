"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

const ADMIN_EMAIL = "samsaam470@gmail.com";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminAccessPassword, setAdminAccessPassword] = useState("");
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [adminStep, setAdminStep] = useState(false);

  async function handleLogin() {
    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }

    if (!password) {
      alert("Please enter your password.");
      return;
    }

    setLoading(true);

    const result = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (result.error) {
      setLoading(false);
      alert(result.error.message);
      return;
    }

    const loggedInEmail = result.data.user?.email?.toLowerCase();

    if (loggedInEmail === ADMIN_EMAIL.toLowerCase()) {
      setAdminStep(true);
      setLoading(false);
      return;
    }

    window.location.href = "/dashboard";
  }

  async function handleAdminVerification() {
    if (!adminAccessPassword) {
      alert("Please enter the admin access password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/admin/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          accessPassword: adminAccessPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        await supabase.auth.signOut();
        setLoading(false);
        alert(data.error || "Admin verification failed.");
        window.location.href = "/login";
        return;
      }

      setLoading(false);
      window.location.href = "/admin";
    } catch {
      await supabase.auth.signOut();
      setLoading(false);
      alert("Unable to verify admin access.");
      window.location.href = "/login";
    }
  }

  if (adminStep) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl">
          <div className="text-center">
            <Link href="/" className="text-2xl font-bold">
              Nexora AI
            </Link>

            <h1 className="mt-8 text-3xl font-bold">
              Admin Verification
            </h1>

            <p className="mt-2 text-gray-400">
              Enter your admin access password to continue.
            </p>
          </div>

          <input
            type="password"
            value={adminAccessPassword}
            onChange={(event) =>
              setAdminAccessPassword(event.target.value)
            }
            placeholder="Admin access password"
            autoComplete="off"
            className="mt-8 w-full rounded-lg border border-white/10 bg-white/10 p-3 text-white outline-none placeholder:text-gray-500 focus:border-blue-500"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleAdminVerification();
              }
            }}
          />

          <button
            type="button"
            onClick={handleAdminVerification}
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Enter Admin Portal"}
          </button>

          <button
            type="button"
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = "/login";
            }}
            className="mt-4 w-full rounded-lg border border-white/10 py-3 text-gray-300 transition hover:bg-white/10"
          >
            Back to Login
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl">
        <div className="text-center">
          <Link href="/" className="text-2xl font-bold">
            Nexora AI
          </Link>

          <h1 className="mt-8 text-3xl font-bold">
            Welcome Back
          </h1>

          <p className="mt-2 text-gray-400">
            Log in to your Nexora AI account.
          </p>
        </div>

        <div className="mt-8">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-lg border border-white/10 bg-white/10 p-3 text-white outline-none placeholder:text-gray-500 focus:border-blue-500"
          />
        </div>

        <div className="mt-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-300"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleLogin();
              }
            }}
            className="mt-2 w-full rounded-lg border border-white/10 bg-white/10 p-3 text-white outline-none placeholder:text-gray-500 focus:border-blue-500"
          />
        </div>

        <div className="mt-3 text-right">
          <Link
            href="/forgot-password"
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="button"
          onClick={handleLogin}
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-blue-400 hover:text-blue-300"
          >
            Create one
          </Link>
        </p>

        <p className="mt-4 text-center">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-gray-300"
          >
            Back to Nexora AI
          </Link>
        </p>
      </div>
    </main>
  );
}