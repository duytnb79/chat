import { initializeApp } from 'firebase/app'
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  //read data from Firebase    
} from "firebase/auth"
//ref = reference to a "collection"
import {
  getDatabase,
  ref as firebaseDatabaseRef,
  set as firebaseSet,
  child,
  get,
  onValue,
} from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyCuMJxjvExwAL_SrQbgpRdl03jP3SC-MeQ",
  authDomain: "chat-project-57598.firebaseapp.com",
  projectId: "chat-project-57598",
  storageBucket: "chat-project-57598.appspot.com",
  messagingSenderId: "700768985366",
  appId: "1:700768985366:web:8cfa9344faaba255763037",
  measurementId: "G-SRB7NZL2HL"
};

const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app);
const auth = getAuth(app)
const firebaseDatabase = getDatabase(app, 'https://chat-project-57598-default-rtdb.asia-southeast1.firebasedatabase.app/')


export {
  auth,
  // analytics,
  firebaseDatabase,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  firebaseSet,
  firebaseDatabaseRef,
  sendEmailVerification,
  child,
  get,
  onValue, //reload when online DB changed
  signInWithEmailAndPassword,
}

