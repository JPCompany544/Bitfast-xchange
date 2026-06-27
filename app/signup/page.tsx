"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (searchParams.get("error") === "confirmation_failed") {
      setError("Email confirmation failed. Please try signing up again.");
    }
  }, [searchParams]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/buy-crypto`,
      },
    });

    if (error) {
      // Map raw Supabase errors to human-friendly messages
      const friendlyError = (() => {
        const msg = error.message.toLowerCase();
        if (msg.includes("rate") || msg.includes("429") || error.status === 429) {
          return "Too many signup attempts. Please wait a few minutes before trying again.";
        }
        if (msg.includes("already registered") || msg.includes("user already exists")) {
          return "An account with this email already exists. Try signing in instead.";
        }
        if (msg.includes("invalid email")) {
          return "Please enter a valid email address.";
        }
        if (msg.includes("password")) {
          return "Password must be at least 6 characters.";
        }
        return error.message;
      })();
      setError(friendlyError);
    } else {
      setSuccess(true);
    }

    setLoading(false);
  };

  const isFormValid = email.length > 0 && password.length >= 6;

  if (success) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
        <div className="flex flex-col items-center text-center max-w-[448px] w-full gap-6">
          <div className="w-16 h-16 rounded-full bg-[#f0fdf4] flex items-center justify-center">
            <svg className="w-8 h-8 text-[#09853b]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[28px] font-semibold text-[#0a0b0d] leading-[2.25rem]">Check your email</p>
            <p className="text-[16px] text-[#5b616e] leading-[1.5rem]">
              We sent a confirmation link to <span className="font-semibold text-[#0a0b0d]">{email}</span>. Click it to activate your account.
            </p>
          </div>
          <Link href="/login" className="text-[#0052ff] font-semibold text-[16px] hover:underline">
            Already confirmed? Sign in →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
      <div className="flex flex-col w-full" style={{ maxWidth: "448px", minHeight: "386px", flexGrow: 1 }}>
        <form className="flex flex-col flex-grow justify-between h-full" onSubmit={handleSignup}>
          {/* Top */}
          <div className="flex flex-col gap-6">
            {/* Title */}
            <div className="flex flex-col gap-2">
              <p className="text-[28px] font-semibold text-[#0a0b0d] leading-[2.25rem]">
                Create your account
              </p>
              <p className="text-[16px] text-[#5b616e] leading-[1.5rem]">
                Access all that we have to offer with a single account.
              </p>
            </div>

            {/* Error banner */}
            {error && (
              <div className="w-full bg-[#fff5f6] border border-[#fcb3ba] rounded-[8px] px-4 py-3 text-[14px] text-[#cf2030] font-medium">
                {error}
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
                autoCapitalize="none"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-[56px] px-4 text-[16px] text-[#0a0b0d] bg-[#eef0f3] rounded-[8px] border border-transparent focus:outline-none focus:ring-2 focus:ring-[#0052ff] focus:bg-white transition-all duration-200 placeholder-[#5b616e]"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <span className="text-[14px] font-semibold text-[#0a0b0d] leading-[1.25rem]">Password</span>
              <input
                id="password"
                type="password"
                name="password"
                autoComplete="new-password"
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full h-[56px] px-4 text-[16px] text-[#0a0b0d] bg-[#eef0f3] rounded-[8px] border border-transparent focus:outline-none focus:ring-2 focus:ring-[#0052ff] focus:bg-white transition-all duration-200 placeholder-[#5b616e]"
              />
            </div>

            {/* Continue Button */}
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
                  Creating account…
                </>
              ) : (
                "Continue"
              )}
            </button>

            {/* OR Divider */}
            <div className="relative flex items-center justify-center w-full">
              <hr className="absolute w-full border-[rgba(91,97,110,0.2)]" />
              <div className="relative z-10 bg-white px-3">
                <span className="text-[13px] text-[#5b616e] font-semibold uppercase tracking-widest">OR</span>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="flex flex-col gap-3">
              {/* Google */}
              <button
                type="button"
                aria-label="Sign up with Google"
                className="w-full h-[56px] rounded-full bg-[#eef0f3] hover:bg-[#e5e7ea] text-[#0a0b0d] font-semibold text-[16px] flex items-center justify-center gap-3 transition-colors duration-200"
              >
                <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  <path fill="none" d="M0 0h48v48H0z"/>
                </svg>
                Sign up with Google
              </button>

              {/* Apple */}
              <button
                type="button"
                aria-label="Sign up with Apple"
                className="w-full h-[56px] rounded-full bg-[#eef0f3] hover:bg-[#e5e7ea] text-[#0a0b0d] font-semibold text-[16px] flex items-center justify-center gap-3 transition-colors duration-200"
              >
                <svg width="18" height="22" viewBox="0 0 814 1000" xmlns="http://www.w3.org/2000/svg" fill="#0a0b0d">
                  <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-42.2-151.6-107.2c-51.7-74.8-96.4-197.1-96.4-313.9 0-197.5 129.1-302 255.9-302 64.8 0 118.7 42.8 159 42.8 38.8 0 99.8-45.2 169.1-45.2z"/>
                  <path d="M527.7 85.4c29.4-35.3 50.5-84.2 50.5-133.1 0-6.7-.6-13.5-1.9-19.4-47.8 1.9-104.6 31.9-138.6 71.9-27.1 30.6-51.4 79.5-51.4 129.1 0 7.1 1.3 14.2 1.9 16.5 3.2.6 8.4 1.3 13.5 1.3 42.8 0 96.9-28.7 126-66.3z"/>
                </svg>
                Sign up with Apple
              </button>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col gap-4 mt-8">
            <div className="flex items-center justify-center">
              <p className="text-[16px] font-semibold text-[#0a0b0d]">
                Already have an account?{" "}
                <Link href="/login" className="text-[#0052ff] hover:underline font-semibold">
                  Sign in
                </Link>
              </p>
            </div>
            <p className="text-[13px] text-[#5b616e] leading-[1rem]">
              By creating an account you certify that you are over the age of 18 and agree to our{" "}
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
