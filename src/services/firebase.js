// src/services/firebase.js
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAAUzm1Hu5FV00enDZ-tMhFEc4j16oh49U",
  authDomain: "aebc-web-496600.firebaseapp.com",
  databaseURL: "https://aebc-web-496600-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "aebc-web-496600",
  storageBucket: "aebc-web-496600.appspot.com",
  messagingSenderId: "615857888546",
  appId: "1:615857888546:web:44dd5fcf35b72acb9c197b"
};

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
