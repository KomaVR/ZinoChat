import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Firebase configuration
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
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const firestore = firebase.firestore();
const auth = firebase.auth();

export { firestore, auth };
