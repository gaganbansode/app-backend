const express = require("express");
const {
  registerController,
  loginController,
  forgotPasswordController,
  updateProfileController,
} = require("../controller/authController");
const { isAdmin, requireSignIn } = require("../middleware/authMiddleware");

const router = express.Router();

// routing

router.post("/register", registerController);
router.post("/login", loginController);
//

router.post("/forgot-password", forgotPasswordController);
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
router.put("/profile", requireSignIn, updateProfileController);

module.exports = router;
