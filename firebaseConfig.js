import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBps2dAYpBCMSfkSp9Pb9g0uB8B4uavrpo",
  authDomain: "reactsocialapptutorial.firebaseapp.com",
  projectId: "reactsocialapptutorial",
  storageBucket: "reactsocialapptutorial.appspot.com",
  messagingSenderId: "1071064469720",
  appId: "1:1071064469720:web:d8358c841243c084c447ad",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider, storage };
