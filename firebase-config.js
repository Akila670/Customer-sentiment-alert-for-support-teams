// firebase-config.js
const firebaseConfig = {
  apiKey: "AIzaSyBHEfcraIkU0TLitxXeALrnKeTD-QhEwpQ",
  authDomain: "customer-sentiment-alert.firebaseapp.com",
  projectId: "customer-sentiment-alert",
  storageBucket: "customer-sentiment-alert.firebasestorage.app",
  messagingSenderId: "399931789889",
  appId: "1:399931789889:web:854e1809fb8e22d80becc0",
  measurementId: "G-8P4497G6G1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
