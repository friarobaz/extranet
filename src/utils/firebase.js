// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
//import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"
import { getFunctions } from "firebase/functions"

const firebaseConfig = {
  apiKey: "AIzaSyCcBVcSm0WuNgg9Y_XIDofwYmlPOaKdKOI",
  authDomain: "extranet-dabce.firebaseapp.com",
  projectId: "extranet-dabce",
  storageBucket: "extranet-dabce.appspot.com",
  messagingSenderId: "626704744348",
  appId: "1:626704744348:web:3d2229a5384d55a8509259",
  measurementId: "G-SK2217HCZG",
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)
//const analytics = getAnalytics(firebaseApp)
export const db = getFirestore(firebaseApp)
export const functions = getFunctions(firebaseApp)
