import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, enableMultiTabIndexedDbPersistence } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBqX8OtLXB6QNTl9h5nxVBHjnIwqh_YFWQ",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "prime-nexo.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "prime-nexo",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "prime-nexo.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "458796412365",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:458796412365:web:3f8d9b2e8f9b4f5a6c7d8e"
};

// Initialize Firebase only if it hasn't been initialized yet
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Initialize optional services only in browser environment
let analytics = null;
let messaging = null;
let performance = null;
let functions = null;

// Enable offline persistence
try {
  if (typeof window !== 'undefined') {
    enableMultiTabIndexedDbPersistence(db).catch((err) => {
      if (err.code === 'failed-precondition') {
        console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
      } else if (err.code === 'unimplemented') {
        console.warn('The current browser does not support persistence.');
      }
    });
  }
} catch (error) {
  console.warn('Offline persistence not available:', error);
}

// Collection names
export const COLLECTIONS = {
  USERS: 'users',
  ACCOUNTS: 'accounts',
  PINS: 'pins',
  DASHBOARD: 'dashboard',
  SECURITY: 'security',
  ACTIVITIES: 'activities',
  LOGS: 'logs'
};

export default app;