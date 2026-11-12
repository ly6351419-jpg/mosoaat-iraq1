import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBIgGw3cILiKLTI2Bkir3JB0E9cE3qwL58",
  authDomain: "mosoaat-iraq.firebaseapp.com",
  projectId: "mosoaat-iraq",
  storageBucket: "mosoaat-iraq.firebasestorage.app",
  messagingSenderId: "561192580157",
  appId: "1:561192580157:web:08d512b8279920eb9da654",
  measurementId: "G-WPZSMSGS0F"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

window.mosoaatAuth = {
  auth,
  signInWithGoogle: () => signInWithRedirect(auth, provider),
  signOut: () => signOut(auth)
};

getRedirectResult(auth).catch(console.error);

onAuthStateChanged(auth, user => {
  window.dispatchEvent(new CustomEvent("mosoaat-auth-changed", {
    detail: user ? {
      uid: user.uid,
      displayName: user.displayName || "",
      email: user.email || "",
      photoURL: user.photoURL || ""
    } : null
  }));
});
