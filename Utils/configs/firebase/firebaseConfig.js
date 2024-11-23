import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBE5fkglZ1mED_oUUmVoj9o_Sx4-pQt-mc",
  authDomain: "indriver-9d0c7.firebaseapp.com",
  projectId: "indriver-9d0c7",
  storageBucket: "indriver-9d0c7.firebasestorage.app",
  messagingSenderId: "258414222114",
  appId: "1:258414222114:web:d289eb19d69b72a3a1637b",
  measurementId: "G-JXJYNFFKZT",
};

// Initialize Firebase once
let app;
let auth;
let db;

if (!app) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
  db = getFirestore(app);
}

export { db, auth };
export default app;
