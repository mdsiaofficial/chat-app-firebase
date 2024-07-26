import React, { useEffect, useRef, useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import './Chat.css'
import { avatar, camera, emoji, img, info, mic, pexels, phone, video } from '../../assets/Images'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { useChatStore } from '../../lib/chatStore'



const Chat = () => {
  const [openEmoji, setOpenEmoji] = useState(false);
  const [text, setText] = useState('');
  const [chat, setChat] = useState();

  const { chatId } = useChatStore();

  console.log(text);

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  })


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

  return (
    <div className='chat md2:flex-[2_2_0%] flex flex-col text-white'>

      <div className="top p-5 flex items-center justify-between ">
        <div className="user flex items-center gap-5">
          <img src={avatar} alt="" className='w-14 h-14 rounded-full object-cover' />
          <div className="texts flex flex-col gap-1">
            <span className='text-[1.1rem] font-bold'>{`Fariha`}</span>
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

        {/* messages here */}
        <div className="message ">
          <img src={avatar} alt="" className='avatar' />
          <div className="texts">
            <p> {`Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, accusantium aliquid vitae dolor similique architecto maiores quis delectus ad cum, voluptatibus minus necessitatibus ullam illum inventore sed doloremque saepe odio.`}</p>

            <span>1 min ago</span>
          </div>
        </div>

        <div className="message  own">
          <img src={avatar} alt="" className=' avatar own' />
          <div className="texts">
            <img src={pexels} alt="" />
            <p> {`Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, accusantium aliquid vitae dolor similique architecto maiores quis delectus ad cum, voluptatibus minus necessitatibus ullam illum inventore sed doloremque saepe odio.`}</p>

            <span>1 min ago</span>
          </div>
        </div>

        <div className="message">
          <img src={avatar} alt="" className='avatar' />
          <div className="texts">
            <img src={pexels} alt="" />
            <p> {`Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, accusantium aliquid vitae dolor similique architecto maiores quis delectus ad cum, voluptatibus minus necessitatibus ullam illum inventore sed doloremque saepe odio.`}</p>

            <span>1 min ago</span>
          </div>
        </div>

        <div className="message own">
          <img src={avatar} alt="" className=' avatar own' />
          <div className="texts">
            <img src={pexels} alt="" />
            <p> {`Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, accusantium aliquid vitae dolor similique architecto maiores quis delectus ad cum, voluptatibus minus necessitatibus ullam illum inventore sed doloremque saepe odio.`}</p>

            <span>1 min ago</span>
          </div>
        </div>

        <div className="message ">
          <img src={avatar} alt="" className='avatar' />
          <div className="texts">
            <img src={pexels} alt="" />
            <p> {`Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, accusantium aliquid vitae dolor similique architecto maiores quis delectus ad cum, voluptatibus minus necessitatibus ullam illum inventore sed doloremque saepe odio.`}</p>

            <span>1 min ago</span>
          </div>
        </div>

        <div className="message  own">
          <img src={avatar} alt="" className=' avatar own' />
          <div className="texts">
            <p> {`Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, accusantium aliquid vitae dolor similique architecto maiores quis delectus ad cum, voluptatibus minus necessitatibus ullam illum inventore sed doloremque saepe odio.`}</p>

            <span>1 min ago</span>
          </div>
        </div>

        <div className="message">
          <img src={avatar} alt="" className='avatar' />
          <div className="texts">
            <p> {`Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, accusantium aliquid vitae dolor similique architecto maiores quis delectus ad cum, voluptatibus minus necessitatibus ullam illum inventore sed doloremque saepe odio.`}</p>

            <span>1 min ago</span>
          </div>
        </div>

        <div className="message own">
          <img src={avatar} alt="" className=' avatar own' />
          <div className="texts">
            <img src={pexels} alt="" />
            <p> {`Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, accusantium aliquid vitae dolor similique architecto maiores quis delectus ad cum, voluptatibus minus necessitatibus ullam illum inventore sed doloremque saepe odio.`}</p>

            <span>1 min ago</span>
          </div>
        </div>

        {/* messages here */}

        <div className="" ref={endRef}></div>
      </div>

      <div className="bottom p-5 flex items-center justify-between gap-4 mt-auto ">

        <div className="icons flex gap-5">
          <img src={img} alt="" className='w-5 h-5 cursor-pointer' />
          <img src={camera} alt="" className='w-5 h-5 cursor-pointer' />
          <img src={mic} alt="" className='w-5 h-5 cursor-pointer' />

        </div>

        <input type="text" placeholder='Type your message...' className='p-2 border-2 border-gray-300 rounded-md flex-1 bg-gray-800 border-none outline-none' onChange={(e) => setText(e.target.value)} value={text} />

        <div className="emoji relative icons flex gap-5">
          <img src={emoji} alt="" className='w-5 h-5 cursor-pointer' onClick={() => setOpenEmoji((prev) => !prev)} />
          <div className="picker absolute bottom-12 right-0">
            <EmojiPicker open={openEmoji} onEmojiClick={handleEmoji} />
          </div>
        </div>

        <button className='sendButton w-fit p-2 rounded-xl bg-purple-700 cursor-pointer'>Send</button>
      </div>
    </div>
  )
}

export default Chat