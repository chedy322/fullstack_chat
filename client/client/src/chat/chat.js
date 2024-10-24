import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './chat.css';
import Chatfield from '../component/chat/Chatfield';
import Room from '../rooms/Room';

function Chat() {
    const [chats, setChats] = useState([]);
    const [openchat, setOpenchat] = useState(false);
    const [loading, setLoading] = useState(true);
    const [chatDetail, setChatdetail] = useState(null);
    const [chat_type, setChat_type] = useState("");

    let [searchParams, setSearchParams] = useSearchParams();
    
    const searching = (e) => {
      e.preventDefault();
      setSearchParams({ name: e.target.value });
    }

    useEffect(() => {
        const chat_search = async () => {
            try {
                const response = await fetch(`http://localhost:3500/chat?name=${searchParams.get('name')}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setChats(data.chat); // Update state with the fetched data
                setLoading(false);
            } catch (err) {
                console.log('Error fetching chats:', err);
            }
        };

        chat_search(); // Call the async function
    }, [searchParams]);
console.log(chatDetail)
    if (loading) return <h1>Loading.....</h1>;

    return (
        <div className='container1'>
            <div className='left-side'>
                <div className='left-side-header'>
                    <h2>Chat</h2>
                    <input type='text' onChange={searching} />
                </div>
                {searchParams.get('name') && <span>Result: {searchParams.get('name')}</span>}
                <div className='left-side-body'>
                    <Room setChatdetail={setChatdetail} setOpenchat={setOpenchat} setChat_type={setChat_type} chat_type={chat_type}/>
                    {
                        chats.map((chat) => {
                            // Check if receiver exists
                            const receiver = chat.receiver || {};
                            return (
                                <div
                                    className='single-coponent'
                                    key={chat._id}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setChat_type("chat")
                                        setChatdetail(chat);
                                        setOpenchat(true);
                                    }}
                                >
                                    <div className='single-coponent-image'>
                                        <span>
                                            <img
                                                src={receiver.avatar || '/default-avatar.png'} // Use a default avatar if none exists
                                                alt={receiver.username || 'Avatar'}
                                            />
                                        </span>
                                    </div>
                                    <div className='single-coponent-text'>
                                        <h1>{receiver.username || 'Unknown User'}</h1>
                                        <h4>{chat.last_message || 'No messages yet'}</h4>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            {
                !openchat ? <h1>Open Chat now and keep in touch with Friends</h1> :
                <Chatfield chatDetail={chatDetail} chat_type={chat_type}/>
            }
        </div>
    );
}

export default Chat;
