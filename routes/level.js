const router = require('express').Router()
const controller = require('../controllers/level')

router.post('/read', controller.readController)
router.post('/info', controller.infoController)

module.exports = router
