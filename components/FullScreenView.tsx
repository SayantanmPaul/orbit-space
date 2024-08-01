import React, { useState } from 'react'
import { Toggle } from './ui/toggle'
import { Maximize, Minimize } from 'lucide-react'

const FullScreenView = ({ hide }: { hide?: boolean }) => {
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
        <button onClick={toggleFullScreenView} className={`bg-black/20 backdrop-blur-sm rounded-lg group w-12 h-12 flex items-center justify-center cursor-pointer  ${hide ? 'hidden': 'block'}`}>
            {!isFullScreen ?
                <Maximize size={18} className='text-white group-hover:scale-110 duration-300 w-5 h-5' /> :
                <Minimize size={18} className='text-white group-hover:scale-110 duration-300 w-5 h-5' />
            }
        </button>
    )
}

export default FullScreenView
