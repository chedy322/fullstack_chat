import React, { useContext } from 'react'
import Navbar from '../component/navbar/navbar'
import { Navigate, Outlet } from 'react-router-dom'
import Context_theme, { contextTheme } from '../context/context'
// public route
export default function Layout() {
  return (
    <div>
        <Navbar/>
        <Outlet/>
      
    </div>
  )
}

export function Auth(){
    // check auth with context
    const {userInfo}=useContext(contextTheme)
    console.log(userInfo)
    if(userInfo===null ||!userInfo){
       return <Navigate to={'/login'}/>
    }
    return (
        <div>
            <Navbar/>
            <Outlet/>
        </div>
    )
}