

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

import { getFirestore, 
    collection, doc, setDoc,addDoc,
    onSnapshot,getDoc,
    updateDoc,deleteDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
  
 
  const firebaseConfig = {
    apiKey: "AIzaSyAc3brH-z_8OK3ZWCAxV3tyAu_V4SVYZHA",
    authDomain: "portfolio-a58c0.firebaseapp.com",
    projectId: "portfolio-a58c0",
    storageBucket: "portfolio-a58c0.appspot.com",
    messagingSenderId: "228028906715",
    appId: "1:228028906715:web:63fba33e7a1c17e480e0fe"
  };

  
 const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db,createUserWithEmailAndPassword ,
  collection,addDoc,onSnapshot,deleteDoc,updateDoc,getDoc, 
  doc, setDoc,signInWithEmailAndPassword };
