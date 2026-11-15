"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Lock, User, ArrowRight, ShieldCheck, ArrowLeft, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Invalid credentials. Please try again.");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("An unexpected network error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.035]"
        aria-hidden="true"
      >
        <div className="relative w-96 h-96 sm:w-[520px] sm:h-[520px]">
          <Image
            src="/logo.png"
            alt=""
            fill
            className="object-contain"
            priority={false}
          />
        </div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-teal-900/70 hover:text-coral-500 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Website</span>
          </Link>

          <div className="w-16 h-16 rounded-2xl bg-teal-900 text-sun-500 flex items-center justify-center mx-auto mb-4 shadow-md">
            <Image
              src="/logo.png"
              alt="The Share Community"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
            Admin Portal
          </h1>
          <p className="text-sm text-ink/70 font-sans mt-1">
            The Share Community Trust · Secure Access
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl p-7 sm:p-9 border border-teal-900/10 shadow-lg">
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-coral-500/10 border border-coral-500/20 text-coral-500 text-sm flex items-start gap-3">
              <span className="font-bold">Error:</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="block text-xs font-bold uppercase tracking-wider text-teal-900 mb-2"
              >
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-teal-900/40">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-10 pr-4 py-3 bg-cream/50 border border-teal-900/15 rounded-xl text-ink text-sm placeholder:text-ink/35 focus:outline-none focus:ring-2 focus:ring-sun-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold uppercase tracking-wider text-teal-900 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-teal-900/40">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-cream/50 border border-teal-900/15 rounded-xl text-ink text-sm placeholder:text-ink/35 focus:outline-none focus:ring-2 focus:ring-sun-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 px-4 bg-sun-500 hover:bg-coral-500 text-white font-semibold rounded-full shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Security footnote */}
          <div className="mt-6 pt-5 border-t border-teal-900/10 flex items-center justify-center gap-2 text-xs text-ink/60">
            <ShieldCheck className="w-4 h-4 text-leaf-500" />
            <span>Protected by secure session credentials</span>
          </div>
        </div>

        <div className="text-center mt-6 text-xs text-ink/50">
          <p>© 2026 The Share Community. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
