"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [referralSource, setReferralSource] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }

    if (!password) {
      alert("Please enter a password.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (!ageRange) {
      alert("Please select your age range.");
      return;
    }

    if (!referralSource) {
      alert("Please tell us how you heard about Nexora.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          age_range: ageRange,
          referral_source: referralSource,
        },
      },
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert(
      "Account created successfully. Please check your email to confirm your account."
    );
  }

  async function handleGoogleSignup() {
    setLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      setLoading(false);
      alert(error.message);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 py-12 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl">
        <div className="text-center">
          <Link
            href="/"
            className="text-2xl font-bold text-white hover:text-blue-400"
          >
            Nexora AI
          </Link>

          <h1 className="mt-8 text-3xl font-bold">
            Create Your Account
          </h1>

          <p className="mt-2 text-gray-400">
            Start building with Nexora AI.
          </p>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignup}
          disabled={loading}
          className="mt-8 w-full rounded-lg border border-white/15 bg-white/10 py-3 font-semibold transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Continue with Google
        </button>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-sm text-gray-500">OR</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <label className="block text-sm font-medium text-gray-300">
          Email
        </label>

        <input
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="mt-2 w-full rounded-lg border border-white/10 bg-white/10 p-3 text-white outline-none placeholder:text-gray-500 focus:border-blue-500"
        />

        <label className="mt-4 block text-sm font-medium text-gray-300">
          Password
        </label>

        <input
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Create a password"
          className="mt-2 w-full rounded-lg border border-white/10 bg-white/10 p-3 text-white outline-none placeholder:text-gray-500 focus:border-blue-500"
        />

        <label className="mt-4 block text-sm font-medium text-gray-300">
          Confirm Password
        </label>

        <input
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          placeholder="Confirm your password"
          className="mt-2 w-full rounded-lg border border-white/10 bg-white/10 p-3 text-white outline-none placeholder:text-gray-500 focus:border-blue-500"
        />

        <label className="mt-4 block text-sm font-medium text-gray-300">
          Age Range
        </label>

        <select
          value={ageRange}
          onChange={(event) => setAgeRange(event.target.value)}
          className="mt-2 w-full rounded-lg border border-white/10 bg-white/10 p-3 text-gray-300 outline-none focus:border-blue-500"
        >
          <option value="" disabled>
            Select your age range
          </option>
          <option value="13-17">13–17</option>
          <option value="18-24">18–24</option>
          <option value="25-34">25–34</option>
          <option value="35-44">35–44</option>
          <option value="45-54">45–54</option>
          <option value="55+">55+</option>
        </select>

        <label className="mt-4 block text-sm font-medium text-gray-300">
          How did you hear about Nexora?
        </label>

        <select
          value={referralSource}
          onChange={(event) => setReferralSource(event.target.value)}
          className="mt-2 w-full rounded-lg border border-white/10 bg-white/10 p-3 text-gray-300 outline-none focus:border-blue-500"
        >
          <option value="" disabled>
            Select an option
          </option>
          <option value="google">Google</option>
          <option value="youtube">YouTube</option>
          <option value="instagram">Instagram</option>
          <option value="tiktok">TikTok</option>
          <option value="friend">Friend or colleague</option>
          <option value="other">Other</option>
        </select>

        <button
          type="button"
          onClick={handleSignup}
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-blue-400 hover:text-blue-300"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
