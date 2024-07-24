import './Login.css'
import React, { useState } from 'react'
import { avatar } from '../../assets/Images'
import { toast } from 'react-toastify';

const Login = () => {

  const [avatarImage, setAvatarImage] = useState({
    file: null,
    url: ""
  });
  const handleAvatar = (e) => {

    if (e.target.files[0]) {
      setAvatarImage({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      })
    }

  }

  const handleLogin = (e) => {
    e.preventDefault()
    toast.warn("HELLO")
  }
  return (
    <div className='w-[100%] h-[100%] flex gap-10 items-center justify-evenly'>

      <div className="login flexc">

        {/* login */}
        <div className="item flex flex-col text-white">
          <h2>Welcom back, </h2>
          <form action="" onSubmit={handleLogin}>

            <input type="text" placeholder='Email' name='email' />
            <input type="password" placeholder='Password' name='password' />
            <button type='submit'>Sign In</button>
          </form>
        </div>

      </div>
      <div className="separator h-[80%] w-[3px] bg-slate-500"></div>

      <div className="signup">
        {/* sign up */}
        <div className="item flex flex-col text-white">
          <h2>Create an Account</h2>
          <form action="">

            <label htmlFor="file" className='flex justify-center items-center'>
              <img src={avatarImage.url || avatar} alt="" className='h-12' />
              Upload Avatar
            </label>
            <input type="file" name='file' id='file' style={{ display: 'none' }} onChange={handleAvatar} />
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