import { NextResponse } from "next/server";

export const runtime = "nodejs";

const firebaseKeys = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
];

export async function GET() {
  const presence = Object.fromEntries(
    firebaseKeys.map((key) => [key, Boolean(process.env[key])])
  );

  return NextResponse.json({ presence });
}
