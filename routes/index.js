const router = require('express').Router()

const data = require('./publicData/index')
const user = require('./auth/index') 

router.use('/data',data)
router.use('/user',user)


module.exports = router