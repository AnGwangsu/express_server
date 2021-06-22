const router = require('express').Router()
//passport
const passport = require('../../middleware/passport')
//로직
const token = require('./dao/token')
const login = require('./dao/login')

router.post('/auth/tokenCheck',token.tokenCheck)
//카카오 로그인
router.get('/kakao',passport.kakao.authenticate('kakao')); //서버 테스트를 위함, front에서 동의페이지로 넘어가서 필요x
router.get('/kakao/callback',passport.kakao.authenticate('kakao'),login.socialLogin)

router.get('/naver',passport.naver.authenticate('naver',{ scope: ['profile'] }))
router.get('/naver/callback',passport.naver.authenticate('naver'),login.socialLogin)

module.exports = router