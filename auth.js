import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBMUUCNabY_8yOSntBQITklkXmnlHQ_ZRA",
  authDomain: "tombola-jdrel.firebaseapp.com",
  projectId: "tombola-jdrel",
  storageBucket: "tombola-jdrel.appspot.com",
  messagingSenderId: "742604571910",
  appId: "1:742604571910:web:7eb42cbf0a3e31ff7a4a87"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 👇 FOARTE IMPORTANT
window.registerUser = function () {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("pass").value;

  if (!email || !pass) {
    alert("Completează email și parolă");
    return;
  }

  createUserWithEmailAndPassword(auth, email, pass)
    .then(() => {
      window.location.href = "wheel.html";
    })
    .catch(err => {
      alert(err.message);
    });
};
