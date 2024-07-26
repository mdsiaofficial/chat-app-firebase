import { avatar } from '../../../../assets/Images'
import './AddUser.css'
import React from 'react'

const AddUser = () => {

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const { username } = formData.get("username");

    try {
      
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='addUser duration-700 transition-all'>
      <form action="" onSubmit={handleSearch}>

        <input type="text" placeholder='Username' name='username' className='p-2 border-2 border-gray-300 rounded-md flex-1 bg-gray-800 border-none outline-none'/>
        <button className='p-2 bg-[#292929c4] hover:bg-[#47478096] border-none rounded-md cursor-pointer'>Search</button>
      </form>

      <div className="user mt-12 flex items-center justify-between">
        <div className="detail flex items-center gap-5">
          <img src={avatar} alt="" className='w-12 h-12 rounded-xl' />
          <span>{`Chester`}</span>
        </div>
        <button className='p-2 bg-[#4d7e43c4] hover:bg-[#66d6b596] text-black border-none rounded-md cursor-pointer'>Add User</button>
      </div>
    </div>
  )
}

export default AddUser