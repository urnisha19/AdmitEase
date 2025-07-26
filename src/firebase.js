import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCzQX_30PxEG09Lwy2ktMABxO9r7U5chVA",
  authDomain: "admitease-8c45d.firebaseapp.com",
  projectId: "admitease-8c45d",
  storageBucket: "admitease-8c45d.firebasestorage.app",
  messagingSenderId: "595646065974",
  appId: "1:595646065974:web:44db561c187ef0a962d797",
  measurementId: "G-0SKRT8R5WH",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
