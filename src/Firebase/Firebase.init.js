// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTvczJOvjTkgwFI0qnIagIzi2lxTl4p7w",
  authDomain: "codegallery-32763.firebaseapp.com",
  projectId: "codegallery-32763",
  storageBucket: "codegallery-32763.appspot.com",
  messagingSenderId: "76871704974",
  appId: "1:76871704974:web:ce7196337cb33147a584df",
  measurementId: "G-DLP1QGPZP1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
