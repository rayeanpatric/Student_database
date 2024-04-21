// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAkPX6dZpVcb7XHa5Q7oJ8hsMVIhe5Rs0",
  authDomain: "roadmap-6124.firebaseapp.com",
  projectId: "roadmap-6124",
  storageBucket: "roadmap-6124.appspot.com",
  messagingSenderId: "204391656715",
  appId: "1:204391656715:web:15025a092ccc233a29460e",
  measurementId: "G-PEG1K0F8ZL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Auth
const auth = getAuth();

export { auth, firebaseConfig };
export default firebaseConfig;