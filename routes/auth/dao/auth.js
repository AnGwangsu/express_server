//DB
var { User } = require("../../../models");

exports.checkId = async(req,res)=>{
    try {
        var username = req.body.username
        var user = await User.findOne({
            where:{username}
        })
        if(user==null){
            console.log('중복 아이디 없음')
            res.status(200).json({"resultCode":1, "data":null})
        }else{
            console.log('중복 아이디 존재')
            res.status(400).json({"resultCode":-1, "data":null})
        }
    } catch (error) {
        console.log('중복 아이디 확인 실패'+error)
        res.status(400).json({"resultCode":-1, "data":null})
    }
}