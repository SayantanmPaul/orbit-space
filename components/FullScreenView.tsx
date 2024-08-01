import React, { useState } from 'react'
import { Maximize, Minimize } from 'lucide-react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import classNames from 'classnames'

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

    const tooltipClass = classNames({
        "font-base text-xs bg-black/70 border-none backdrop-blur-sm m-2 text-white": true
    })
    
    return (
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button onClick={toggleFullScreenView} className={`bg-black/20 backdrop-blur-sm rounded-lg group w-12 h-12 flex items-center justify-center cursor-pointer  ${hide ? 'hidden' : 'block'}`}>
                        {!isFullScreen ?
                            <Maximize size={18} className='text-white group-hover:scale-110 duration-300 w-5 h-5' /> :
                            <Minimize size={18} className='text-white group-hover:scale-110 duration-300 w-5 h-5' />
                        }
                    </button>
                </TooltipTrigger>
                <TooltipContent className={tooltipClass}>
                    {!isFullScreen ? 'Maximize' : 'Minimize'}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default FullScreenView
