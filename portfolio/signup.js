import { auth, db,createUserWithEmailAndPassword,collection, doc, setDoc  } from "./firebase.js";


const signupForm = document.getElementById("signup-form");
const signupStatus = document.getElementById("signup-status");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const username = document.getElementById("username").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store user information in a Firestore collection
    const usersCollection = collection(db, 'users');
    const userDocRef = doc(usersCollection, user.uid);

    await setDoc(userDocRef, {
      uid: user.uid,
      username: username,
      email: email,
    });

    signupStatus.textContent = "Account created and logged in! Redirecting to login page...";
    
     window.location.href = "login.html"; 
  } catch (error) {
    console.error(error.message);
    signupStatus.textContent = "Error: " + error.message;
  }
});