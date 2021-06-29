const router = require('express').Router()

//로직
var data = require('./dao/data')


//지역코드 리스트
router.post('/locationCode',data.locationCode)

//지역기반 리스트
router.post('/locationList',data.locationList)

//문화공연/스포츠 리스트
router.post('/locationEnter',data.enterLocation)

//카테고리 기반
router.post('/categoryList',data.categoryList)

//숙박업소
router.post('/stayList',data.stayList)


//지역기반 상세보기
router.post('/read',data.read)


module.exports = router