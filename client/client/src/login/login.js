import React, { useContext, useEffect, useState } from 'react';
//  Assuming you have some CSS for your styles
import './login.css'
import { Link, Navigate } from 'react-router-dom';
import { contextTheme } from '../context/context';
const LoginSignupForm = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
const[redirect,setRedirect]=useState(false)
const {userInfo,updateUser}=useContext(contextTheme)
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response=await fetch('http://localhost:3500/login', {
          method: 'POST',
          credentials: "include",
          body: JSON.stringify({...form}),
          headers: { 'Content-Type': 'application/json' }
    })
    console.log(response)
    const result=await response.json()
    if(response.status!==201){
      alert(result.message)
    }
    if (response.status===201) {
      updateUser(result)
      setRedirect(true)
  }
    }catch(err){
      alert(err)
      console.log(err)
    }
  }
  if(redirect){
    return <Navigate to='/auth/chat'/>
  }
  return (
    <div>
    <div className="container">
      <form className="form" onSubmit={handleSubmit} method='POST'>
        <div className={`form_front`}>
          <div className="form_details">Login</div>
          <input
            type="text"
            name="email"
            className="input"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <button type="submit" className="btn">Login</button>
          <span className="switch">Don't have an account? 
            <Link to={'/register'}>
            <label htmlFor="signup_toggle" className="signup_tog">
              Sign Up
            </label>
            </Link>
        <div id="g-signin2"></div>
        {/* <div class="g-signin2" data-onsuccess="onSignIn"></div> */}
          </span>
        </div>
       
      </form>
    </div>
    </div>
  );
};

export default LoginSignupForm;
