import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBqX8OtLXB6QNTl9h5nxVBHjnIwqh_YFWQ",
  authDomain: "prime-nexo.firebaseapp.com",
  projectId: "prime-nexo",
  storageBucket: "prime-nexo.appspot.com",
  messagingSenderId: "458796412365",
  appId: "1:458796412365:web:3f8d9b2e8f9b4f5a6c7d8e"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;