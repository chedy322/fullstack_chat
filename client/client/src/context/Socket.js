import { createContext, useContext, useEffect, useState} from "react";
import { io } from 'socket.io-client';
import UserInfo from "../Profile/UserInfo";
import { contextTheme } from "./context";
export const socket_Theme=createContext();


export default function Socket_provider({children}){
    const[socket,setSocket]=useState()
    const{userInfo}=useContext(contextTheme)
    console.log(socket)
    // establishing connection
    useEffect(()=>{
        setSocket(io('http://localhost:3100'))
    },[])
    useEffect(()=>{
        userInfo&&socket?.emit('new_user',userInfo)?.on('greeting',(data)=>{
            // change this to greeting page
            alert(`${data} ${userInfo.username}`)
        })
        // alert()
    },[socket,userInfo])

    return(
        <socket_Theme.Provider value={{socket}}>
            {children}
        </socket_Theme.Provider>

    )

}

