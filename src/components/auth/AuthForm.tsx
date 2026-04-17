"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export function AuthForm() {
  const { user, register, signIn, sendMagicLink, completeMagicLinkSignIn, isMagicLink } =
    useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "register">("register");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [emailValue, setEmailValue] = useState("");

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
      return;
    }
    if (typeof window === "undefined") return;
    const link = window.location.href;
    if (!isMagicLink(link)) return;

    const savedEmail = window.localStorage.getItem("trailxEmailForSignIn") || "";
    if (!savedEmail) {
      setStatus("Enter your email to complete sign-in.");
      return;
    }

    setLoading(true);
    completeMagicLinkSignIn(savedEmail, link)
      .then(() => {
        setStatus("Signed in successfully.");
      })
      .catch((err) => {
        const message = err instanceof Error ? err.message : "Unexpected error.";
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user, router, completeMagicLinkSignIn, isMagicLink]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const form = event.currentTarget;

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    const displayName = String(formData.get("displayName"));

    try {
      if (mode === "register") {
        await register(email, password, displayName);
      } else {
        await signIn(email, password);
      }
      form.reset();
      setEmailValue("");
      setStatus(null);
    } catch (err) {
      console.error("Auth submit failed:", err);
      const message = err instanceof Error ? err.message : "Unexpected error.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const sendLink = async () => {
    if (!emailValue) {
      setError("Enter your email first.");
      return;
    }

    setLoading(true);
    setError(null);
    setStatus(null);

    try {
      await sendMagicLink(emailValue);
      setStatus("Magic link sent. Check your inbox.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unexpected error.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const completeLink = async () => {
    if (typeof window === "undefined") return;
    const link = window.location.href;
    if (!isMagicLink(link)) {
      setError("This link is not valid for sign-in.");
      return;
    }
    if (!emailValue) {
      setError("Enter your email to complete sign-in.");
      return;
    }

    setLoading(true);
    setError(null);
    setStatus(null);

    try {
      await completeMagicLinkSignIn(emailValue, link);
      setStatus("Signed in successfully.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unexpected error.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-6 shadow-[var(--shadow)]">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[var(--ink)]">
          {mode === "register" ? "Create account" : "Sign in"}
        </h3>
        <button
          type="button"
          onClick={() =>
            setMode((prev) => (prev === "register" ? "signin" : "register"))
          }
          className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]"
        >
          {mode === "register" ? "Have an account?" : "Need an account?"}
        </button>
      </div>
      <form className="mt-6 flex flex-col gap-4" onSubmit={onSubmit}>
        {mode === "register" && (
          <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
            Display name
            <input
              name="displayName"
              required
              className="rounded-xl border border-[var(--line)] px-4 py-3 text-sm text-[var(--ink)]"
            />
          </label>
        )}
        <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
          Email
          <input
            name="email"
            type="email"
            required
            value={emailValue}
            onChange={(event) => setEmailValue(event.target.value)}
            className="rounded-xl border border-[var(--line)] px-4 py-3 text-sm text-[var(--ink)]"
          />
        </label>
        <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
          Password
          <input
            name="password"
            type="password"
            required
            minLength={6}
            className="rounded-xl border border-[var(--line)] px-4 py-3 text-sm text-[var(--ink)]"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-[var(--accent)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[var(--accent-strong)] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Working..." : mode === "register" ? "Create account" : "Sign in"}
        </button>
        {mode === "signin" && (
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
            <span>Passwordless</span>
            <button
              type="button"
              onClick={sendLink}
              className="rounded-full border border-[var(--line)] px-4 py-2 transition hover:border-transparent hover:bg-[var(--ink)] hover:text-white"
            >
              Send magic link
            </button>
            <button
              type="button"
              onClick={completeLink}
              className="rounded-full border border-[var(--line)] px-4 py-2 transition hover:border-transparent hover:bg-[var(--ink)] hover:text-white"
            >
              Complete sign-in
            </button>
          </div>
        )}
        {status && (
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
            {status}
          </p>
        )}
        {error && (
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
