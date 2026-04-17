import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase/client";
import type { Team } from "@/lib/types";

const collectionRef = () => collection(db, "teams");

export const createTeam = async (team: Omit<Team, "id">) => {
  if (!isFirebaseConfigured) return null;
  const docRef = await addDoc(collectionRef(), {
    ...team,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

export const listenToTeam = (
  teamId: string,
  onChange: (team: Team | null) => void
) => {
  if (!isFirebaseConfigured) return undefined;
  return onSnapshot(doc(db, "teams", teamId), (snapshot) => {
    if (!snapshot.exists()) {
      onChange(null);
      return;
    }
    onChange({ id: snapshot.id, ...(snapshot.data() as Team) });
  });
};

export const addTeamMember = async (teamId: string, memberIds: string[]) => {
  if (!isFirebaseConfigured) return;
  await updateDoc(doc(db, "teams", teamId), { memberIds });
};
