import React, { useState } from 'react'
import './ChatList.css';
import { arrowDown, arrowUp, avatar, bg, camera, download, edit, emoji, favicon, img, info, mic, minus, more, phone, plus, search, theme, video } from '../../../assets/Images';

const ChatList = () => {

  const [addMode, setAddMode] = useState(false);

  return (
    <div className='chatList flex-1 no-scrollbar overflow-scroll p-3'>
      <div className="search flex items-center gap-5 p-5 ">
        <div className="searchBar p-2 flex-1 bg-gray-800 flex items-center gap-5 rounded-lg  ">
          <img src={search} alt="" className='w-5 h-5' />
          <input type="text" placeholder='search' className='bg-transparent border-none outline-none text-white flex-1' />
        </div>

        <img src={addMode ? plus : minus} alt="" className='w-8 h-8 p-1 rounded-lg bg-gray-800 cursor-pointer' onClick={ (e) => setAddMode((prev)=> !prev)} />
      </div>

      <div className="item">
        <img src={avatar} alt="" />
        <div className="texts">
          <span>{`Ashiq`}</span>
          <p>{`kire koi asos tui?`}</p>
        </div>
      </div>

      <div className="item">
        <img src={avatar} alt="" />
        <div className="texts">
          <span>{`Ashiq`}</span>
          <p>{`kire koi asos tui?`}</p>
        </div>
      </div>

      <div className="item">
        <img src={avatar} alt="" />
        <div className="texts">
          <span>{`Ashiq`}</span>
          <p>{`kire koi asos tui?`}</p>
        </div>
      </div>

      <div className="item">
        <img src={avatar} alt="" />
        <div className="texts">
          <span>{`Ashiq`}</span>
          <p>{`kire koi asos tui?`}</p>
        </div>
      </div>

      <div className="item">
        <img src={avatar} alt="" />
        <div className="texts">
          <span>{`Ashiq`}</span>
          <p>{`kire koi asos tui?`}</p>
        </div>
      </div>

      <div className="item">
        <img src={avatar} alt="" />
        <div className="texts">
          <span>{`Ashiq`}</span>
          <p>{`kire koi asos tui?`}</p>
        </div>
      </div>

      <div className="item">
        <img src={avatar} alt="" />
        <div className="texts">
          <span>{`Ashiq`}</span>
          <p>{`kire koi asos tui?`}</p>
        </div>
      </div>

      <div className="item">
        <img src={avatar} alt="" />
        <div className="texts">
          <span>{`Ashiq`}</span>
          <p>{`kire koi asos tui?`}</p>
        </div>
      </div>

    </div>
  )
}

export default ChatList