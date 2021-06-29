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

var google = passport.use(new GoogleStrategy(
    {
        clientID:process.env.GOOGLE_CLIENTID,
        clientSecret:process.env.GOOGLE_SECERET,
        callbackURL:process.env.GOOGLE_REDIRECT_URL
    }, (accessToken,refreshToken,profile,done)=>{
        done(null,profile)
    }
))


var kakao = passport.use(new KakaoStrategy(
    {
        clientID: process.env.KAKAO_CLIENTID,
        callbackURL: process.env.KAKAO_REDIRECT_URL 
    }, (accessToken,refreshToken,profile,done)=>{
        done(null,profile)
    }
))

var naver = passport.use(new NaverStrategy(
    {
        clientID: process.env.NAVER_CLIENTID,
        clientSecret:process.env.NAVER_SECRET,
        callbackURL:process.env.NAVER_REDIRECT_URL
    },(accessToken,refreshToken,profile,done)=>{
        done(null,profile)
    }
))

module.exports = {google,kakao,naver}