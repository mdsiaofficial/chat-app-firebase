import React from 'react'
import avatar from '../../../../public/avatar.png';
import more from '../../../../public/more.png';
import video from '../../../../public/video.png';
import edit from '../../../../public/edit.png';
const UserInfo = () => {
  return (
    <div className='userInfo p-[20px] flex items-center justify-between '>
      
      <div className="user">
        <img src={avatar} alt="" />
      </div>

      <div className="icons">
        <img src={more} alt="" />
        <img src={video} alt="" />
        <img src={edit} alt="" />
      </div>
    
    </div>
  )
}

export default UserInfo