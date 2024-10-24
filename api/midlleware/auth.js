// const express=require('express')
const jwt=require('jsonwebtoken')


async function authenticate(req,res,next){
    const cookie=req.cookies.token
    console.log(cookie)
    if(!cookie){
        return res.status(401).json('unauthorized')
    }
    jwt.verify(cookie,'chedy',(err,payload)=>{
        if (err) throw err
        // console.log(payload)
        req.user={
            username:payload.username,
            id:payload.id
        }
    })
    next()


}


module.exports=authenticate