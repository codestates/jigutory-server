const router = require('express').Router()
const controller = require('../controllers/cafe')

router.get('/list', controller.cafelist)

module.exports = router
