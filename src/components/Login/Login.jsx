import './Login.css'
import React, { useState } from 'react'
import { avatar } from '../../assets/Images'
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import upload from '../../lib/upload';


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
    toast.success("HELLO");
  }
  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)

    const { username, email, password } = Object.fromEntries(formData);
    console.log(username);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const imgUrl = await upload(avatarImage.file);

      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        id: res.user.uid,
        blocked:[],
      });
      
      await setDoc(doc(db, "userChats", res.user.uid), {
        chats:[],
      });


      toast.success("Account created Succesfully!");


    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
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
          <form action="" onSubmit={handleRegister}>

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