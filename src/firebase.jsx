// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


import { getStorage } from "firebase/storage";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8bLmgPc4fKXztO8vRTYmakE-ZGEnohAI",
  authDomain: "speaksync-f644a.firebaseapp.com",
  projectId: "speaksync-f644a",
  storageBucket: "speaksync-f644a.appspot.com",
  messagingSenderId: "92713582062",
  appId: "1:92713582062:web:0f5f6cdb7d47960b2462ff"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const storage = getStorage();

export const db = getFirestore();
