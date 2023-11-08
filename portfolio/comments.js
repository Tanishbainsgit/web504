import {
  auth,
  db,
  collection,
  addDoc,
  doc,
  getDoc,
  onSnapshot,updateDoc,deleteDoc
} from "./firebase.js";

// Get references to HTML elements
const commentForm = document.getElementById("comment-form");
const commentInput = document.getElementById("comment-input");
const commentsList = document.getElementById("comments-list");

// Function to add a new comment to the Firebase Firestore
const addComment = async (commentText) => {
  if (!commentText) return;

  const user = auth.currentUser;

  if (user) {
    // Fetch the username from the users collection using the user's UID
    const userDocRef = doc(db, "users", user.uid);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const username = userDocSnapshot.data().username;
      const commentData = {
        text: commentText,
        username: username,
        timestamp: new Date(),
      };

      try {
        await addDoc(collection(db, "comments"), commentData);
        commentInput.value = ""; // Clear the input field
      } catch (error) {
        console.error("Error adding comment: ", error);
      }
    }
  }
};
const formatTimestamp = (timestamp) => {
  const date = timestamp.toDate();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedTime = `${day}/${month}/${year} ${
    hours % 12
  }:${minutes} ${ampm}`;
  return formattedTime;
};

const renderComments = (comments) => {
  commentsList.innerHTML = ""; 

  comments.forEach((comment) => {
    const commentItem = document.createElement("div");
    commentItem.classList.add("comment-item"); 
    commentItem.innerHTML = `
        <div class="comment-header">
          <p class="comment-username"><strong>${
            comment.data().username
          }</strong></p>
          <p class="comment-timestamp">${formatTimestamp(
            comment.data().timestamp
          )}</p>
        </div>
        <p class="comment-text">${comment.data().text}</p>
        <div class="comment-buttons">
          <button class="edit-comment" data-comment-id="${
            comment.id
          }">Edit</button>
          <button class="delete-comment" data-comment-id="${
            comment.id
          }">Delete</button>
        </div>
      `;
    commentsList.appendChild(commentItem);
  
  

    const editButton = commentItem.querySelector(".edit-comment");
    const deleteButton = commentItem.querySelector(".delete-comment");

    editButton.addEventListener("click", () => {
      const commentTextElement = commentItem.querySelector(".comment-text");
      const commentText = commentTextElement.textContent;
      const commentId = editButton.getAttribute("data-comment-id");

      commentTextElement.innerHTML = `
          <input type="text" id="edited-comment-${commentId}" value="${commentText}" />
          <button class="save-comment" data-comment-id="${commentId}">Save</button>
        `;

      const saveButton = commentItem.querySelector(".save-comment");

      saveButton.addEventListener("click", async () => {
        const editedComment = document.getElementById(
          `edited-comment-${commentId}`
        ).value;

        const commentRef = doc(db, "comments", commentId);
        try {
          await updateDoc(commentRef, {
            text: editedComment,
          });
        } catch (error) {
          console.error("Error updating comment: ", error);
        }

        commentTextElement.textContent = editedComment;
      });
    });

    deleteButton.addEventListener("click", async () => {
        const commentId = deleteButton.getAttribute("data-comment-id");
      
        const userConfirmed = window.confirm("Are you sure you want to delete this comment?");
      
        if (userConfirmed) {
         
          const commentRef = doc(db, "comments", commentId);
          try {
            await deleteDoc(commentRef);
          } catch (error) {
            console.error("Error deleting comment: ", error);
          }
      
          commentItem.remove();
        }
      });
      
  });
};

const commentsRef = collection(db, "comments");
onSnapshot(commentsRef, (snapshot) => {
  const commentsData = snapshot.docs;
  renderComments(commentsData);
});

commentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addComment(commentInput.value);
});
