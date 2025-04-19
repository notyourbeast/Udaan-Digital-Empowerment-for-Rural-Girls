import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBPFb8uxZ2mLyVmv2d8JFPcmyBChc9LjkE",
  authDomain: "women-empwr.firebaseapp.com",
  projectId: "women-empwr",
  storageBucket: "women-empwr.appspot.com",
  messagingSenderId: "XXXXXXX",
  appId: "1:230261281865:web:a5ad656bd1de125eafdb98"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function handleSignup(formId, role) {
  const form = document.getElementById(formId);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.querySelector("input[type='text']").value;
    const email = form.querySelector("input[type='email']").value;
    const password = form.querySelector("input[type='password']").value;
    const confirmPassword = form.querySelectorAll("input[type='password']")[1].value;
    const age = parseInt(form.querySelector("input[type='number']").value);
    const preference = form.querySelector("select:last-of-type").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (age < 10 || age > 99) {
      alert("Please enter a valid age between 10 and 99.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Define the document data
      const docData = {
        uid,
        name,
        email,
        age,
        preference,
        role,
        password,  // Storing the password (Note: this is insecure, ideally hash it first)
        last: new Date().toISOString(), // 'last' column with current timestamp
        createdAt: new Date().toISOString() // Time when the user signed up
      };

      // Add relation only for parents
      if (role === "parent") {
        docData.relation = form.querySelector("select").value;
      }

      // Store in Firestore
      await setDoc(doc(db, "users", uid), docData);

      alert("Signup successful!");
      window.location.href = "log.html";  // Redirect after successful signup
    } catch (error) {
      console.error(error.message);
      alert("Signup failed: " + error.message);
    }
  });
}

// Attach form handlers
document.addEventListener("DOMContentLoaded", () => {
  handleSignup("parentForm", "parent");
  handleSignup("userForm", "user");
});
