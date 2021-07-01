const express = require('express')
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const app = express()
const cors = require('cors');
const sequelize = require('./models').sequelize
const session = require('express-session')
const passport = require('passport')

//post요청 설정
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//cookie-parser
app.use(cookieParser(process.env.COOKIE_SECRET));

//DB + sequelize
const driver = async()=>{
    try{
        await sequelize.sync({force:false})
    }catch(err){
        console.error('초기화 실패')
        console.error(err)
        return
    }
    console.log('초기화 완료')
}
driver()

//session설정
app.use(session({
    //비밀키 설정
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly: true,
        secure: false,
    },
    //같은 세션 정보 다시 저장할 건지 여부
    resave:true,
    //초기화되지 않은 세션정보 저장
    saveUninitialized:false 
}))
app.use(passport.initialize());
app.use(passport.session());


//cors설정
var allowList = ['http://localhost:8080','https://pwa-tour-41b4e.firebaseapp.com']
var corsOptionsDelegate = (req,callback)=>{
    var corsOptions;
    if(allowList.indexOf(req.header('Origin')) !==-1){
        corsOptions={origin:true}
    }else{
        corsOptions={origin:false}
    }
    callback(null,corsOptions)
}
app.use(cors(corsOptionsDelegate))

//.env설정
dotenv.config();


//라우터경로,라우터설정
const router = require('./routes/index')
app.use('/',router)


//서버포트 연결
var production = process.env.PRODUCTION_PORT;
var dev = process.env.DEV_PORT;
if (process.env.NODE_ENV === 'production') {
    app.listen(production, () => { console.log(`${production}port connected...`) })
} else {
    app.listen(dev, () => { console.log(`${dev}port connected...`) })
}