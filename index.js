document.getElementById('loginForm').addEventListener('submit', function(e) {
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
        // ✅ Allow only admins
        window.location.href = "dashboard.html";
      } else {
        // ❌ Not admin → show error
        firebase.auth().signOut();
        alert("Invalid admin account. Access denied.");
      }
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
    });
});
