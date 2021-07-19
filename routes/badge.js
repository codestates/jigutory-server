const router = require('express').Router()
const controller = require('../controllers/badge')

router.post('/read', controller.readController)

module.exports = router
