import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { firebaseConfig, isFirebaseConfigured } from "./config";

export const app = isFirebaseConfigured
  ? getApps().length
    ? getApp()
    : initializeApp(firebaseConfig)
  : undefined;

export const auth = app ? getAuth(app) : (null as never);
export const db = app ? getFirestore(app) : (null as never);
export const storage = app ? getStorage(app) : (null as never);
export { isFirebaseConfigured };
