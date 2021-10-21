import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// Get a Firestore instance
export const db = firebase
  .initializeApp({
    apiKey: "AIzaSyBz4heI_1_WgzkslJ9d9UgH6P8bThGnPvs",
    authDomain: "waction-prueba.firebaseapp.com",
    projectId: "waction-prueba",
    storageBucket: "waction-prueba.appspot.com",
    messagingSenderId: "463737140478",
    appId: "1:463737140478:web:5daceb7418586b1af3a1af"
  })
  .firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }

// if using Firebase JS SDK < 5.8.0
db.settings({ timestampsInSnapshots: true })