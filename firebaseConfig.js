import firebase from "firebase";

const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "xyz.firebaseapp.com",
  projectId: "xyz",
  storageBucket: "xyz.appspot.com",
  messagingSenderId: "1071064469720",
  appId: "1:1071064469720:web:d8358c841243c084c417ad",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider, storage };
