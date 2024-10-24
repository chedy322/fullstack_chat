const express=require('express')
const Route=express.Router()
const chats=require('../controllers/main')

Route.route('/').get(chats)






module.exports=Route