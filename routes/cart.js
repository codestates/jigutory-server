const router = require('express').Router();
const { route } = require('.');
const controller = require('../controllers/cart');

router.post('/count', controller.countController)
router.post('/read', controller.readController);
router.post('/update', controller.updateController);
router.delete('/delete', controller.deleteController);


module.exports = router
