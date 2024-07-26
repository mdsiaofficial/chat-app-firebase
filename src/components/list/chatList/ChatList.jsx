import React, { useEffect, useState } from 'react'
import './ChatList.css';
import { arrowDown, arrowUp, avatar, bg, camera, download, edit, emoji, favicon, img, info, mic, minus, more, phone, plus, search, theme, video } from '../../../assets/Images';
import AddUser from './addUser/AddUser';
import { useUserStore } from './../../../lib/userStore'
import { db } from '../../../lib/firebase';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';

const ChatList = () => {

  const [addMode, setAddMode] = useState(false);
  const { currentUser } = useUserStore();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "userChats", currentUser.id), async (res) => {
      // console.log("Current data: ", doc.data());
      // setChats(doc.data());
      const items = res.data().chats;

      const promises = items.map(async (item) => {
        const userDocRef = doc(db, "users", item.receiverId);
        const userDocSnap = await getDoc(userDocRef);

        const user = userDocSnap.data();

        return { ...item, user };
      });

      const chatData = await Promise.all(promises);

      setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));


    });

    return (() => {
      unSub();
    });
  }, [currentUser.id]);
  console.log(chats);
  return (
    <div className='chatList flex-1 no-scrollbar overflow-scroll p-3 text-white'>
      <div className="search flex items-center gap-5 p-5 ">
        <div className="searchBar p-2 flex-1 bg-gray-800 flex items-center gap-5 rounded-lg  ">
          <img src={search} alt="" className='w-5 h-5' />
          <input type="text" placeholder='search' className='bg-transparent border-none outline-none text-white flex-1' />
        </div>

        <img src={addMode ? minus : plus} alt="" className='w-8 h-8 p-1 rounded-lg bg-gray-800 cursor-pointer duration-500 transition-all' onClick={() => setAddMode((prev) => !prev)} />
      </div>

      {chats.map((chat) => (
        <div className="item" key={chat.chatId}>
        <img src={avatar} alt="" />
        <div className="texts">
          <span>{`Ashiq`}</span>
          <p>{chat.lastMessage}</p>
        </div>
      </div>
      ))}
      


      <div className='duration-500 transition-all'>
        {addMode && <AddUser />}

      </div>
    </div>
  )
}

export default ChatList