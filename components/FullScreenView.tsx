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
        <Toggle onClick={toggleFullScreenView} variant="outline" aria-label="Toggle italic" className={`bg-black/20 backdrop-blur-sm rounded-lg group w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-black/20 ${hide ? 'hidden': 'block'}`}>
            {!isFullScreen ?
                <Maximize size={18} className='text-white group-hover:scale-110 duration-300 ' /> :
                <Minimize size={18} className='text-white group-hover:scale-110 duration-300' />
            }
        </Toggle>
    )
}

export default FullScreenView
