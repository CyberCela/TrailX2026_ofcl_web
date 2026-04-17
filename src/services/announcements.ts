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
import type { Announcement } from "@/lib/types";

const collectionRef = () => collection(db, "announcements");

export const listenToAnnouncements = (
  onChange: (items: Announcement[]) => void,
  onError?: (error: Error) => void
) => {
  if (!isFirebaseConfigured) return undefined;
  const q = query(collectionRef(), orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snapshot) => {
      const items = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Announcement),
      }));
      onChange(items);
    },
    (error) => onError?.(error)
  );
};

export const createAnnouncement = async (data: Omit<Announcement, "id">) => {
  if (!isFirebaseConfigured) return;
  await addDoc(collectionRef(), { ...data, createdAt: serverTimestamp() });
};

export const updateAnnouncement = async (
  id: string,
  updates: Partial<Announcement>
) => {
  if (!isFirebaseConfigured) return;
  await updateDoc(doc(db, "announcements", id), updates);
};

export const deleteAnnouncement = async (id: string) => {
  if (!isFirebaseConfigured) return;
  await deleteDoc(doc(db, "announcements", id));
};
