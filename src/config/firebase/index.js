import firebase from 'firebase/app';
import  'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyBZeyMcBWpEQY_IGe2JICBUTAXvEgkdkDM",
    authDomain: "simple-notes-firebase-4dda4.firebaseapp.com",
    databaseURL: "https://simple-notes-firebase-4dda4.firebaseio.com",
    projectId: "simple-notes-firebase-4dda4",
    storageBucket: "simple-notes-firebase-4dda4.appspot.com",
    messagingSenderId: "1029025786523",
    appId: "1:1029025786523:web:930ef59bb60a029bbab43e",
    measurementId: "G-3P5G28V1PB"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // firebase.analytics();

  export default firebase;