import { useContext, useEffect, useState } from "react";
// import { contextTheme } from "../context/context";
import Context_theme, { contextTheme } from '../context/context'
// import { useContext } from "react"
// import { contextTheme } from "../context/context"

export default async function ProfileLoader({req,params}){
    // const {updateUser}=useContext(contextTheme)
    let result=null
    const response=await fetch('http://localhost:3500/user/userinfo',{
        method:'GET',
        credentials:'include',
        headers: { 'Content-Type': 'application/json' }
    })
    if(!response.ok){
        return result
    }
    result=await response.json()
    // if(result==='unauthorized'){
    //     updateUser('')
    // }
    return result
}

// export default function Loader({ req, params }) {
//     const {updateUser}=useContext(contextTheme) // useContext used correctly here
//     const [result, setResult] = useState(null); // state to hold the result

//     useEffect(() => {
//         const fetchData = async () => {
//             const response = await fetch(`http://localhost:3500/user/userinfo`, {
//                 method: 'GET',
//                 credentials: 'include',
//                 headers: { 'Content-Type': 'application/json' }
//             });

//             const result = await response.json();
//             console.log(result);

//             if (result === 'unauthorized') {
//                 updateUser(null); // call updateUser if unauthorized
//             }
//             setResult(result); // set the result into state
//         };

//         fetchData(); // call the async function inside useEffect
//     }, []); // dependency array includes updateUser

//     return result // Render result or loading message
// }

// xisting_user
// : 
// createdAt
// : 
// "2024-08-06T14:25:49.797Z"
// education
// : 
// {_id: '66b232a49a1b4ea2dc48e12b', school: 'High School', grade: '12th', subjectsOfInterest: Array(2), __v: 0}
// email
// : 
// "houwa@gmail.com"
// following
// : 
// ['66ae51b20415bf6e759c0785']
// isVerified
// : 
// "false"
// password
// : 
// "$2b$10$obQvixbZBySAn.BiHdD40O95hAELhdFPdUildjr5MNbMeaVsExPAW"
// profile
// : 
// {_id: '66b232a49a1b4ea2dc48e127', dateOfBirth: '2000-01-01T00:00:00.000Z', gender: 'Male', profilePicture: 'profilepic.jpg', bio: 'A passionate student', …}
// socialLinks
// : 
// {_id: '66b232a49a1b4ea2dc48e129', facebook: 'facebook.com/johndoe', twitter: 'twitter.com/johndoe', linkedin: 'linkedin.com/in/johndoe', instagram: 'instagram.com/johndoe', …}
// updatedAt
// : 
// "2024-08-13T12:37:11.294Z"
// username
// : 
// "houwa"
// __v
// : 
// 0
// _id
// : 
// "66b2326d9a1b4ea2dc48e123"