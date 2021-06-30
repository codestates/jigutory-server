const router = require('express').Router()
const controller = require('../controllers/user')
const checkToken = require('../middlewares/checkToken')

router.use(checkToken)

router.get('/userinfo', controller.userinfoController);
router.post('/profileImage', controller.profileImageController);
router.patch('/useredit', controller.usereditController);
router.patch('/passwordedit', controller.passwordController);
router.delete('/withdraw', controller.withdrawController);
router.delete('/googlewithdraw', controller.withdrawController);
// router.delete('/kakaowithdraw', controller.withdrawController);

module.exports = router
