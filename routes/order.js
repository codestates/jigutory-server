const router = require('express').Router();
const controller = require('../controllers/order');

 
router.get('/list', controller.orderController);


module.exports = router;