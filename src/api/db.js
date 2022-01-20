// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAabwa6m9fo6FQzsOlYuCTeQT-RQuK3nDU",
  authDomain: "ln-streamlabs-donations.firebaseapp.com",
  projectId: "ln-streamlabs-donations",
  storageBucket: "ln-streamlabs-donations.appspot.com",
  messagingSenderId: "617431788813",
  appId: "1:617431788813:web:aa404e1419649e3a9d5444",
  measurementId: "G-PFWL0Q27GJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
