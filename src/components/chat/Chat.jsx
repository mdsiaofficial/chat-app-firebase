import React, { useEffect, useRef, useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import './Chat.css'
import { avatar, camera, emoji, img, info, mic, pexels, phone, video } from '../../assets/Images'
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { useChatStore } from '../../lib/chatStore'
import { useUserStore } from '../../lib/userStore'
import upload from '../../lib/upload'



const Chat = () => {
  const [openEmoji, setOpenEmoji] = useState(false);
  const [text, setText] = useState('');
  const [chat, setChat] = useState();
  const [img, setImg] = useState({
    file: null,
    url: "",
  });


  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore();
  const { currentUser } = useUserStore();

  console.log(text);

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  });


  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return (() => {
      unSub();
    });
  }, [chatId]);

  console.log(chat);

  const handleEmoji = (e) => {
    // console.log(e)
    setText((prev) => prev + e.emoji);
    // setOpenEmoji(false);
  }

  const handleSend = async () => {
    if (!text) return;

    let imgUrl = null;

    try {

      if (img.file) {
        imgUrl = await upload(img.file);
      }

      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: Date.now(),
          ...(imgUrl && { img: imgUrl }),
        })
      });

      const userIds = [currentUser.id, user.id];

      userIds.forEach(async (id) => {
        const userChatsRef = doc(db, "userChats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();
          const chatIndex = userChatsData.chats.findIndex((c) => c.chatId === chatId);

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen = ((id === currentUser.id) ? true : false);
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      })
    } catch (error) {
      console.log(error);
    }

    // setting the send box to null
    setImg({
      file: null,
      url: "",
    })
    setText("");
  }

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      })
    }
  };
  return (
    <div className='chat md2:flex-[2_2_0%] flex flex-col text-white'>

      <div className="top p-5 flex items-center justify-between ">
        <div className="user flex items-center gap-5">
          <img src={user?.avatar || avatar} alt="" className='w-14 h-14 rounded-full object-cover' />
          <div className="texts flex flex-col gap-1">
            <span className='text-[1.1rem] font-bold'>{user?.username}</span>
            <p className='text-[.8rem] font-normal opacity-60'>Lorem ipsum, dolor </p>
          </div>
        </div>

        <div className="icons flex gap-5">
          <img src={phone} alt="" className='w-5 h-5' />
          <img src={video} alt="" className='w-5 h-5' />
          <img src={info} alt="" className='w-5 h-5' />
        </div>
      </div>

      <div className="center p-5 flex-1 no-scrollbar  overflow-scroll flex flex-col gap-5">

        {/* messages */}
        {/* <div className="message ">
          <img src={avatar} alt="" className='avatar' />
          <div className="texts">
            <p> {`Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, accusantium aliquid vitae dolor similique architecto maiores quis delectus ad cum, voluptatibus minus necessitatibus ullam illum inventore sed doloremque saepe odio.`}</p>

            <span>1 min ago</span>
          </div>
        </div> */}


        {/* message own */}
        {
          chat?.messages?.map((message) => (
            <div className={message.senderId===currentUser.id? "message own": "message"} key={message.createdAt}>
              <img src={avatar} alt="" className=' avatar own' />
              <div className="texts">
                {message.img && <img src={message.img} alt="" />}
                <p> {message.text}</p>

                <span>{`1 min ago`}</span>
              </div>
            </div>
          ))
        }

        {img.url &&
          (<div className="message own">
            <div className="texts">
              <img src={img.url} alt="" />
            </div>
          </div>)
        }

        {/* scroll ref */}
        <div className="" ref={endRef}></div>
      </div>

      <div className="bottom p-5 flex items-center justify-between gap-4 mt-auto ">

        <div className="icons flex gap-5">
          <label htmlFor="file">
            <img src={`./img.png`} className='w-5 h-5 cursor-pointer' />
          </label>
          <input type="file" name='file' id='file' style={{ display: "none" }} onChange={handleImg} />
          <img src={camera} alt="" className='w-5 h-5 cursor-pointer' />
          <img src={mic} alt="" className='w-5 h-5 cursor-pointer' />

        </div>

        <input
          type="text"
          placeholder={isCurrentUserBlocked || isReceiverBlocked ? 'You cannot send message' : 'Type your message...'}
          className='p-2 border-2 border-gray-300 rounded-md flex-1 bg-gray-800 border-none outline-none disabled:cursor-not-allowed'
          onChange={(e) => setText(e.target.value)}
          value={text}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        />

        <div className="emoji relative icons flex gap-5">
          <img src={emoji} alt="" className='w-5 h-5 cursor-pointer' onClick={() => setOpenEmoji((prev) => !prev)} />
          <div className="picker absolute bottom-12 right-0">
            <EmojiPicker open={openEmoji} onEmojiClick={handleEmoji} />
          </div>
        </div>

        <button
          className='sendButton w-fit p-2 rounded-xl bg-purple-700 cursor-pointer disabled:cursor-not-allowed'
          onClick={handleSend}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default Chat