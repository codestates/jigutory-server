const router = require('express').Router()
const controller = require('../controllers/auth')


router.post('/login', controller.loginController)
router.post('/signup', controller.signupController)
router.post('/googlelogin', controller.googleloginController)
router.post('/googlesignup', controller.googlesignupController)
// router.post('/kakaologin', controller.kakaologinController);
// router.post('/kakaosignup', controller.kakaosignupController);


module.exports = router
