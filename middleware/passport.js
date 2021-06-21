const dotenv = require('dotenv')
dotenv.config()

var passport = require('passport')
var GoogleStrategy = require('passport-google-oauth2').Strategy
var NaverStrategy = require('passport-naver').Strategy
var KakaoStrategy = require('passport-kakao').Strategy

passport.serializeUser((user,done)=>{
    done(null,user)
})
passport.deserializeUser((user,done)=>{
    done(null,user)
})

var kakao = passport.use(new KakaoStrategy(
    {
        clientID: process.env.KAKAO_CLIENTID,
        callbackURL: process.env.KAKAO_REDIRECT_URL 
    }, (accessToken,refreshToken,profile,done)=>{
        done(null,profile)
    }
))

module.exports = {kakao}