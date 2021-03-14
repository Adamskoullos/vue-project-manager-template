import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDY7GWzYap5Q0Zg5SJ3IAE4olSFG-QaF64",
    authDomain: "prodev-b2404.firebaseapp.com",
    projectId: "prodev-b2404",
    storageBucket: "prodev-b2404.appspot.com",
    messagingSenderId: "966561701312",
    appId: "1:966561701312:web:74b6b95357a3e43fd9bc25"
  };

// Initialise firebase
firebase.initializeApp(firebaseConfig)

// Initialise services
const fStore = firebase.firestore()
const fAuth = firebase.auth()

// Timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp


export { timestamp, fStore, fAuth }



