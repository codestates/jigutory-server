const router = require('express').Router();
const controller = require('../controllers/level');

 
router.post('/read', controller.readController);


module.exports = router;