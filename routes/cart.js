const router = require('express').Router();
const controller = require('../controllers/cart');

 
router.post('/read', controller.readController);
router.post('/update', controller.updateController);
router.delete('/delete', controller.deleteController);


module.exports = router;