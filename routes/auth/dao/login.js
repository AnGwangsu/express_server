//DB
var { User } = require("../../../models");
//jwt
const jwt = require("jsonwebtoken");
//secret
const secret = require("../../../config/jwt").KEY.secret;
//crypto(비밀번호 암호화)
const crypto = require("crypto");

exports.socialLogin = async (req, res) => {
  try {
    var data = req.user;
    var socialType = data.provider;
    var socialId = "";
    var username = "";
    var nickname = "";
    var password = "";
    if (socialType == "google") {
      socialType = 10;
    } else if (socialType == "kakao") {
      socialId = data.id;
      username = socialType + "_" + socialId;
      nickname = data._json.properties.nickname;
      socialType = 20;
    } else if (socialType == "naver") {
      socialId = data.id;
      username = socialType + "_" + socialId;
      nickname = data._json.nickname;
      socialType = 30;
    }

    var user = await User.findOne({
      where: { socialId },
    });
    var accessToken = "";
    var accountId = "";
    if (user != null) {
      console.log("이미 가입된 사용자");
      accountId = user.id;
      accessToken = jwt.sign({ accountId }, secret, { expiresIn: "24h" });
    } else {
      var newUser = await User.create({
        username,
        password,
        nickname,
        socialType,
        socialId,
      });
      console.log("새로 가입된 사용자");
      accountId = newUser.id;
      accessToken = jwt.sign({ accountId }, secret, { expiresIn: "24h" });
    }
    res.status(200).json({ resultCode: 1, data: { accessToken, accountId } });
  } catch (error) {
    console.log(error);
    res.status(400).json({ resultcode: -1, data: null });
  }
};

exports.login = async (req, res) => {
  try {
    var isAutoLogin = req.body.isAutoLogin;
    var accountId = 0;
    var accessToken = "";
    var id_inToken = 0; //토큰 디코딩해서 받아오는 유저id값
    var nickname = "";

    if (isAutoLogin == true) {
      console.log("자동로그인");
      accountId = req.body.accountId;
      accessToken = req.body.accessToken;
      refreshToken = req.body.refreshToken;
      //토큰 검증
      jwt.verify(accessToken, secret, (err, user) => {
        if (err) {
          console.log("리프레쉬 토큰 검증");
          jwt.verify(refreshToken, secret, (err, user) => {
            if (err) {
              console.log("모든 토큰 만료");
              res.status(403).json({ resultCode: -30, data: null });
            } else {
              console.log("리프레쉬 토큰 검증 성공");
              id_inToken = user.accountId;
            }
          });
        } else {
          console.log("액세스 토큰 검증 성공");
          id_inToken = user.accountId;
        }
      });
      //토큰에서 나온pk값과  넘어온accountId를 비교
      if (accountId == id_inToken) {
        console.log("accountId 일치");
        var user = await User.findOne({
          where: { id: accountId },
        });
        nickname = user.nickname;
        accountId = user.id;

        accessToken = jwt.sign({ accountId }, secret, { expiresIn: "24h" });
        refreshToken = jwt.sign({ accountId }, secret, { expiresIn: "30d" });
        console.log("자동로그인 성공");
        res
          .status(200)
          .json({
            resultCode: 1,
            data: { accountId, nickname, accessToken, refreshToken },
          });
      } else {
        console.log("자동 로그인 실패");
        res.status(400).json({ resultCode: -20, data: null });
      }
    } else {
      console.log("아이디/비밀번호 입력 로그인");
      var username = req.body.username;
      var password = crypto
        .createHash("sha512")
        .update(req.body.password)
        .digest("hex");
      var inputUser = await User.findOne({
        where: {
          username,
        },
      });
      if (inputUser != null) {
        var dbPassword = inputUser.password;
        if (password == dbPassword) {
          nickname = inputUser.nickname;
          accountId = inputUser.id;
          accessToken = jwt.sign({ accountId }, secret, { expiresIn: "24h" });
          refreshToken = jwt.sign({ accountId }, secret, { expiresIn: "30d" });
          console.log("아이디/비밀번호 입력 로그인 성공");
          res
            .status(200)
            .json({
              resultCode: 1,
              data: { accountId, nickname, accessToken, refreshToken },
            });
        } else {
          console.log("비밀번호 불일치");
          res.status(400).json({ resultCode: -40, data: null });
        }
      } else {
        console.log("가입되지 않은 계정");
        res.status(400).json({ resultCode: -30, data: null });
      }
    }
  } catch (error) {
    console.log("로그인 실패" + error);
    res.status(400).json({ resultCode: -1, data: null });
  }
};
