import { doc, onSnapshot, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase/client";
import type { Role, UserProfile } from "@/lib/types";

export const listenToUserProfile = (
  userId: string,
  onChange: (profile: UserProfile | null) => void
) => {
  if (!isFirebaseConfigured) return undefined;
  return onSnapshot(doc(db, "users", userId), (snapshot) => {
    if (!snapshot.exists()) {
      onChange(null);
      return;
    }
    onChange({ id: snapshot.id, ...(snapshot.data() as UserProfile) });
  });
};

export const createUserProfile = async (
  userId: string,
  profile: Omit<UserProfile, "id">
) => {
  if (!isFirebaseConfigured) return;
  await setDoc(doc(db, "users", userId), {
    ...profile,
    createdAt: serverTimestamp(),
  });
};

export const updateUserRole = async (userId: string, role: Role) => {
  if (!isFirebaseConfigured) return;
  await updateDoc(doc(db, "users", userId), { role });
};

export const updateUserTeam = async (userId: string, teamId: string) => {
  if (!isFirebaseConfigured) return;
  await updateDoc(doc(db, "users", userId), { teamId });
};
