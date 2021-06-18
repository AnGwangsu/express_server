const router = require('express').Router()

//로직
const token = require('./dao/token')

router.post('/auth/tokenCheck',token.tokenCheck)


module.exports = router