import './Notification.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import React from 'react'

const Notification = () => {
  return (
    <div className='noti'>
      <ToastContainer position='bottom-right' className={`text-black`}/>
    </div>
  )
}

export default Notification