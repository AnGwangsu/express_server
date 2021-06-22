//DB
var { User } = require("../../../models");
//jwt
const jwt = require("jsonwebtoken");
//secret
const secret = require("../../../config/jwt").KEY.secret;

exports.tokenCheck = (req, res) => {
  try {
    var accessToken = req.headers.authorization || req.body.authorization;
    jwt.verify(accessToken, secret, (err, _) => {
      if (err) {
        console.log("토큰 만료" + err);
        res.status(403).json({ resultCode: -30, data: null });
      } else {
        console.log("토큰 체크 성공");
        res.status(200).json({ resultCode: 1, data: null });
      }
    });
  } catch (error) {
    console.log("토큰체크 실패" + error);
    res.status(400).json({ resultCode: -1, data: null });
  }
};

exports.renewToken = (req, res) => {
  try {
    var accessToken = req.body.accessToken;
    var refreshToken = req.body.refreshToken;
    var accountId = 0;
    jwt.verify(accessToken,secret,(err,user)=>{
        if(err){
            console.log('accessToken만료'+err)
            jwt.verify(refreshToken,secret,(err,user)=>{
                if(err){
                    console.log('refreshToken만료'+err)
                    res.status(403).json({"resultCode":-30, "data":null})
                }else{
                    accountId=user.accountId
                    accessToken=jwt.sign({accountId},secret,{expiresIn:'24h'})
                    refreshToken=jwt.sign({accountId},secret,{expiresIn:'30d'})
                    console.log('token갱신 성공')
                    res.status(200).json({"resultCode":1, "data":{accountId,accessToken,refreshToken}})
                }
            })
        }else{
            console.log('accessToken확인 완료')
            accountId=user.accountId
            accessToken=jwt.sign({accountId},secret,{expiresIn:'24h'})
            refreshToken=jwt.sign({accountId},secret,{expiresIn:'30d'})
            console.log('token갱신 성공')
            res.status(200).json({"resultCode":1, "data":{accountId,accessToken,refreshToken}})
        }
    })
  } catch (error) {
      console.log('token갱신 실패'+error)
      res.status(400).json({"resultCode":-1, "data":null})
  }
};
