import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';



// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDWeTHCuPuamY9U5U82ZDK0s0u5XhXzBuE",
    authDomain: "fireapp-7a5f3.firebaseapp.com",
    projectId: "fireapp-7a5f3",
    storageBucket: "fireapp-7a5f3.appspot.com",
    messagingSenderId: "834177802361",
    appId: "1:834177802361:web:dcd016b8db01211a56b4a8"
};


export const FIREBASE_APP= initializeApp(firebaseConfig);
export const FIRESTORE_DB= getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH= getAuth(FIREBASE_APP); 


