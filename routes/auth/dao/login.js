//DB
var { User } = require('../../../models');
//jwt
const jwt = require('jsonwebtoken')
//secret
const secret = require('../../../config/jwt').KEY.secret;

exports.socialLogin = async(req,res)=>{
    try {
        var data = req.user
        var socialType = data.provider
        var socialId = ''
        var username = ''
        var nickname = ''
        var password = ''
        if(socialType=='google'){
            socialType=10
        }else if(socialType=='kakao'){
            socialId = data.id
            username = socialType +'_'+socialId
            nickname = data._json.properties.nickname
            socialType=20
        }else if(socialType=='naver'){
            socialId = data.id
            username = socialType +'_'+socialId
            nickname = data._json.nickname
            socialType=30
        }
        
        var user = await User.findOne({
            where:{socialId}
        })
        var accessToken = ''
        var accountId = ''
        if(user!=null){
            console.log('이미 가입된 사용자')
            accountId = user.id
            accessToken=jwt.sign({accountId},secret,{expiresIn:'24h'})
        }else{
            var newUser =  await User.create({
                username,
                password,
                nickname,
                socialType,
                socialId
            })
            console.log('새로 가입된 사용자')
            accountId=newUser.id
            accessToken=jwt.sign({accountId},secret,{expiresIn:'24h'})
        }
        res.status(200).json({"resultCode":1, "data":{accessToken,accountId}})
    } catch (error) {
        console.log(error)
        res.status(400).json({"resultcode":-1,"data":null})
    }
}
