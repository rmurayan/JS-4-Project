// DB.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB1Gggit9sRA9EAF58s-X1K4A4B41F5ylc",
  authDomain: "finalapp-f57da.firebaseapp.com",
  projectId: "finalapp-f57da",
  storageBucket: "finalapp-f57da.appspot.com",
  messagingSenderId: "621366101619",
  appId: "1:621366101619:web:8264a4c8ae12cf0a2dcc06",
  measurementId: "G-X21GMN7SE2",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
