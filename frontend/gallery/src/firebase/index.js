import firebase from "firebase"
import "@firebase/firestore"
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyBS5HnDTULMqI2veZffCl7x6IzQmZA0XEw",
//     authDomain: "gallery-c5570.firebaseapp.com",
//     projectId: "gallery-c5570",
//     storageBucket: "gallery-c5570.appspot.com",
//     messagingSenderId: "770103169712",
//     appId: "1:770103169712:web:9da1839eb2d154946d6175",
//     measurementId: "G-Z6W5JCSBVD"
//   };

// initializeApp(firebaseConfig)

export const app = firebase.initializeApp({
    apiKey: "AIzaSyBS5HnDTULMqI2veZffCl7x6IzQmZA0XEw",
    authDomain: "gallery-c5570.firebaseapp.com",
    projectId: "gallery-c5570",
    storageBucket: "gallery-c5570.appspot.com",
    messagingSenderId: "770103169712",
    appId: "1:770103169712:web:9da1839eb2d154946d6175",
    measurementId: "G-Z6W5JCSBVD"
  })
// importing storage

