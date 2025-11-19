import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDp1oniE-RHZWo9SYrnUmSZLx0fLNKKPOM",
  authDomain: "starwarsapi-e13aa.firebaseapp.com",
  projectId: "starwarsapi-e13aa",
  storageBucket: "starwarsapi-e13aa.firebasestorage.app",
  messagingSenderId: "982319583210",
  appId: "1:982319583210:web:714f9a897ba2815e3a6c93"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // ✅ ¡Esto es necesario!

export { auth, db };