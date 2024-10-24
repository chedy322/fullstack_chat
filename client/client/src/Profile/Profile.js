import UserInfo from "./UserInfo"
import './Profile.css'
import { useContext, useEffect, useState } from "react"
import { contextTheme } from "../context/context"
import { Link, Navigate, useLoaderData } from "react-router-dom"

const Profile=()=>{
    const {updateUser}=useContext(contextTheme)
    const [redirect,setRedirect]=useState(false)
    const result=useLoaderData()
    console.log(result)
    // useEffect(()=>{
    //   async function searching(){
    //     const response=await fetch('http://localhost:3500/user/userinfo',{
    //       method:'GET',
    //       credentials:'include',
    //       headers: { 'Content-Type': 'application/json' }
    //   })
    //   if(!response.ok){
    //       console.log('some')
    //       throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    //   }
    //   const result=await response.json()
    //   console.log(result)
    //   // if(result==='unauthorized'){
    //   //     updateUser('')
    //   // }
    //   return result
    //   }
    //   searching()
    // },[])
  const logout=async ()=>{
    try{
      const response=await fetch('http://localhost:3500/logout',{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        credentials:'include'
      })
      if(response.status===200){
        updateUser(null)
        alert("you are logged out")
        setRedirect(true)

      }
      
    }catch(err){
      console.log(err)
    }
  }
  const Delete=async ()=>{
    try{
      const response=await fetch('http://localhost:3500/user',{
        method:"DELETE",
        headers:{'Content-Type':'application/json'},
        credentials:'include'
      })
      if(response.status===200){
        updateUser(null)
        alert("user deleted")
        setRedirect(true)
      }

    }
    catch(err){
      console.log(err)
    }
  }
  // ||result==='unauthorized'
if(redirect ||!result){
    return <Navigate to='/login'/>
}
  return(
        <div className="profile">
        <h1>Profile</h1>
        <div className="Upper">
            <div className="name">
                    <img src=""/>
                    {/* <h2>{result.existing_user.username}</h2> */}
            </div>
                <div className='configuration'>
                    <div className='edit div'>
                        <button>
                          <a href='/auth/form'>Edit Profile</a>
                          </button>
                    </div>
                    <div className='delete div '>
                        <button onClick={Delete}>Delete Profile</button>
                    </div>
                    <div className='logout div'>
                        <button onClick={logout}>Logout</button>
                    </div>
            </div>
        </div>
        {
          !result.following || !result?<h1>Please fill the form to match other students:
            <Link to={'/auth/form'}>
            <a href="/form">form</a>
            </Link>
          </h1>:
          <div className="Info">
          <UserInfo 
dateOfBirth={result.existing_user.profile.dateOfBirth}
gender={result.existing_user.profile.gender}
bio={result.existing_user.profile.bio}
hobbies={result.existing_user.profile.hobbies}
favoriteBooks={result.existing_user.profile.favoriteBooks}
country={result.existing_user.profile.country}
city={result.existing_user.profile.city}
state={result.existing_user.profile.state}
languagesSpoken={result.existing_user.profile.languagesSpoken}
favoriteMovies={result.existing_user.profile.favoriteMovies}
contactNumber={result.existing_user.profile.contactNumber}/>


      </div>

          
        }
        {/* <div className="Info">
            <UserInfo 
dateOfBirth={result.existing_user.profile.dateOfBirth}
gender={result.existing_user.profile.gender}
bio={result.existing_user.profile.bio}
hobbies={result.existing_user.profile.hobbies}
favoriteBooks={result.existing_user.profile.favoriteBooks}
country={result.existing_user.profile.country}
city={result.existing_user.profile.city}
  state={result.existing_user.profile.state}
  languagesSpoken={result.existing_user.profile.languagesSpoken}
  favoriteMovies={result.existing_user.profile.favoriteMovies}
  contactNumber={result.existing_user.profile.contactNumber}/>


        </div> */}
        </div>
    )

}




export default Profile




