const router = require('express').Router()

//로직
var data = require('./dao/data')

//지역기반 리스트
router.get('/list',data.list)
//지역기반 상세보기
 router.get('/read',data.read)


module.exports = router