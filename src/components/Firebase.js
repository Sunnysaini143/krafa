import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyDvC3ObrlyNFZbevaF1lFhygheWW8ng5kM",
  authDomain: "krafo-2cac0.firebaseapp.com",
  projectId: "krafo-2cac0",
  storageBucket: "krafo-2cac0.appspot.com",
  messagingSenderId: "809148409399",
  appId: "1:809148409399:web:1031952ede8d1ce5ad81b2",
  databaseURL:"https://krafo-2cac0-default-rtdb.firebaseio.com"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);