const router = require('express').Router();
const controller = require('../controllers/badge');

 
router.get('/read', controller.readController);


module.exports = router;