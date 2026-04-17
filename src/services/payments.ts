import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, isFirebaseConfigured, storage } from "@/lib/firebase/client";
import type { PaymentRecord } from "@/lib/types";

const collectionRef = () => collection(db, "payments");

export const listenToPaymentsByUser = (
  userId: string,
  onChange: (items: PaymentRecord[]) => void
) => {
  if (!isFirebaseConfigured) return undefined;
  const q = query(collectionRef(), where("userId", "==", userId));
  return onSnapshot(q, (snapshot) => {
    const items = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as PaymentRecord),
    }));
    onChange(items);
  });
};

export const uploadReceipt = async (
  userId: string,
  file: File,
  metadata: Omit<PaymentRecord, "id" | "receiptUrl">
) => {
  if (!isFirebaseConfigured) return;
  const receiptRef = ref(storage, `receipts/${userId}/${file.name}`);
  const upload = await uploadBytes(receiptRef, file);
  const receiptUrl = await getDownloadURL(upload.ref);

  await addDoc(collectionRef(), {
    ...metadata,
    receiptUrl,
    status: "pending",
    createdAt: serverTimestamp(),
  });
};

export const updatePaymentStatus = async (
  paymentId: string,
  status: PaymentRecord["status"]
) => {
  if (!isFirebaseConfigured) return;
  await updateDoc(doc(db, "payments", paymentId), { status });
};
