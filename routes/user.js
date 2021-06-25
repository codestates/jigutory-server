const router = require('express').Router();
const controller = require('../controllers/user');
const checkToken = require("../middlewares/checkToken");

router.use(checkToken);

router.get('/userinfo', controller.userinfoController);
router.post('/profileImage', controller.profileImageController);
router.patch('/useredit', controller.usereditController);
router.patch('/passwordedit', controller.passwordController);
router.get('/withdraw', controller.withdrawController);
router.get('/googlewithdraw', controller.googlewithdrawController);
router.get('/kakaowithdraw', controller.kakaowithdrawController);


module.exports = router;
