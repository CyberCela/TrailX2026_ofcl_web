import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase/client";
import type { ScoreEntry } from "@/lib/types";

const collectionRef = () => collection(db, "scores");

export const listenToLeaderboard = (
  onChange: (items: ScoreEntry[]) => void,
  onError?: (error: Error) => void
) => {
  if (!isFirebaseConfigured) return undefined;
  const q = query(collectionRef(), orderBy("points", "desc"));
  return onSnapshot(
    q,
    (snapshot) => {
      const items = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as ScoreEntry),
      }));
      onChange(items);
    },
    (error) => onError?.(error)
  );
};

export const updateScore = async (entry: ScoreEntry) => {
  if (!isFirebaseConfigured) return;
  await setDoc(doc(db, "scores", entry.teamId), {
    ...entry,
    updatedAt: serverTimestamp(),
  });
};
