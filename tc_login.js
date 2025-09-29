document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const forgotPasswordLink = document.getElementById("forgotPassword");
  const forgotForm = document.getElementById("forgotForm");

  // LOGIN HANDLER
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
            user.sendEmailVerification()
              .then(() => {
                alert("Verification email sent. Please check your inbox.");
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

  // FORGOT PASSWORD LINK (redirect to forgot_pass.html)
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "forgot_pass.html"; // go to reset page
    });
  }

  // FORGOT PASSWORD PAGE HANDLER
  if (forgotForm) {
    forgotForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      if (!email.endsWith("@gmail.com")) {
        alert("Please use your registered Gmail address.");
        return;
      }

      firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
          alert("Password reset email sent! Please check your inbox.");
          window.location.href = "tc_login.html"; // redirect back to login
        })
        .catch((error) => {
          if (error.code === "auth/invalid-action-code") {
            alert("Password already reset. Please log in with your new password.");
          } else if (error.code === "auth/user-not-found") {
            alert("No account found with this email.");
          } else {
            alert(error.message);
          }
        });
    });
  }
});
