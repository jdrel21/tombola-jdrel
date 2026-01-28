import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBMUUCNaBY_8yOSntBQITklKXmn1HQ_ZRA",
  authDomain: "tombola-jdrel.firebaseapp.com",
  projectId: "tombola-jdrel",
  storageBucket: "tombola-jdrel.appspot.com",
  messagingSenderId: "742604571910",
  appId: "1:742604571910:web:0b9092abb4095e447a4a87"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.registerUser = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    window.location.href = "wheel.html";
  } catch (err) {
    alert(err.message);
  }
};

