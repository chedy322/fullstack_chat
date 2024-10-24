import React, { useContext, useEffect, useState } from 'react';
import './Room.css'; // We'll use this for styling the component
import { socket_Theme } from '../context/Socket';


// setChatdetail11:58:06.657	      
// {
//   _id: '66c4c8bd94c430dece809c52',
//   users: [ '66b2326d9a1b4ea2dc48e123', '66b36f13af02a4f9a673c3a5' ],
//   last_message: 'hello>fgf',
//   seenBy: Array(298) [
//     '66b2326d9a1b4ea2dc48e123', '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5',
//     '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5',
//     '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5',
//     '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5',
//     '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5',
//     '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5',
//     '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5',
//     '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5',
//     '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5',
//     '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5',
//     '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5',
//     '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5',
//     '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5',
//     '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5',
//     '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5',
//     '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5',
//     '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5',
//     '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5',
//     '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5',
//     '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5',
//     '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5',
//     '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5',
//     '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5',
//     '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5',
//     '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5',
//     '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5',
//     '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5',
//     '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5',
//     '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5',
//     '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5',
//     '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5',
//     '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5',
//     '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5', '66b36f13af02a4f9a673c3a5',
//     '66b36f13af02a4f9a673c3a5', 
//     ...
//   ],
//   messages: Array(36) [
//     'hello', 'hey houwa', 'hello houwa 3200', 'hello houwa 3200', 'try now', 'don',
//     'hellp ', 'didn\'t appear', 'helo', 'sdfsdfsdf', '', 'fef', 'sii', 'go', 'try now',
//     'hyr', 'jjj', 'xxxxx', 'dsfsdfsdf', 'ergeg', 'fff', 'hry', 'xxx', 'sdsd', 'cccccccc',
//     'hello houwa 3200', 'hello houwa 3200', 'hey', 'alert(\'hey\')', '<script>alert(\'hey\')</script>',
//     'hey', 'jeheh>cknsq', 'hello>520', 'hello>520', 'hello>520', 'hello>fgf'
//   ],
//   createdAt: '2024-08-20T16:47:57.585Z',
//   updatedAt: '2024-10-02T10:55:33.846Z',
//   __v: 0,
//   receiver: {
//     _id: '66b2326d9a1b4ea2dc48e123',
//     username: 'houwa',
//     following: [ '66ae51b20415bf6e759c0785' ]
//   }
// }
// fecthing for the rooms here 
function Room({setOpenchat,setChatdetail,setChat_type,chat_type}) {
  const [rooms,setRooms]=useState([])
  const [error,setError]=useState()
  const [notif,setNotif]=useState()
  const {socket}=useContext(socket_Theme)
  useEffect(()=>{
    const fetching_data=async()=>{
      try{
        const response=await fetch('http://localhost:3500/rooms/',{
          method:'GET',
          credentials:"include",
          headers:{'Content-type':'application/json'}
        })
        console.log(response)
        if(response.status!==201){
          setError(response.message)
        }
        const data=await response.json()
        console.log(data.rooms)
        setRooms(data.rooms)
      }catch(err){
        console.log(err)
      }
    }
    fetching_data()
  },[])
  async function JoinRoom(room_id){
    try{
      const response=await fetch(`http://localhost:3500/room/${room_id}`,{
        method:"POST",
        credentials:"include",
        headers:{'Content-type':'application/json'}
      })
      if(response.status!==200){
        setError(response.message)
      }
      const data=await response.json()
      console.log(data)
      // user join the room
      // add only if data is successfull in database
      socket.emit('join_room',room_id)
      socket.on('message',async (info)=>{
        // here add later if the conversation is opened (chat)
        // display the message
        // check the created at here
        setNotif(`${info} at ${data.createdAt}`)
        // add the message here in the the db as post request to store
        await fetch(`http://localhost:3500/message/${room_id}`,{
          method:'POST',
          credentials:"include",
          body:{
            message:"admin",
            room_notif:info
          },
          headers:{'Content-type':'Application/json'}
        })
        // update users in room
      })
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className="room-container">
    {rooms.map((room) => {
      return (
        <div className="room" key={room._id} 
        onClick={(e)=>{
            e.stopPropagation();
            setChat_type("room")
            setChatdetail(room);
            setOpenchat(true);
        }
        }>
          <h3>#{room.name}</h3>
          <p>Brief:{room.description}</p>
          <h5>Owner:{room.created_by}</h5>
          <button onClick={()=>JoinRoom(room._id)}>Join Room</button>
          {error}
        </div>
      );
    })}
  </div>
  );
}

export default Room;

