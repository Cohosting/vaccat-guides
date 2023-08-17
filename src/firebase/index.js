// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDigrmCQJbzxe6ABTLoiwnEYh6_GYex9y8",
    authDomain: "vacaat-bd757.firebaseapp.com",
    projectId: "vacaat-bd757",
    storageBucket: "vacaat-bd757.appspot.com",
    messagingSenderId: "871529471149",
    appId: "1:871529471149:web:135c5093c38a944fc9fa24",
    measurementId: "G-STTW7PM5KS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)
const analytics = getAnalytics(app);