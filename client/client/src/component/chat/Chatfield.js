import React, { useContext, useEffect, useState } from 'react';
import { contextTheme } from '../../context/context';
import { socket_Theme } from '../../context/Socket';
import './chatfield.css'
import RoomDetail from '../room/roomDetail';
// to do 
// finish handling the typing method
// finish the search for chats and creating rooms
function Conversation({chatDetail,chat_type}) {
    console.log(chatDetail)
    const [conversation, setConversation] = useState([]);
    const {socket}=useContext(socket_Theme)
    // const [message,setMessage]=useState()
    const [messages, setMessages] = useState([]);
    const [opened,setOpened]=useState(false)
    const {userInfo}=useContext(contextTheme)
    const[typing,setTyping]=useState()
    const chatId=chatDetail._id
    console.log(chatId)
    // const handleChange=(e)=>{
    //     setMessage(e.target.value)
    // }
    useEffect(() => {
        const fetchConversation = async () => {
            try {
                const response = await fetch(`http://localhost:3500/chat/${chatId}`,{
                    method:'GET',
                    headers:{"Content-type":"application-json"},
                    credentials: 'include',
                });
                if(response.ok){
                    setOpened(true)
                }
                const data = await response.json();
                console.log(data)
                console.log(opened)
                setConversation(data.chat);
                setMessages(data.messages);
            } catch (error) {
                console.error('Error fetching conversation:', error);
            }
        };

        fetchConversation();
    }, [chatId]);

    const send_message = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target); // FormData is sent as multipart/form-data
        const text=data.get('message')
        try {
            const response = await fetch(`http://localhost:3500/message/${chatDetail._id}`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({message:text} )
            });
            const result = await response.json();
            console.log(result);
            console.log(messages);
            setMessages((prev)=>([...prev,result.messages]))
            socket.emit('send_message',{data:result.messages,receiver_id:chatDetail.receiver._id})
            e.target.reset()
        } catch (err) {
            console.log(err);
        }
    };
    // handle getting messages
useEffect(()=>{
    if(socket){
        const handlemessage=(data)=>{
            setMessages((prev)=>[...prev,data])
            console.log(data)}
        
        socket.on('get_message',handlemessage)
    return ()=>{socket.off('get_message',handlemessage)}
        }

},[socket,chatId,opened])
// handle typing
// error here because of the previuos room
useEffect(()=>{
    const handleTyping=()=>{
            console.log(chat_type)
            socket.emit('activty',chat_type==="chat"?chatDetail.receiver._id?chat_type==="room":chatDetail._id:null)
    }
    document.addEventListener('keydown',handleTyping)
    return ()=>{
        document.removeEventListener('keydown',handleTyping)
    }
},[socket,chatId,opened])
// handle typing
useEffect(() => {
    let typingTimeout;
    if (socket && chatId) {
        const handleTyping = (data) => {
            setTyping(data);
            clearTimeout(typingTimeout);
            typingTimeout = setTimeout(() => {
                setTyping("");
            }, 3000);
        };
        socket.on('activity', handleTyping);
        return () => {
            socket.off('activity', handleTyping);
            clearTimeout(typingTimeout);
        };
    }
}, [socket,chatId,opened]);
// need to fix this 
useEffect(()=>{
    document.querySelector('.input').value="";
},[chatId])
if(chat_type==="room"){
    return(
        <RoomDetail chatDetail={chatDetail} send_message={send_message} typing={typing}/>
    )
}else{


    return (
        <div className="conversation-container">
            <h2>Conversation</h2>
            {/* <div className="users">
                <strong>Users: </strong>
                {conversation?.users?`Chatting with ${chatDetail.receiver.username}`:'None'}
            </div> */}
            <div className="messages">
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
                {/* {messages.length? (
                    messages.map((message, index) => (
                        <div
                            key={index}
                        >
                            <span className={message.userId===userInfo._id?'user':'receiver'}>{message.messages}</span>
                        </div>
                    ))
                ) : (
                    <p>No messages yet</p>
                )} */}
            </div>
                {typing}
            <form onSubmit={send_message}>
            <input type='text' className='input' name='message'/>
        {/*addding file later  */}
            <button className='send-btn' type='submit'>Send</button>
            </form>
        </div>

    );
}
}

export default Conversation;
