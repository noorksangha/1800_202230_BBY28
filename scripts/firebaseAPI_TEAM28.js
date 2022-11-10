var firebaseConfig = {
  apiKey: "AIzaSyAxePOpW3ue1Um8K_JWGJGZUG0DCkxYCA8",
  authDomain: "comp1800-bby28-78d0e.firebaseapp.com",
  projectId: "comp1800-bby28-78d0e",
  storageBucket: "comp1800-bby28-78d0e.appspot.com",
  messagingSenderId: "708406737096",
  appId: "1:708406737096:web:f564286f8fa3bbe5c40dfd"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();