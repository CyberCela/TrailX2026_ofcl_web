import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, isFirebaseConfigured, storage } from "@/lib/firebase/client";
import type { ResourceItem } from "@/lib/types";

const collectionRef = () => collection(db, "resources");

export const listenToResources = (
  onChange: (items: ResourceItem[]) => void
) => {
  if (!isFirebaseConfigured) return undefined;
  const q = query(collectionRef(), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const items = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as ResourceItem),
    }));
    onChange(items);
  });
};

export const uploadResource = async (
  file: File,
  data: Omit<ResourceItem, "id" | "url">
) => {
  if (!isFirebaseConfigured) return;
  const resourceRef = ref(storage, `resources/${file.name}`);
  const upload = await uploadBytes(resourceRef, file);
  const url = await getDownloadURL(upload.ref);

  await addDoc(collectionRef(), {
    ...data,
    url,
    createdAt: serverTimestamp(),
  });
};
