import React from 'react'
import './Details.css'
import { arrowDown, arrowUp, avatar, download, pexels } from '../../assets/Images'


const Details = () => {
  return (
    <div className='details md2:flex-1'>

      <div className="user px-5 py-4 flex flex-col items-center gap-5 border-b-2 border-[gray]">
        <img src={avatar} alt="" className='w-[100px] h-[100px] rounded-full object-cover'/>
        <h2>{`Ashiq `}</h2>
        <p>{`Lorem ipsum dolor, sit `}</p>
      </div>

      <div className="info p-5 flex flex-col gap-7">

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
          <div className="photos">

            {/* items */}
            <div className="photoItem">
              <div className="photoDetails">

                <img src={pexels} alt="" />
                <span>{`photo_2024_2.png`}</span>
              
              </div>
              <img src={download} alt="" className='downBtn'/>
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


        {/* opt */}
        <button>Block User</button>


      </div>

    </div>
  )
}

export default Details