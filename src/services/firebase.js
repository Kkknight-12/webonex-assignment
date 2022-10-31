import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";

//
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { removeSession, setSession } from "../utils/setlocalstorage";

// --------------------------------------------------------------------------------

export async function signInUser(emailAddress, password) {
  const auth = getAuth();

  try {
    await signInWithEmailAndPassword(auth, emailAddress, password);

    setSession(auth.currentUser.accessToken, auth.currentUser.displayName);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function signInUserWithGoogle() {
  const auth = getAuth();

  const provider = new GoogleAuthProvider();

  try {
    await signInWithPopup(auth, provider);
    setSession(auth.currentUser.accessToken, auth.currentUser.displayName);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function signOutUser() {
  const auth = getAuth();
  await signOut(auth);
  removeSession();
}

export async function getAllUsers() {
  const q = query(collection(db, "users"));

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));
}

export async function createUser(
  firstname,
  lastname,
  email,
  roles,
  accountStatus
) {
  try {
    await addDoc(collection(db, "users"), {
      firstname: firstname.toLowerCase(),
      lastname: lastname.toLocaleLowerCase(),
      email: email.toLocaleLowerCase(),
      roles: roles.toLowerCase(),
      accountStatus: accountStatus.toLowerCase(),
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

//
export async function updateUser(
  firstname,
  lastname,
  email,
  roles,
  accountStatus,
  editUserId
) {
  const userRef = doc(db, "users", editUserId);

  try {
    await updateDoc(userRef, {
      firstname: firstname.toLowerCase(),
      lastname: lastname.toLocaleLowerCase(),
      email: email.toLocaleLowerCase(),
      roles: roles.toLowerCase(),
      accountStatus: accountStatus.toLowerCase(),
    });
  } catch (error) {
    throw new Error(error.message);
  }
}