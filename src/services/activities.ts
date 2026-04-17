import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase/client";
import type { Activity } from "@/lib/types";

const collectionRef = () => collection(db, "activities");

export const listenToActivities = (
  onChange: (items: Activity[]) => void,
  onError?: (error: Error) => void
) => {
  if (!isFirebaseConfigured) return undefined;
  const q = query(collectionRef(), orderBy("name", "asc"));
  return onSnapshot(
    q,
    (snapshot) => {
      const items = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Activity),
      }));
      onChange(items);
    },
    (error) => onError?.(error)
  );
};

export const createActivity = async (data: Omit<Activity, "id">) => {
  if (!isFirebaseConfigured) return;
  await addDoc(collectionRef(), { ...data, createdAt: serverTimestamp() });
};

export const updateActivity = async (
  id: string,
  updates: Partial<Activity>
) => {
  if (!isFirebaseConfigured) return;
  await updateDoc(doc(db, "activities", id), updates);
};

export const deleteActivity = async (id: string) => {
  if (!isFirebaseConfigured) return;
  await deleteDoc(doc(db, "activities", id));
};
