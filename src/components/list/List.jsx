import React from 'react'
import UserInfo from './userInfo/UserInfo'
import ChatList from './chatList/ChatList'

const List = () => {
  return (
    <div className='md2:flex-1'>
      
      <UserInfo />
      <ChatList />
      
    
    </div>
  )
}

export default List