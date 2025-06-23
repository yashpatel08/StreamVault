// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3MusOT7F_dFXd92d03ar-uHWUrVEJ-48",
  authDomain: "stream-837b3.firebaseapp.com",
  projectId: "stream-837b3",
  storageBucket: "stream-837b3.firebasestorage.app",
  messagingSenderId: "185335645671",
  appId: "1:185335645671:web:c541536b00ff42dade2942",
  measurementId: "G-FY5CSD5PPJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

