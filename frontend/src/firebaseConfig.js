// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCD-nNYfyGLqpXOW9Qze7OaPcvwuWu2FXs",
  authDomain: "bikeshop-6b1d6.firebaseapp.com",
  projectId: "bikeshop-6b1d6",
  storageBucket: "bikeshop-6b1d6.firebasestorage.app",
  messagingSenderId: "778305095954",
  appId: "1:778305095954:web:8ee44b451eee958f70cbcb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);