const express = require('express')
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const app = express()
const cors = require('cors');
const sequelize = require('./models').sequelize
const session = require('express-session')
const passport = require('passport')
const redis = require('redis')
// const RedisStore = require('connect-redis')(session)
// const redisClient =redis.createClient()

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
// app.use(session({
//     store: new RedisStore({client:redisClient}),
//     saveUninitialized:false,
//     secret:'keyboard cat',
//     resave:false,
// }))


//cors
var allowlist = ['http://localhost:8080'];
var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}
app.use(cors(corsOptionsDelegate));

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