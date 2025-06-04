// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";           // Firestore DB
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Auth and Google Provider
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDx6ofEG1lrWCUT-5xvdPRCLd1pbdP6Qs",
  authDomain: "labproject-6d69b.firebaseapp.com",
  projectId: "labproject-6d69b",
  storageBucket: "labproject-6d69b.firebasestorage.app",
  messagingSenderId: "998497213738",
  appId: "1:998497213738:web:c9bca2d3b3027e09719253",
  measurementId: "G-1W5BF9W6E1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

// Initialize Firebase services you will use
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Export the initialized instances for use in your app
export { db, auth, googleProvider, storage };