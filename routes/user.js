const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const checkToken = require("../middlewares/checkToken");

router.use(checkToken);

// * GET /user/userinfo
router.get("/userinfo", userController.userInfo);

// * POST /user/profileImage
router.post("/profileimage", userController.profileImage);

// * PATCH /user/userEdit
router.patch("/useredit", userController.userEdit);

// * PATCH /user/passwordedit -> 로그아웃 필요??
router.patch("/passwordedit", userController.passwordedit);

// * DELETE /user/withdraw
router.delete("/withdraw", userController.withdraw);

// * DELETE /user/googlewithdraw
router.delete("/googlewithdraw", userController.googlewithdraw);

// * DELETE /user/googlewithdraw
router.delete("/googlewithdraw", userController.googlewithdraw);

module.exports = router;
