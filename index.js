// LOGIN FORM
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        return userCredential.user.getIdTokenResult();
      })
      .then((idTokenResult) => {
        const role = idTokenResult.claims.role;

        if (role === "admin") {
          // Allow only admins
          window.location.href = "dashboard.html";
        } else {
          // Not admin → show error
          firebase.auth().signOut();
          alert("Invalid admin account. Access denied.");
        }
      })
      .catch((error) => {
        alert("Login failed: " + error.message);
      });
  });
}

// FORGOT PASSWORD LINK (from index.html)
const forgotPasswordLink = document.getElementById("forgotPassword");
if (forgotPasswordLink) {
  forgotPasswordLink.addEventListener("click", function(e) {
    e.preventDefault();
    window.location.href = "forgot_admin.html"; // go to reset page
  });
}

// FORGOT PASSWORD FORM (forgot_pass.html)
const forgotForm = document.getElementById('forgotForm');
if (forgotForm) {
  forgotForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();

    if (!email) {
      alert("Please enter your email.");
      return;
    }

    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        alert("Password reset link sent to " + email + ". Please check your inbox.");
        window.location.href = "index.html";
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          alert("No account found with this email.");
        } else {
          alert("Error: " + error.message);
        }
      });
  });
}

