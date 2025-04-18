import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBBPiJDpgq6kqZj01MnxoqNyc8WSnMuVc4",
  authDomain: "prepwise-cb1b3.firebaseapp.com",
  projectId: "prepwise-cb1b3",
  storageBucket: "prepwise-cb1b3.firebasestorage.app",
  messagingSenderId: "515159829990",
  appId: "1:515159829990:web:848d52561ac0701c8a3a27",
  measurementId: "G-NS81HWSL59",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
