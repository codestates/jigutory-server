const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");

// * POST /auth/signin
router.post("/signin", authController.signin);

// * POST /user/signup
router.post("/signup", authController.signup);

// * POST /user/signUp
router.post("/signup", authController.signup);

// * POST /user/signUp
router.post("/signup", authController.signup);

// * POST /user/signUp
router.post("/signup", authController.signup);

// * POST /user/signUp
router.post("/signup", authController.signup);

module.exports = router;
