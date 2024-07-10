// @ts-ignore
import React from 'react'
import '/app/globals.css'

const Videoplayer = () => {
    return (
        <div className='overflow-hidden w-full h-[100vh] object-cover relative' id='container'>
            <video
                autoPlay
                loop
                muted
                playsInline
                className='lg:w-full w-auto h-screen object-cover'
            >
                <source src='/lofi/lofi-boy-chilling-with-cat-moewalls-com.mp4' />
            </video>
        </div>
    )
}

export default Videoplayer
