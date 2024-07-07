import React from 'react'
import ReactPlayer from 'react-player'

const Videoplayer = () => {
    return (
        <div className='overflow-hidden w-full h-[100vh]'>
            <ReactPlayer
                url={'/lofi/lofi-boy-chilling-with-cat-moewalls-com.mp4'}
                loop={true}
                playing={true}
                controls={false}
                muted={true}
                width={`100%`}
                height={`auto`}
                style={{ overflow: 'hidden' }}
            />
        </div>
    )
}

export default Videoplayer
