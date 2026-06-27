"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  useEffect(() => {
    const msg = searchParams.get("message");
    if (msg) {
      setInfoMessage(msg);
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfoMessage(null);
    setResendSuccess(false);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      // Check role to route properly
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
        if (profile?.role === 'admin') {
          router.push("/admin");
          router.refresh();
          return;
        }
      }
      
      router.push("/buy-crypto");
      router.refresh();
    }
  };

  const handleResendConfirmation = async () => {
    setResending(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/buy-crypto`,
      }
    });

    if (error) {
      setError(error.message);
    } else {
      setResendSuccess(true);
      setError(null);
    }
    setResending(false);
  };

  const isFormValid = email.length > 0 && password.length >= 6;
  const isEmailNotConfirmed = error?.toLowerCase().includes("email not confirmed");

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
      <div className="flex flex-col w-full" style={{ maxWidth: "448px", minHeight: "386px", flexGrow: 1 }}>
        <form className="flex flex-col flex-grow justify-between h-full" onSubmit={handleLogin}>
          {/* Top */}
          <div className="flex flex-col gap-6">
            {/* Title */}
            <div className="flex flex-col gap-2">
              <p className="text-[28px] font-semibold text-[#0a0b0d] leading-[2.25rem]">
                Sign in
              </p>
              <p className="text-[16px] text-[#5b616e] leading-[1.5rem]">
                Welcome back. Enter your credentials to continue.
              </p>
            </div>

            {/* Info banner */}
            {infoMessage && !error && (
              <div className="w-full bg-[#f0fcf5] border border-[#a6f4c5] rounded-[8px] px-4 py-3 text-[14px] text-[#09853b] font-medium">
                {infoMessage}
              </div>
            )}

            {/* Success banner for resend */}
            {resendSuccess && !error && (
              <div className="w-full bg-[#f0fcf5] border border-[#a6f4c5] rounded-[8px] px-4 py-3 text-[14px] text-[#09853b] font-medium">
                Confirmation email sent! Please check your inbox.
              </div>
            )}

            {/* Error banner */}
            {error && (
              <div className="w-full bg-[#fff5f6] border border-[#fcb3ba] rounded-[8px] px-4 py-3 flex flex-col gap-2">
                <span className="text-[14px] text-[#cf2030] font-medium">{error}</span>
                {isEmailNotConfirmed && (
                  <button
                    type="button"
                    onClick={handleResendConfirmation}
                    disabled={resending}
                    className="self-start text-[13px] font-semibold text-[#cf2030] underline hover:text-[#a01623] disabled:opacity-50"
                  >
                    {resending ? "Sending..." : "Resend confirmation email"}
                  </button>
                )}
              </div>
            )}

            {/* Email */}
            <div className="flex flex-col gap-1">
              <span className="text-[14px] font-semibold text-[#0a0b0d] leading-[1.25rem]">Email</span>
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-[56px] px-4 text-[16px] text-[#0a0b0d] bg-[#eef0f3] rounded-[8px] border border-transparent focus:outline-none focus:ring-2 focus:ring-[#0052ff] focus:bg-white transition-all duration-200 placeholder-[#5b616e]"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-semibold text-[#0a0b0d] leading-[1.25rem]">Password</span>
                <button type="button" className="text-[13px] text-[#0052ff] hover:underline font-medium">
                  Forgot password?
                </button>
              </div>
              <input
                id="password"
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-[56px] px-4 text-[16px] text-[#0a0b0d] bg-[#eef0f3] rounded-[8px] border border-transparent focus:outline-none focus:ring-2 focus:ring-[#0052ff] focus:bg-white transition-all duration-200 placeholder-[#5b616e]"
              />
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={!isFormValid || loading}
              className="w-full h-[56px] rounded-full bg-[#0052ff] text-white font-semibold text-[16px] transition-all duration-200 hover:bg-[#0048e0] active:bg-[#0043d1] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </div>

          {/* Bottom */}
          <div className="flex flex-col gap-4 mt-8">
            <div className="flex items-center justify-center">
              <p className="text-[16px] font-semibold text-[#0a0b0d]">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-[#0052ff] hover:underline font-semibold">
                  Sign up
                </Link>
              </p>
            </div>
            <p className="text-[13px] text-[#5b616e] leading-[1rem]">
              By signing in you agree to our{" "}
              <Link href="/privacy-policy" className="underline hover:text-[#0a0b0d] transition-colors">Privacy Policy</Link>
              {" "}and{" "}
              <Link href="/terms-of-use" className="underline hover:text-[#0a0b0d] transition-colors">Terms of Use</Link>.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <svg className="animate-spin w-8 h-8 text-[#0052ff]" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
