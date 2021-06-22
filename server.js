const express = require('express')
const dotenv = require('dotenv');
const app = express()
const cors = require('cors');
const sequelize = require('./models').sequelize
const session = require('express-session')
const passport = require('passport')

//post요청 설정
app.use(express.json())
app.use(express.urlencoded({extended:false}))


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
    secret:process.env.COOKIE_SECRET,
    cookie:{maxAge:60*60*1000},
    resave:true,
    saveUninitialized:false 
}))
app.use(passport.initialize());
app.use(passport.session());


//cors설정
var allowList = ['http://localhost:8080']
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
app.listen(3000,()=>{
    console.log('3000port connected!')
})