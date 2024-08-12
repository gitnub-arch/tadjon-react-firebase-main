// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxqb-gORk14eWY-CKLVuaxrZkMDsOZ-fA",
  authDomain: "tadjon-react.firebaseapp.com",
  projectId: "tadjon-react",
  storageBucket: "tadjon-react.appspot.com",
  messagingSenderId: "290836199644",
  appId: "1:290836199644:web:90370cb03ae485c7e0dc19",
  measurementId: "G-LNJNBSKBFX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // Иниализация проекта Firebase

const db = getFirestore(); // Инициализация базы данных Firestore
const auth = getAuth(app); // Инициализация системы верификации
const storage = getStorage(app); // Инициализация хранилища файлов

export { db, auth, storage };
