// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from '@firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVL6pkY-kbw8sorHToks5AtmozbIX6BhU",
  authDomain: "fir-auth-yt-codecommerce.firebaseapp.com",
  projectId: "fir-auth-yt-codecommerce",
  storageBucket: "fir-auth-yt-codecommerce.appspot.com",
  messagingSenderId: "679353374065",
  appId: "1:679353374065:web:1be7bfd6d25319caa192d0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 

export const auth=getAuth(app);
export  const db = getFirestore(app);
export default app;