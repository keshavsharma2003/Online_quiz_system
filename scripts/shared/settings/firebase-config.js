  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCaIXEnvE53Zhy9kgor0jbjOyJ3VFoaCnQ",
    authDomain: "online-quiz-app-85735.firebaseapp.com",
    projectId: "online-quiz-app-85735",
    storageBucket: "online-quiz-app-85735.appspot.com",
    messagingSenderId: "589433392456",
    appId: "1:589433392456:web:d8d8926b3ce224d80ff77d",
    measurementId: "G-G6JE842BF6"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);