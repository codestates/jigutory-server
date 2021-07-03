const router = require('express').Router();
const controller = require('../controllers/auth');

 
router.post('/signin', controller.loginController);
router.post('/signup', controller.signupController);
router.post('/googlesignin', controller.googleloginController);
router.post('/googlesignup', controller.googlesignUpController);

module.exports = router;
