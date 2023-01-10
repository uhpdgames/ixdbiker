 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyAyW9fkke_hj6dMMtpSpQMY842MUevd6hE",
   authDomain: "ixdbiker.firebaseapp.com",
   databaseURL: "https://ixdbiker-default-rtdb.asia-southeast1.firebasedatabase.app",
   projectId: "ixdbiker",
   storageBucket: "ixdbiker.appspot.com",
   messagingSenderId: "214093581590",
   appId: "1:214093581590:web:72d2b542723bb94f125437"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);

 import {getDatabase, update, remove, set, ref, child}
 from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

 const db = getDatabase();

 console.log(db);