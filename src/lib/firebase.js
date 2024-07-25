// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAht5Ih7NBlgKS5TVQSrqjA-ZnALqrOnKI",
  authDomain: "chat-app-firebase-a3890.firebaseapp.com",
  projectId: "chat-app-firebase-a3890",
  storageBucket: "chat-app-firebase-a3890.appspot.com",
  messagingSenderId: import.meta.env.MESSAGING_SENDER_ID,
  appId: "1:68100589576:web:e4ebadf41bc8fd9c42e9bd",
  measurementId: "G-PKSPVY0QGX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();