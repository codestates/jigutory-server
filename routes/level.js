const router = require('express').Router();
const controller = require('../controllers/level');

 
router.get('/read', controller.readController);


module.exports = router;