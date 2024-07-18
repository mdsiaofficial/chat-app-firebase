import './Login.css'
import React, { useState } from 'react'

const Login = () => {

  const [avatar, setAvatar] = useState(
    {
      file: null,
      url:"",
    }
  )


  const handleAvatar = (e) => {

    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      })
    }
  }
  return (
    <div>

      <div className="login">
        <div className="item">
          <h2>Welcom back, </h2>
          <form action="">

            <input type="text" placeholder='Email' name='email' />
            <input type="password" placeholder='Password' name='password' />
            <button type='submit'>Sign In</button>
          </form>
        </div>

        <div className="separator"></div>
        <div className="item">
          <h2>Create an Account</h2>
          <form action="">

            <label htmlFor="file">
              <img  alt="" />
              Upload Avatar
            </label>
            <input type="file" name='file' id='file' style={{display:'none'}} onChange={handleAvatar}/>
            <input type="text" placeholder='Username' name='username' />
            <input type="text" placeholder='Email' name='email' />
            <input type="password" placeholder='Password' name='password' />
            <button type='submit'>Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login