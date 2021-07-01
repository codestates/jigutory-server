const router = require('express').Router()
const controller = require('../controllers/auth')

 
router.get('/signin', controller.loginController);

router.post('/signup', controller.signupController);
router.post('/googlesignin', controller.googleloginController);
// router.post('/kakaosignin', controller.kakaosigninController);

module.exports = router;

