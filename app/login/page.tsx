"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRemember] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

   if (email === "joyedward124@gmail.com" && password === "nyangu") {
    router.push("/dashboard");
   } else if (
    email === "favour@gmail.com" &&
    password === "favour11#"
   ) {
    router.push("/manager");
   } else {
    alert("Invalid email or password");
   }
  };

  return (
    <main className="min-h-screen w-full bg-white md:grid md:grid-cols-[38%_62%]">
      <section className="relative min-h-70 overflow-hidden md:min-h-screen hidden lg:block">
        <img src="/image/Signup_hero.png" alt="Nyangu property" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 flex items-center gap-3 px-8 py-7 md:px-12 md:py-8">
          <img src="/image/logo_white.png" alt="logo"/>
          <span className="text-4xl font-bold tracking-tight text-black"></span>
        </div>
      </section>

      <section className="flex min-h-screen items-center justify-center border-l border-slate-100 px-5 py-10 sm:px-10">
        <form onSubmit={handleSubmit} className="w-full max-w-110 rounded-lg px-6 py-14 sm:px-16 sm:py-24">
          <h1 className="text-2xl font-bold text-[#00483d]">Welcome back</h1>
          <p className="mt-1 text-[11px] text-slate-700">Please login your account.</p>

          <div className="mt-4 space-y-4">
            <label className="block text-xs text-slate-900">
              Email
              <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1.5 h-9 w-full rounded-md border border-slate-200 bg-slate-100 px-3 text-xs outline-none placeholder:text-slate-400 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700" />
            </label>
            <label className="block text-xs text-slate-900">
              Password
              <input type="password" placeholder="............" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1.5 h-9 w-full rounded-md border border-slate-200 bg-slate-100 px-3 text-xs outline-none placeholder:text-slate-400 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700" />
            </label>
          </div>

          <div className="mt-2 flex items-center justify-between text-xs">
            <label className="flex items-center gap-1 text-slate-900">
              <input type="checkbox" checked={rememberMe} onChange={(e) => setRemember(e.target.checked)} className="accent-emerald-900" />
              Remember me
            </label>
            <Link href="/forgot-password" className="text-[#005c4d]">Forgot password?</Link>
          </div>

          <button type="submit" className="mt-5 h-9 w-full rounded-md bg-[#00483d] text-xs text-white transition-colors hover:bg-[#00372f]">Sign in</button>

          <div className="my-5 flex items-center gap-5 text-xs text-slate-900">
            <span className="h-px flex-1 bg-slate-200" />
            Or
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="space-y-3">
            <button type="button" className="flex h-9 w-full items-center justify-center gap-2 rounded-full border border-slate-200 text-[10px] text-slate-900"><img src="/image/Google_icon.png" alt="" className="h-4 w-4" /> Sign in with Google</button>
            <button type="button" className="flex h-9 w-full items-center justify-center gap-2 rounded-full border border-slate-200 text-[10px] text-slate-900"><img src="/image/Apple_icon.png" alt="" className="h-4 w-4" /> Sign in with Apple</button>
            <button type="button" className="flex h-9 w-full items-center justify-center gap-2 rounded-full border border-slate-200 text-[10px] text-slate-900"><img src="/image/Facebook_icon.png" alt="" className="h-4 w-4" /> Sign in with Facebook</button>
          </div>

          <p className="mt-5 text-center text-xs text-slate-900">Don&apos;t have an account? <Link href="/signup" className="text-[#005c4d]">Sign up</Link></p>
        </form>
      </section>
    </main>
  );
}
