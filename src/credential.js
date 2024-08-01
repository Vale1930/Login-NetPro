// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  onSnapshot, getFirestore,
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

const db = getFirestore(appFirebase);

export const saveForm = (name, company, participants, description, category, contact) =>
  addDoc(collection(db, 'forms'), { name, company, participants, description, category, contact });

export const getForms = () => getDocs(collection(db, 'forms'));

export const onGetForms = (callback) => onSnapshot(collection(db, 'forms'), callback);

export const deleteForm = (id) => deleteDoc(doc(db, "forms", id));

export const getForm = id => getDoc(doc(db, "forms", id));

export const updateForm = (id, newFields) =>
  updateDoc(doc(db, "forms", id), newFields);

export default appFirebase;