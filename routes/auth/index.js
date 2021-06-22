const router = require('express').Router()
//passport
const passport = require('../../middleware/passport')
//로직
const token = require('./dao/token')
const login = require('./dao/login')

router.post('/auth/tokenCheck',token.tokenCheck)
//카카오 로그인
router.get('/kakao',passport.kakao.authenticate('kakao'));
router.get('/kakao/callback',passport.kakao.authenticate('kakao'),login.socialLogin)

module.exports = router