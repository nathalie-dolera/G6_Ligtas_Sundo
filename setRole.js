const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Assign roles only for admins
const admins = [
  { uid: "tCc3EhiTgXUBG9jASxVqRqKEtaQ2", role: "admin" },
  { uid: "iIte5DRhg1PRExzM9ha3foLU46j1", role: "admin" }
];

// Loop through each admin and assign role
admins.forEach(user => {
  admin.auth().setCustomUserClaims(user.uid, { role: user.role })
    .then(() => {
      console.log(`Role "${user.role}" assigned to UID: ${user.uid}`);
    })
    .catch((error) => {
      console.error(`Error assigning role to UID ${user.uid}:`, error);
    });
});
