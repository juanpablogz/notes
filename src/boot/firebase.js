
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

require('firebase/auth');
// Agregar configuración firebase:
var firebaseConfig = {
    apiKey: "AIzaSyAOYxxdb7rAl278hNqQJvgWJROPodVRLyQ",
    authDomain: "notes-3686c.firebaseapp.com",
    databaseURL: "https://notes-3686c.firebaseio.com",
    projectId: "notes-3686c",
    storageBucket: "notes-3686c.appspot.com",
    messagingSenderId: "726535487774",
    appId: "1:726535487774:web:cbb2c3d73dd85075eb490f",
    measurementId: "G-E3FE2F0X6R"
};

let firebaseApp = firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();


export { db, firebase };
