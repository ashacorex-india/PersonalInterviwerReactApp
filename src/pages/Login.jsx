import React, { useState } from 'react'
import '../styles/Registration.css'
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();

    const localStorageUserData = localStorage.getItem("user");
    const user = JSON.parse(localStorageUserData);

    if(email === user.basicDetails.email && password === user.basicDetails.password){
      alert("Login Successfull");
      navigate("/home");
    }else {
      alert("Invalid Credentials");
    }
  }
  return (
    <div className='registration-container'>
       {/* left side */}
      <div className='registration-left'>
        <div className='left-content'>
          <h1>Welcome Back to Personal Interviwer</h1>
          <p>Login yourself </p>
        </div>
      </div>

      {/* Right side */}
      <div className='registration-right'>
          <form onSubmit={handleLogin}>
            <h2>Student Login</h2>
            <p>Please fill Credentials</p>
            <div className='form-group'>
                <label>Email</label>
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter your email address'
                  required
                />
            </div>

            <div className='form-group'>
                <label>Password</label>
                <input
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Enter your mobile number'
                  required
                />
            </div>

            <button type='submit'>
              Login Now
            </button>
          </form>
          <Link to={"/registration"}><button>Registration</button></Link>
      </div>
    </div>
  )
}

export default Login