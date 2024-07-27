import React, { useState } from 'react';
import { AiFillSpotify } from 'react-icons/ai';
import { Toggle } from './ui/toggle';
import { Button } from './ui/button';
import { useAppStore } from '@/(store)/App';

const SpotifyEmbedJSX = ({ disabled }: { disabled?: boolean }) => {

    const hide = useAppStore(state => state.hideCard)
    const setHide = useAppStore(state => state.setHideCard)

    return (
        <div className='w-full h-full'>
            <Button disabled={disabled} onClick={() => setHide(!hide)} className='absolute bottom-4 right-4 bg-black/20 backdrop-blur-sm rounded-lg group w-11 h-11 flex items-center justify-center cursor-pointer hover:bg-black/20'>
                <AiFillSpotify size={20} className='text-white group-hover:scale-110 duration-300 min-w-6 min-h-6 ' />
            </Button>
            {!disabled &&
                <div className={`absolute bottom-16 right-4 w-96 max-h-[560px] overflow-hidden rounded-xl transition-opacity duration-500 ${hide ? 'opacity-0 ' : 'opacity-100'}`} id="embed-iframe">
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
            }
        </div>
    )
}

export default SpotifyEmbedJSX;
