const express=require('express')
const helmet = require('helmet');
const app=express()
const mongoose=require('mongoose')
require('dotenv').config()
const connect=require('./db/connect')
const jwt=require('jsonwebtoken')
const cors=require('cors')
const cookie=require('cookie-parser')
// const {Server}=require('socket.io')
const ws=require('ws')
// const { createServer } = require('node:http');
const port=process.env.PORT||3500
// json transfer
app.use(express.json())
app.use(cookie({
    origin:"http://localhost:5000",
    credentials:true,
    // protect againt cookie theft from xss
    httpOnly:true
}))
// use helmet to set csp(content security policy) against xss
app.use(helmet.contentSecurityPolicy({
    directives:{
        defaultSrc: ["'self'"], // Default 
        policyscriptSrc: ["'self'", "https://trusted-scripts.com"], // Allow scripts from self and trusted 
        domainimgSrc: ["'self'", "data:"], // Allow images from self and data URIs// Other directives as needed...
    }
}))
//add origin and credentials:true
app.use(cors({
    origin:'http://localhost:5000',
    credentials:true
}
))

// setting the routes
app.use('/',require('./routes/auth'))
// protected routes
app.use(require('./midlleware/auth'))
app.use('/user',require('./routes/user'))
app.use('/',require('./routes/rooms'))
// app.use('/main',require('./routes/main'))
app.use('/chat',require('./routes/chat'))
app.use('/message',require('./routes/message'))

const start=async()=>{
    try{
        await connect(process.env.DB_URL)
        console.log('connected to db')
        const server=app.listen(port,()=>{
            console.log(`listening on port  ${port}`)
        })

    }catch(err){
        console.log(err)
    }

}



start()