const router = require('express').Router()
//passport
const passport = require('../../middleware/passport')
//로직
const token = require('./dao/token')
const login = require('./dao/login')
const join = require('./dao/join')
const auth = require('./dao/auth')

router.post('/auth/tokenCheck',token.tokenCheck)
//구글 로그인
router.get('/google',passport.google.authenticate('google', {scope: ['openid', 'email', 'profile']}))
router.get('/google/callback',passport.google.authenticate('google'),login.socialLogin)
//카카오 로그인
router.get('/kakao',passport.kakao.authenticate('kakao')); //서버 테스트를 위함, front에서 동의페이지로 넘어가서 필요x
router.get('/kakao/callback',passport.kakao.authenticate('kakao'),login.socialLogin)
//네이버 로그인
router.get('/naver',passport.naver.authenticate('naver',{ scope: ['profile'] }))//서버 테스트를 위함, front에서 동의페이지로 넘어가서 필요x
router.get('/naver/callback',passport.naver.authenticate('naver'),login.socialLogin)
//일반 로그인
router.post('/login',login.login)
//회원가입
router.post('/join',join.join)
//토큰체크
router.post('/tokenCheck',token.tokenCheck)
//토큰갱신
router.post('/renewToken',token.renewToken)
//아이디 중복체크
router.post('/checkId',auth.checkId)

module.exports = router