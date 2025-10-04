import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAEchqovhYTRpttZ5osO7U9fBPe5BScvJg",
  authDomain: "reactlinks-63d2d.firebaseapp.com",
  projectId: "reactlinks-63d2d",
  storageBucket: "reactlinks-63d2d.firebasestorage.app",
  messagingSenderId: "858450663723",
  appId: "1:858450663723:web:1e1c9ce8bd70a169f98d6e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db };