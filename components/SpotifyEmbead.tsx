import React, { useEffect, useState } from 'react'
import { AiFillSpotify } from "react-icons/ai";
import { Button } from './ui/button';

declare global {
    interface Window {
        onSpotifyIframeApiReady: (IFrameAPI: any) => void;
    }
}

const SpotifyEmbedJSX = ({ disabled }: { disabled?: boolean }) => {
    const [isOpen, setIsOpen] = useState(false)

    const SpotifyPlayList = () => {
        return (
            <div className={`absolute bottom-16 right-4 w-96 max-h-[560px] overflow-hidden rounded-xl animate-popover ${isOpen ? '' : 'hidden'}`} id="embed-iframe">
                <iframe
                    className=''
                    src="https://open.spotify.com/embed/playlist/6ERjveQi38OO1Zi4hO9qCy?utm_source=generator&theme=0" width="100%"
                    height="520"
                    frameBorder="0"
                    allowFullScreen={true}
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy">
                </iframe>
            </div>
        )
    }

    return (
        <div className='w-full h-full'>
            <Button disabled={disabled} onClick={() => setIsOpen(!isOpen)} className='absolute bottom-4 right-4 bg-black/20 backdrop-blur-sm rounded-lg group w-11 h-11 flex items-center justify-center cursor-pointer'>
                <AiFillSpotify size={20} className='text-white group-hover:scale-105 duration-300 min-w-5 min-h-5 ' />
            </Button>
            <SpotifyPlayList />
        </div>
    )
}

export default SpotifyEmbedJSX
