
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCB8maMGWmwHn8oPc5zIz-gAFRS8y6tzJI",
  authDomain: "guru-real-estate-web.firebaseapp.com",
  projectId: "guru-real-estate-web",
  storageBucket: "guru-real-estate-web.firebasestorage.app",
  messagingSenderId: "777459864545",
  appId: "1:777459864545:web:4b2c708d0fac23816138a0",
  measurementId: "G-0QEH46M7B1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
