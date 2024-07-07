// @ts-ignore
import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import { Toggle } from "@/components/ui/toggle"
import '/app/globals.css'
import { Maximize, Minimize } from 'lucide-react'

const Videoplayer = () => {
    const [isFullScreen, setIsFullScreen] = useState(false)

    const toggleFullScreenView = () => {
        const isFullScreen = document.fullscreenElement;
        const element = document.getElementById("container")
        if (!isFullScreen) {
            element?.requestFullscreen()
        }
        else document.exitFullscreen();
        setIsFullScreen(!isFullScreen)
    }
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
            <span className='absolute top-4 right-4 bg-black/20 hover:bg-black/30 backdrop-blur-lg rounded-lg'>
                <Toggle onClick={toggleFullScreenView} variant="outline" aria-label="Toggle italic">
                    {!isFullScreen ? 
                        <Maximize size={18} className='text-white ' /> :
                        <Minimize size={18} className='text-white ' />
                    }
                </Toggle>
            </span>
        </div>
    )
}

export default Videoplayer
