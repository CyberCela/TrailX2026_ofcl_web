import { PublicLayout } from "@/components/layout/PublicLayout";
import { AuthForm } from "@/components/auth/AuthForm";

export default function RegisterPage() {
  return (
    <PublicLayout>
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-16 lg:flex-row">
        <div className="flex flex-1 flex-col gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--muted)]">
              Team registration
            </p>
            <h1 className="font-[var(--font-display)] text-5xl uppercase tracking-wide">
              Register for TrailX 2026
            </h1>
          </div>
          <p className="text-base text-[var(--muted)]">
            Create an account to form a team, invite members, and upload payment proof.
            Team leaders will manage check-ins and receive live announcements.
          </p>
          <div className="grid gap-4 rounded-3xl border border-[var(--line)] bg-[var(--panel-strong)] p-6 text-sm text-[var(--muted)] shadow-[var(--shadow)]">
            <p>
              After registration, leaders can create a team ID and invite members.
            </p>
            <p>Payments are verified by admins and updated in real time.</p>
            <p>Event materials are released to approved participants.</p>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6">
          <AuthForm />
          <div className="rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-6 text-sm text-[var(--muted)] shadow-[var(--shadow)]">
            <h3 className="text-base font-semibold text-[var(--ink)]">
              Team setup checklist
            </h3>
            <ul className="mt-4 space-y-2">
              <li>Create a team and assign a leader.</li>
              <li>Add members and confirm categories.</li>
              <li>Upload receipt and await verification.</li>
            </ul>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
