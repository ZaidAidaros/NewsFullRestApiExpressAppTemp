const router = require("express").Router();
const {
  logIn,
  logOut,
  signUp,
  resetPassword,
  verifyEmailPhone,
  foregetpassword,
} = require("../controllers/authController");

router.get("/logout", logOut);
router.get("/verify", verifyEmailPhone);
router.post("/login", logIn);
router.post("/signup", signUp);
router.post("/foregetpassword", foregetpassword);
router.post("/resetpassword", resetPassword);

module.exports = router;
