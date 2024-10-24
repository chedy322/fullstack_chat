const express=require('express')
const Route=express.Router()
const {getRooms,joinRoom,room,quit_room,create_room,delete_room,update_room}=require('../controllers/rooms')
// all rooms
Route.route('/rooms').get(getRooms).post(create_room)
// Route.route('/admin_room/:id').post(create_room)
Route.route('/join_room/:id').post(joinRoom)
// by one room(id)
// check for the quitting weither post or delete
Route.route('/room/:id').get(room).put(update_room).delete(delete_room).post(quit_room)

module.exports=Route