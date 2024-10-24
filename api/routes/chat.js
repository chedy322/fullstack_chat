
const express=require('express')
const Route=express.Router()
const {get_all_chats,get_chat,create_chat,delete_chat,read_msg,notif}=require('../controllers/chat')




Route.route('/').get(get_all_chats).post(create_chat)
Route.route('/notification').get(notif)
Route.route('/:id').get(get_chat).delete(delete_chat).post(read_msg)




module.exports=Route