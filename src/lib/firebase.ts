import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqtwKTOZ24UwC3xNp7An6PkiLysM3o0N8",
  authDomain: "dancefloor-a2773.firebaseapp.com",
  projectId: "dancefloor-a2773",
  storageBucket: "dancefloor-a2773.appspot.com",
  messagingSenderId: "758001218301",
  appId: "1:758001218301:web:8113eb8076e8294cf14494",
  databaseURL:
    "https://dancefloor-a2773-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

const database = getDatabase(firebase);

export { firebase, database };
