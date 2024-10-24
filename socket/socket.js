const { Server } = require('socket.io');
const io = new Server({
    cors: {
        // development mode set to the * ||production change to the url
        origin: '*',
    }
},{
    // handling the state recovery
    connectionStateRecovery:{}
});
// array of object for connected users,has receiver id and socket id
let connected_users=[]
function add_user(user_id,socket_id,room=null){
    if(!user_id || !socket_id){
        console.log('Full Data required')
        return;
    }
    // checking exisitng user
    // const exisitng_user=connected_users.find((user)=>user.user_id==user_id)
    // if(!exisitng_user){
    //     connected_users.push({user_id,socket_id,room})
    // }
    // check this functionality
    let new_user={user_id,socket_id,room}
    connected_users=[...connected_users.filter(user=>user.socket_id!=socket_id),new_user]
    return new_user
}
function get_user(receiver_id){
    if(!receiver_id){
        console.log('Receiver id required')
        return;
    }
    const exisitng_user=connected_users.find((user)=>user.user_id==receiver_id)
    return exisitng_user?exisitng_user:false
}
function delete_user(socket_id){
    // if we wdon't reassing the array here it will create another copy of that wirhout originally updating the original array
    connected_users=connected_users.filter((user)=>user.socket_id!==socket_id)
}
function getusersinroom(room){
    return connected_users.filter(user=>user.room==room)
}
function getallactiverooms(){
    return Array.from(new Set((connected_users.map(user=>user.room))))
}
let user_id;
let user_name;
io.on('connection',(socket)=>{
    console.log('a new user connected')
    // on new user
    socket.on('new_user',(userinfo)=>{
        // add the user to the array
        user_id=userinfo._id
        user_name=userinfo.username
        add_user(userinfo._id,socket.id)
        console.log(`User ${userinfo.username} added sucessfully`)
    })
    // greeting this connected user
    socket.emit('greeting','Welcome to the Chat App')
    // find user(need to be fixed)
    let user;
    // send that user is connected to other connected users
    socket.broadcast.emit('user connection',`${user} is connected`)

    socket.on('send_message',({data,receiver_id})=>{
        // data=message and receiver_id
        // find the user with the receiver id
        console.log(data,receiver_id)
        const receiver=get_user(receiver_id)
        if(!receiver){
            console.log('user not found')
            return;
        }
        // send message to another client
        // we didn't use socket. here because we don't want to emit the event to the the same user(socket) 
        io.to(receiver.socket_id).emit('get_message',data)
    })
    // joining the room
    socket.on('join_room',({room_id:room})=>{
        // check if the user has already joined another room
        const joined_room=connected_users.find(user=>user.socket_id===socket.id)?.room
        // leave the room if exists
        // to negotiate because user can join multiple rooms but let's keep for test mode 
        if(joined_room){
            console.log('user is already in a room')
            socket.leave(joined_room)
            io.to(joined_room).emit('message',`${user_name} has left the room`)
            // update the users here 
        }
        // update the users in the other rooms and send msg
        console.log("User still didn't join any room")
        const added_user=add_user(user_id,socket.id,room)
        if(joined_room){
            io.to(joined_room).emit('user_list',getusersinroom(joined_room))
        }
        socket.join(room)
        socket.emit('message','You have joined the room succesfully')
        socket.broadcast.to(room).emit('message',`${user_name} has joined the room`)
        // update the users here 
        // join the other room and send msg to everyoune that the user has joined
        io.to(room).emit('user_list',getusersinroom(room))
        // Update rooms list for everyone ?
    })
    // creating new_room
    // socket.on('create_room',({room_name})=>{
        
    // })
    // typing module
    socket.on('activty',(receiver_id)=>{
        // send the activity to all connected users send the name of user 
        // socket.broadcast.emit('activity','User is typing')
        console.log(receiver_id)
        const receiver=get_user(receiver_id)
        console.log(receiver)
        if(!receiver){
            console.log("no receiver")
            throw Error;
        }
        // pass receiver_id and check if the receiver id is the same as the userinfo._id to diplay the typing 
        io.to(receiver.socket_id).emit('activity','User is typing')
    })
    socket.on('disconnect',()=>{
        console.log('a user disconnected')
        // socket.broadcast.emit() disconetend
        // delete the user from the connected array || for memory Leak as well
        delete_user(socket.id)
    })
})


io.listen(3100, () => {
    console.log('server running at http://localhost:3100');
  });
  
