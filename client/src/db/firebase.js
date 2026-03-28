// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyBqyN7gSQHnU681VzKAd80OFApOzHhSO04",
    authDomain: "gymapp-f7a78.firebaseapp.com",
    projectId: "gymapp-f7a78",
    storageBucket: "gymapp-f7a78.firebasestorage.app",
    messagingSenderId: "860723352705",
    appId: "1:860723352705:web:b83264ad59caa97f55a980"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };