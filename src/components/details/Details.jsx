import React from 'react'
import './Details.css'
import { arrowDown, arrowUp, avatar, download, pexels } from '../../assets/Images'
import { auth, db } from '../../lib/firebase'
import { useChatStore } from '../../lib/chatStore'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'


const Details = () => {
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } = useChatStore();
  const { currentUser } = useChatStore();
  const handleBlock = async () => {
    if (!user) return;
    const userDocRef = doc(db, "users", currentUser.id)

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='details md2:flex-1 text-white'>

      <div className="user px-5 py-4 flex flex-col items-center gap-5 border-b-2 border-[gray]">
        <img src={user?.avatar || avatar} alt="" className='w-[100px] h-[100px] rounded-full object-cover' />
        <h2>{user?.username}</h2>
        <p>{`Lorem ipsum dolor, sit `}</p>
      </div>

      <div className="info p-5 flex flex-col gap-6">

        {/* opt */}
        <div className="option">
          <div className="title">
            <span>{`Chat Settings`}</span>
            <img src={arrowUp} alt="" className='' />
          </div>
        </div>

        {/* opt */}
        <div className="option">
          <div className="title ">
            <span>{`Shared Media`}</span>
            <img src={arrowDown} alt="" className='' />
          </div>
          <div className="photos mt-4">

            {/* items */}
            <div className="photoItem">
              <div className="photoDetails">

                <img src={pexels} alt="" />
                <span>{`photo_2024_2.png`}</span>

              </div>
              <img src={download} alt="" className='downBtn' />
            </div>

            {/* items */}
            <div className="photoItem">
              <div className="photoDetails">

                <img src={pexels} alt="" />
                <span>{`photo_2024_2.png`}</span>

              </div>
              <img src={download} alt="" className='downBtn' />
            </div>

            {/* items */}
            <div className="photoItem">
              <div className="photoDetails">

                <img src={pexels} alt="" />
                <span>{`photo_2024_2.png`}</span>

              </div>
              <img src={download} alt="" className='downBtn' />
            </div>

            {/* items */}
            <div className="photoItem">
              <div className="photoDetails">

                <img src={pexels} alt="" />
                <span>{`photo_2024_2.png`}</span>

              </div>
              <img src={download} alt="" className='downBtn' />
            </div>

          </div>
        </div>

        {/* opt */}
        <div className="option">
          <div className="title">
            <span>{`Shared Files`}</span>
            <img src={arrowUp} alt="" className='' />
          </div>
        </div>

        {/* opt */}
        <div className="option">
          <div className="title">
            <span>{`Privcy & Security`}</span>
            <img src={arrowUp} alt="" className='' />
          </div>
        </div>

        <button
          className='py-3 bg-[crimson] hover:bg-red-400 border-none rounded-md cursor-pointer'
          onClick={handleBlock}
        >
          {
            isCurrentUserBlocked
              ? `You are Blocked`
              : isReceiverBlocked
                ? "User Blocked"
                : `Block User`
          }
        </button>

        <button className='py-3 bg-[#3f14dc52] hover:bg-[#0000ff] border-none rounded-md cursor-pointer' onClick={() => auth.signOut()}>Log Out</button>

      </div>

    </div>
  )
}

export default Details