const express = require('express')
const dotenv = require('dotenv');
const app = express()
const cors = require('cors');

//post요청 설정
app.use(express.json())
app.use(express.urlencoded({extended:false}))

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