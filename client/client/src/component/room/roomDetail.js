import React, { useEffect, useState } from 'react'

function RoomDetail({chatDetail,send_message,typing}) {
    console.log(chatDetail)
    const[messages,setMessages]=useState()
    // useEffect(()=>{
    //   async function searching(){
    //       const response=await fetch(`http://localhost:3500/room/${chatId}`,{
    //         method:"GET",
    //         headers:{'Content-Type':'application/json'},
    //         credentials:"include"
    //       })
    //       // console.log(response)
    //       const result=await response.json()
    //       console.log(result)

    //     }catch(err){
    //       console.log(err)
    //     }
    //   }
    //   searching()
    // },[])
    return (
    <div>
      <div>
        <h1>Welcome to {chatDetail.name} Room</h1>
        <h1>Admin:{chatDetail.created_by}</h1>
        <p>{chatDetail.description}</p>
        {/* hide this later */}
        {
            chatDetail.members.map(element => {
                return(
                <div key={element._id}>
                    <h2>{element.username}</h2>
                    <h5>{element.role}</h5>
                </div>
                )
                
            })
        }
      </div>
      {/* <div className="messages">
                {
                    !messages?<p>No messages yet</p>:
                    (
                        messages.map((message, index) => (
                            <div
                                key={index}
                            >
                                <span className={message.userId===userInfo._id?'user':'receiver'}>{message.messages}</span>
                            </div>
                        ))
                    ) 
                }
                </div> */}
      {/* onSubmit={send_message} */}
      {typing}
            <form onSubmit={send_message}>
            <input type='text' className='input' name='message'/>
        {/*addding file later  */}
            <button className='send-btn' type='submit'>Send</button>
            </form>
    </div>
  )
}

export default RoomDetail





// _id: '670ba82a19513c56dc19cc4a',
// name: 'Monk Mode',
// created_by: 'houwa ',
// rooms_type: 'public',
// description: 'This Room is for studying and sharing Information v2.0',
// members: [
//   {
//     userId: '66b36f13af02a4f9a673c3a5',
//     role: 'admin',
//     _id: '670ba82a19513c56dc19cc4b'
//   }
// ],