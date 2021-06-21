const router = require('express').Router()

var data = require('./publicData/index')

router.use('/data',data)


module.exports = router