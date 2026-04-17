import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, isFirebaseConfigured, storage } from "@/lib/firebase/client";
import { SPONSOR_TIERS } from "@/lib/constants";
import type { Sponsor } from "@/lib/types";

const collectionRef = () => collection(db, "sponsors");

let cachedSponsors: Sponsor[] | null = null;
let cacheUpdatedAt = 0;
const CACHE_TTL_MS = 10 * 60 * 1000;

const sortByTier = (items: Sponsor[]) => {
  const tierOrder = new Map(SPONSOR_TIERS.map((tier, index) => [tier, index]));
  return [...items].sort((a, b) => {
    const tierDiff = (tierOrder.get(a.tier) ?? 99) - (tierOrder.get(b.tier) ?? 99);
    if (tierDiff !== 0) return tierDiff;
    return a.name.localeCompare(b.name);
  });
};

export const listenToSponsors = (
  onChange: (items: Sponsor[]) => void,
  onError?: (error: Error) => void
) => {
  if (!isFirebaseConfigured) return undefined;
  const q = query(collectionRef(), orderBy("tier", "asc"), orderBy("name", "asc"));
  return onSnapshot(
    q,
    (snapshot) => {
      const items = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Sponsor),
      }));
      const sorted = sortByTier(items);
      cachedSponsors = sorted;
      cacheUpdatedAt = Date.now();
      onChange(sorted);
    },
    (error) => onError?.(error)
  );
};

export const fetchSponsorsCached = async () => {
  if (!isFirebaseConfigured) return [] as Sponsor[];
  const now = Date.now();
  if (cachedSponsors && now - cacheUpdatedAt < CACHE_TTL_MS) {
    return cachedSponsors;
  }
  const q = query(collectionRef(), orderBy("tier", "asc"), orderBy("name", "asc"));
  const snapshot = await getDocs(q);
  const items = snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as Sponsor),
  }));
  const sorted = sortByTier(items);
  cachedSponsors = sorted;
  cacheUpdatedAt = now;
  return sorted;
};

export const uploadSponsorLogo = async (file: File, sponsorId: string) => {
  if (!isFirebaseConfigured) return "";
  const sponsorRef = ref(storage, `sponsors/${sponsorId}/${file.name}`);
  const upload = await uploadBytes(sponsorRef, file);
  return getDownloadURL(upload.ref);
};

export const createSponsor = async (data: Omit<Sponsor, "id">) => {
  if (!isFirebaseConfigured) return;
  await addDoc(collectionRef(), { ...data, createdAt: serverTimestamp() });
};

export const updateSponsor = async (id: string, updates: Partial<Sponsor>) => {
  if (!isFirebaseConfigured) return;
  await updateDoc(doc(db, "sponsors", id), updates);
};

export const deleteSponsor = async (id: string) => {
  if (!isFirebaseConfigured) return;
  await deleteDoc(doc(db, "sponsors", id));
};
