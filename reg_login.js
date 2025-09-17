document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");

  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value;

      // Restrict to @sdca.edu.ph emails
      if (!email.endsWith("@gmail.com")) {
        alert("Only @gmail.com emails are allowed.");
        return;
      }

      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          alert("Account created successfully! Please log in.");
          window.location.href = "tc_login.html"; // redirect to login
        })
        .catch((error) => {
          alert(error.message);
        });
    });
  }
});
