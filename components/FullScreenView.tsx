import React, { useState } from 'react'
import { Toggle } from './ui/toggle'
import { Maximize, Minimize } from 'lucide-react'

const FullScreenView = () => {
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
        <span className='absolute top-4 right-4 bg-black/20 hover:bg-black/30 backdrop-blur-lg rounded-lg group w-11 h-11'>
            <Toggle onClick={toggleFullScreenView} variant="outline" aria-label="Toggle italic" className='w-full h-full'>
                {!isFullScreen ?
                    <Maximize size={18} className='text-white group-hover:scale-110 duration-300 ' /> :
                    <Minimize size={18} className='text-white group-hover:scale-110 duration-300' />
                }
            </Toggle>
        </span>
    )
}

export default FullScreenView
