import './Login.css'
import React, { useState } from 'react'
import { avatar } from '../../assets/Images'
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import upload from '../../lib/upload';


const Login = () => {

  const [avatarImage, setAvatarImage] = useState({
    file: null,
    url: ""
  });

  const [loading, setLoading] = useState(false);

  // avatar
  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatarImage({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      })
    }
  };

  // login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // form theke event niye form data collect 
    const formData = new FormData(e.target)
    // destructure the data from the form data
    const { email, password } = Object.fromEntries(formData);
    
    try {

      await signInWithEmailAndPassword(auth, email, password);
      toast.success("HELLO");

    } catch (error) {
      // console.error(error);
      toast.error(error.message);

    } finally {
      setLoading(false);
    }
  };

  // register
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    // form theke event niye form data collect 
    const formData = new FormData(e.target)
    // destructure the data from the form data
    const { username, email, password } = Object.fromEntries(formData);
    console.log(username);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res.user.uid);
      const imgUrl = await upload(avatarImage.file);
      console.log(imgUrl);
      // creating new table/doc of new-user
      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        avatar: imgUrl,
        id: res.user.uid,
        blocked: [],
      });

      // creating new table/doc of new-users-chat
      await setDoc(doc(db, "userChats", res.user.uid), {
        chats: [],
      });

      // notification of sign up successful
      toast.success("Account created Succesfully!");

    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className='w-[100%] h-[100%] flex flex-col md:flex-row gap-10 items-center justify-evenly'>

      <div className="login flex">

        {/* login */}
        <div className="item flex flex-col text-white">
        <h2 className='text-4xl'>Sign In</h2>

          <h2>Welcom back</h2>
          <form action="" onSubmit={handleLogin}>

            <input type="text" placeholder='Email' name='email' />
            <input type="password" placeholder='Password' name='password' />
            <button type='submit' disabled={loading}>{loading ? "Loading" : "Sign In"}</button>
          </form>
        </div>

      </div>
      <div className="separator h-[80%] w-[3px] bg-slate-500"></div>

      <div className="signup">
        {/* sign up */}
        <div className="item flex flex-col text-white">
          <h2 className='text-4xl'>Create an Account</h2>
          <form action="" onSubmit={handleRegister}>

            <label htmlFor="file" className='flex justify-center items-center'>
              <img src={avatarImage.url || avatar} alt="" className='h-12' />
              Upload Avatar
            </label>

            <input type="file" name='file' id='file' style={{ display: 'none' }} onChange={handleAvatar} />
            <input type="text" placeholder='Username' name='username' />
            <input type="text" placeholder='Email' name='email' />
            <input type="password" placeholder='Password' name='password' />
            <button type='submit' disabled={loading}>{loading ? "Loading" : "Sign Up"}</button>
          </form>
        </div>
      </div>


    </div>
  )
}

export default Login