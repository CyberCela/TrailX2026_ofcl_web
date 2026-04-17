# TrailX 2026 Web App

Production-ready MVP for TrailX 2026 with role-based dashboards, real-time scoring, and Firebase-backed workflows.

## Tech Stack
- Next.js App Router
- Tailwind CSS
- Firebase Auth, Firestore, Storage
- Vercel hosting (frontend)

## Quick Start
```bash
npm install
npm run dev
```

## Environment Variables
Create a `.env.local` file using `.env.example` and fill in your Firebase web app credentials.
Set `NEXT_PUBLIC_APP_URL` to the deployed base URL for email-link sign-in (for local dev, use `http://localhost:3000`).

### Where to Store Firebase Config
- Local development: put values in `.env.local` (never commit this file).
- Repo: keep only `.env.example` with placeholders.
- Vercel: add the same keys in Project Settings → Environment Variables.

## Key Routes
- `/` Home + announcements + live preview
- `/event` Public event details
- `/leaderboard` Real-time leaderboard
- `/register` Registration and sign-in
- `/sponsors` Public sponsors page
- `/dashboard` Role-based overview
- `/dashboard/activities` Activity management (admin/organizer)
- `/dashboard/admin` Admin tools
- `/dashboard/admin/sponsors` Sponsor management
- `/dashboard/organizer` Organizer tools
- `/dashboard/volunteer` Volunteer tools
- `/dashboard/participant` Participant tools

## Firebase Schema
See [firebase/schema.md](firebase/schema.md) for collections and fields.

## Firebase Security Rules
- Firestore rules: [firebase/firestore.rules](firebase/firestore.rules)
- Storage rules: [firebase/storage.rules](firebase/storage.rules)

## Notes
- Role checks are enforced in the UI and via Firebase Security Rules.
- Assign Firebase Auth custom claims for roles (admin, organizer, volunteer, participant).
- Real-time updates use Firestore listeners.
- Replace sample data in `src/lib/constants.ts` once Firebase is connected.
