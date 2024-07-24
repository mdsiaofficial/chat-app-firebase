import React from 'react'
import avatar from '../../../../public/avatar.png';
import more from '../../../../public/more.png';
import video from '../../../../public/video.png';
import edit from '../../../../public/edit.png';
const UserInfo = () => {
  return (
    <div className='userInfo p-[20px] flex items-center justify-between bg-[#36388bc9] bg-opacity-50 backdrop-blur-md  rounded-lg text-white'>
      
      <div className="user flex items-center gap-4">
        <img className='w-12 h-12 rounded-full object-cover' src={avatar} alt="" />
        <h2 className=''>{ `Ashiq` }</h2>
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