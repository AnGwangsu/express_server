//DB
var { User } = require("../../../models");
//crypto(비밀번호 암호화)
const crypto = require("crypto");

exports.join = async (req, res) => {
  try {
    var username = req.body.username
    var password = crypto.createHash('sha512').update(req.body.password).digest('hex')
    var nickname = req.body.nickname
    var socialId = ''
    var socialType = 0

    var user = await User.findOne({
        where:{username}
    })
    if(user !=null){
        console.log('이미 가입된 아이디 입니다.')
        res.status(400).json({"resultCode":-1, "data":null})
    }else{
        await User.create({
            username,
            password,
            nickname,
            socialId,
            socialType
        })
        console.log('회원가입 성공')
        res.status(200).json({"resultCode":1, "data":null})
    }
  } catch (error) {
    console.log('회원가입 실패'+error)
    res.status(400).json({"resultCode":-1, "data":null})
  }
};
