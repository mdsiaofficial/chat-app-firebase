import React from 'react'
import { avatar, edit, more, video } from '../../../assets/Images';
import { useUserStore } from '../../../lib/userStore';
const UserInfo = () => {

  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  return (
    <div className='userInfo p-[20px] flex items-center justify-between bg-[#36388bc9] bg-opacity-50 backdrop-blur-md  rounded-lg text-white'>
      
      <div className="user flex items-center gap-4">
        <img className='w-12 h-12 rounded-full object-cover' src={currentUser.avatar || avatar} alt="" />
        <h2 className=''>{ currentUser.username}</h2>
      </div>

      <div className="icons flex gap-4">
        <img src={more} alt="" className='w-4 h-4 '/>
        <img src={video} alt="" className='w-4 h-4 '/>
        <img src={edit} alt="" className='w-4 h-4 '/>
      </div>
    
    </div>
  )
}

export default UserInfo