import React, { createContext, useEffect, useState } from 'react'
export const contextTheme=createContext()

export default function Context_theme({children}) {
    const [userInfo,setUserInfo]=useState(
        JSON.parse(localStorage.getItem("token"))||null 
    )
    // console.log(userInfo)
    function updateUser(data){
        setUserInfo(data)
    }
useEffect(()=>{
    localStorage.setItem('token',JSON.stringify(userInfo))
},[userInfo])
  return (
    <contextTheme.Provider value={{userInfo,updateUser}}>
        {children}
    </contextTheme.Provider>
  )
}


