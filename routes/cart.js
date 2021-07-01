const router = require('express').Router();
const controller = require('../controllers/cart');

 
router.get('/read', controller.readController);
router.post('/update', controller.updateController);
router.get('/delete', controller.deleteController);


module.exports = router;