"use client";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  type User,
} from "firebase/auth";
import { doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth, db, isFirebaseConfigured } from "@/lib/firebase/client";
import type { Role, UserProfile } from "@/lib/types";

const defaultRole: Role = "participant";

type AuthState = {
  user: User | null;
  profile: UserProfile | null;
  role: Role | null;
  loading: boolean;
};

type AuthContextValue = AuthState & {
  register: (email: string, password: string, displayName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  sendMagicLink: (email: string) => Promise<void>;
  completeMagicLinkSignIn: (email: string, link: string) => Promise<void>;
  isMagicLink: (link: string) => boolean;
  signOutUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false);
      return;
    }

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (!currentUser) {
        setProfile(null);
        return;
      }

      const userRef = doc(db, "users", currentUser.uid);
      const unsubscribeProfile = onSnapshot(userRef, (snapshot) => {
        if (!snapshot.exists()) {
          setProfile(null);
          return;
        }
        setProfile({ id: snapshot.id, ...(snapshot.data() as UserProfile) });
      });

      return () => unsubscribeProfile();
    });

    return () => unsubscribeAuth();
  }, []);

  const register = async (email: string, password: string, displayName: string) => {
    if (!isFirebaseConfigured) {
      console.error("Firebase not configured. Registration skipped.");
      return;
    }
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName });

      await setDoc(doc(db, "users", result.user.uid), {
        displayName,
        email,
        role: defaultRole,
        status: "pending",
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Registration failed:", err);
      throw err;
    }
  };

  const signIn = async (email: string, password: string) => {
    if (!isFirebaseConfigured) return;
    await signInWithEmailAndPassword(auth, email, password);
  };

  const sendMagicLink = async (email: string) => {
    if (!isFirebaseConfigured) return;
    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      (typeof window !== "undefined" ? window.location.origin : "");

    await sendSignInLinkToEmail(auth, email, {
      url: `${appUrl}/register`,
      handleCodeInApp: true,
    });

    if (typeof window !== "undefined") {
      window.localStorage.setItem("trailxEmailForSignIn", email);
    }
  };

  const completeMagicLinkSignIn = async (email: string, link: string) => {
    if (!isFirebaseConfigured) return;
    await signInWithEmailLink(auth, email, link);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("trailxEmailForSignIn");
    }
  };

  const isMagicLink = (link: string) => {
    if (!isFirebaseConfigured) return false;
    return isSignInWithEmailLink(auth, link);
  };

  const signOutUser = async () => {
    if (!isFirebaseConfigured) return;
    await signOut(auth);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      profile,
      role: profile?.role ?? null,
      loading,
      register,
      signIn,
      sendMagicLink,
      completeMagicLinkSignIn,
      isMagicLink,
      signOutUser,
    }),
    [user, profile, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
