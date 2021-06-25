const router = require('express').Router();
const controller = require('../controllers/product');

 
router.get('/info', controller.infoController);
router.get('/list', controller.listController);


module.exports = router;