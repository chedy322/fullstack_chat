// fetching all rooms
const Rooms=require('../module/rooms')
const mongoose=require('mongoose')
const Message=require('../module/message')
const rooms = require('../module/rooms')
const getRooms=async(req,res)=>{
    try{
        const rooms=await Rooms.find({})
        if(!rooms ||!rooms.length){
            return res.status(404).json({message:'No rooms found'})
        }
        console.log(rooms)
        return res.status(201).json({rooms})
    }catch(err){
        console.log(err)
        return res.status(400).json({message:'Error finding rooms'})
    }
}
// join room
const joinRoom = async (req, res) => {
    try {
        // take the room id from the params
        const { id:roomId } = req.params;
        // user id
        const { id:userId,username} = req.user;
        console.log(username)
        if(!userId){
            return res.status(400).json({message:'Unauthorized'})
        }
        // check if the room exists
        const room = await Rooms.findOne({ _id: roomId });
        if (!room) {
            return res.status(400).json({ message: 'No such room to join, please join a valid room' });
        }

        // check if the user is already in the room
        const existing_user = room.members.find((user) => user.userId == userId);
        if (existing_user) {
            return res.status(400).json({ message: 'You are already in the room' });
        }

        // add the user to the room's members
        room.members.push({
            userId: userId,
            // change this later to another id
            role: userId !== 1? 'member' : 'admin',// 'admin' as a string,
            username
        });

        // save the room
        await room.save();
        console.log(room)
        return res.status(200).json({room});

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error joining the room, please try again' });
    }
}
// quit room by id
const quit_room = async (req, res) => {
    try {
        // Get the room ID where the user wants to quit
        const { id: roomId } = req.params;
        // Get the user ID
        const { id: user_id } = req.user;
        console.log(user_id);

        // Find the room
        const room = await Rooms.findOne({
            $and: [
                { members: { $elemMatch: { userId: user_id, role: 'member' } } },
                { _id: roomId }
            ]
        });
        // console.log(room);

        if (!room) {
            return res.status(404).json({ message: 'No such room, please check again' });
        }

        // Remove the user from the room
        // user_id is an instance of the object user.userId so they compaared by their adress not but their values
        room.members = room.members.filter((user) => !user.userId.equals(user_id));
        await room.save();

        // Return the updated room
        return res.status(201).json({ room });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error quitting the room, please try again' });
    }
};


// fetch room and its msgs
const room=async(req,res)=>{
    try{
        // get the room id from the url
        const {id:roomId}=req.params;
        // find the rood and send its info and current msg
        const room=await Rooms.findOne({ _id: roomId });
        if(!room){
            return res.status(400).json({ message: 'No such room to join, please join'})
        }
        const messages=await Message.find({chatId:roomId})
        // send the room info and current msg
        return res.status(200).send({room,messages})
    }catch(err){
        console.log(err)
        return res.status(400).json({message:'Unable to find this room'})
    }
}
// create room by the admin
const create_room=async(req,res)=>{
    try {
        const{id:user_id}=req.user
        // check if the user id is admin id (temporary:1)
        if(user_id!=="66b36f13af02a4f9a673c3a5"){
            return res.status(400).json({message:'Only admin can create room'})
        }
        // create new room
        const room=new Rooms({
            name:req.body.name,
            description:req.body.description,
            members:[
                {
                    userId:user_id,
                    role:'admin'
                }
            ],
            rooms_type:req.body.rooms_type,
            created_by:req.user.username
        })
        // save the room
        await room.save()
        // send the room info
        return res.status(201).json({room})

    }catch(err){
        console.log(err)
        return res.status(400).json({message:'Unable to create this room'})
    }
}
// delete rooms by the admin
const delete_room=async(req,res)=>{
    try{
        // check admin status
        const{id:user_id}=req.user
        if(user_id!=="66b36f13af02a4f9a673c3a5"){
            return res.status(400).json({message:'Only admin can delete this room'})
        }
        // take the room id to delete(should be named room_id in the frontend)
        const {id:room_id}=req.params
        // check the room
        const room=await Rooms.findOne({_id:room_id})
        if(!room){
            return res.status(404).json({message:'No such room'})
        }
        // delete the room
        await room.deleteOne({_id:room_id})
        // check maybe i need to return the updated rooms
        return res.status(200).json({message:'Room deleted successfully'})
    }catch(err){
        console.log(err)
        return res.status(500).json({ message: 'Error deleting the room, please try again' });
    }
}
// update room by the admin
// admin can remove mmembers,change room name,change room description,change room type,change description,change member status(from admin to user or from user to admin) 
const update_room=async(req,res)=>{
    try{
        // check admin status
        const {id:user_id}=req.user
        console.log(user_id)
        // get the room id to update
        const{id:room_id}=req.params
        // console.log(room_id)
        // we can add later multiple admins
        if(user_id!=="66b36f13af02a4f9a673c3a5"){
            return res.status(400).json({message:"Forbidden,only admin can update the room"})
        }
        // check the room and only where the user is it's admin because we don't want to give different admin access to non-admin room
        const room=await Rooms.findOne({
            _id:room_id,
            members:{
                $elemMatch:{
                    userId:user_id,
                    role:"admin"
                }
            }
        })
        console.log(room)
        if(!room){
            return res.status(404).json({message:'No such room or you are not the admin'})
        }
        const updates={...req.body}
        // update the room
        Object.assign(room,updates)
        await room.save()
        return res.status(200).json({message:'success'})
    }catch(err){
        console.log(err)
         return res.status(500).json({ message: 'Error updating the room, please try again' });
    }
}
// add 


module.exports={getRooms,quit_room,joinRoom,room,create_room,delete_room,update_room}