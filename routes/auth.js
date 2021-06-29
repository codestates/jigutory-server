const router = require('express').Router();
const controller = require('../controllers/auth');

 
router.post('/signin', controller.signinController);
router.post('/signup', controller.signupController);
router.post('/googlesignin', controller.googlesigninController);
// router.post('/kakaosignin', controller.kakaosigninController);

module.exports = router;
