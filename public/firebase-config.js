// firebase-config.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAq6Kmh8hOtur62RlZptpzjaIeeJ-Dfk5E",
  authDomain: "zinochat-d64f4.firebaseapp.com",
  projectId: "zinochat-d64f4",
  storageBucket: "zinochat-d64f4.firebasestorage.app",
  messagingSenderId: "568311500844",
  appId: "1:568311500844:web:c217122431c39847e38189",
  measurementId: "G-LT4587B5DK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore, GoogleAuthProvider, signInWithPopup, collection, addDoc, query, orderBy, onSnapshot };
