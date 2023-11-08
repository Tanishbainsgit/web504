import { auth } from "./firebase.js"; // Import the auth object from firebase.js

auth.onAuthStateChanged((user) => {
  if (!user) {
    // User is not logged in, redirect to the login page
    window.location.href = "login.html"; // Replace "login.html" with your actual login page URL
  }
});

const logoutButton = document.getElementById("logout-button");

logoutButton.addEventListener("click", () => {
  // Sign out the user
  auth.signOut().then(() => {
    // Redirect to the login page after successful logout
    window.location.href = "login.html"; // Replace "login.html" with your actual login page URL
  }).catch((error) => {
    console.error("Error signing out:", error);
  });
});