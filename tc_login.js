document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value;

      if (!email.endsWith("@gmail.com")) {
        alert("Only @gmail.com emails are allowed.");
        return;
      }

      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          if (!user.emailVerified) {
            // Send verification if not already verified
            user.sendEmailVerification()
              .then(() => {
                alert("Verification email sent. Please check your inbox and verify before logging in.");
              })
              .catch((err) => {
                console.error("Error sending verification:", err);
              });

            firebase.auth().signOut();
            return;
          }

          alert("Login successful!");
          window.location.href = "registration.html"; // Teacher dashboard
        })
        .catch((error) => {
          alert(error.message);
        });
    });
  }
});
