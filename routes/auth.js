const router = require('express').Router();
const controller = require('../controllers/auth');

 
router.post('/signin', controller.signinController);
router.post('/signup', controller.signupController);
router.post('/googlesignin', controller.googlesigninController);
router.post('/googlesignup', controller.googlesignupController);
router.post('/kakaosignin', controller.kakaosigninController);
router.post('/kakaosignup', controller.kakaosignupController);


module.exports = router;
