import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './register.css'
function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: ""
  });
const[navigate,setNavigate]=useState(false)
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

async function handleSubmit(e) {
e.preventDefault();
try {
  const response = await fetch('http://localhost:3500/register', {
    method: 'POST',
    credentials: "include",
    body: JSON.stringify({...form}),
    headers: { 'Content-Type': 'application/json' }
  });
  console.log(response)
  // if()
  if(response.status===201){
    setNavigate(true)
  }
} catch (err) {
  console.log(err);
}
}
if(navigate){
return <Navigate to="/login"/>
}

  return (
    <div>
    <div className="container">
      <form method='POST' onSubmit={handleSubmit} className="form">
        <div className={`form_front`}>
        <div className="form_details">Sign Up</div>
        <input
          type="text"
          name="username"
          className="input"
          placeholder="username"
          value={form.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          className="input"
          placeholder="email"
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
        {/* <input
          type="password"
          name="confirmPassword"
          className="input"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
        /> */}
        <button type="submit" className="btn">Sign Up</button>
        <span className="switch">Already have an account? 
          <Link to={'/login'}>
          <label htmlFor="signup_toggle" className="signup_tog">
            Sign In
          </label>
          </Link>
        </span>
  </div>
    </form>
  </div>
  </div>
  );
}

export default Register;
