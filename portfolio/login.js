import { auth, signInWithEmailAndPassword } from "./firebase.js";

const loginForm = document.getElementById("login-form");
const loginStatus = document.getElementById("login-status");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const loginEmail = document.getElementById("login-email").value;
  const loginPassword = document.getElementById("login-password").value;

  try {
    await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    loginStatus.textContent = "Logged in!";
    window.location.href = "index.html";  

  } catch (error) {
    console.error(error.message);
    loginStatus.textContent = "Error: " + error.message;
  }
});
