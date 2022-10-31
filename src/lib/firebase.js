// import Firebase from "firebase/app"
import { initializeApp } from "firebase/app";
import { getFirestore, FieldValue } from "firebase/firestore";

import "firebase/firestore";
import "firebase/auth";

// import { seedDatabase } from "../seed"

const config = {
  apiKey: "AIzaSyAVUNLoXbudLcTj0AT0pIvCQh8EWwjtOYo",
  authDomain: "webonex-assignment.firebaseapp.com",
  projectId: "webonex-assignment",
  storageBucket: "webonex-assignment.appspot.com",
  messagingSenderId: "579425009473",
  appId: "1:579425009473:web:ed8b48d0ed6c9d23e6abc0",
};

const firebase = initializeApp(config);
const db = getFirestore(firebase);

// console.log("firebase", firebase);
// seedDatabase(db)
// export declare abstract class FieldValue

export { firebase, db, FieldValue };