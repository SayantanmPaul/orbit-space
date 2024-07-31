import React, { useCallback, useEffect, useRef } from 'react';
import { AiFillSpotify } from 'react-icons/ai';
import { Button } from './ui/button';
import { useAppStore } from '@/(store)/App';

const SpotifyEmbedJSX = React.memo(function SpotifyEmbedJSX(
    {
        disabled,
        playlistLink = 'https://open.spotify.com/embed/playlist/6ERjveQi38OO1Zi4hO9qCy?utm_source=generator&theme=0',
    }: {
        disabled?: boolean,
        playlistLink?: string 
    }) {
    const hide = useAppStore(state => state.hideCard);
    const setHide = useAppStore(state => state.setHideCard);
    const stateRef = useRef<HTMLDivElement | null>(null)

    //outside mouseEvent hide the iframe, so that no overflow in mobile view
    const handleButtonClick = useCallback(() => {
        setHide(!hide);
    }, [hide, setHide]);

    const handleClickOutSide = ((event: MouseEvent) => {
        if (stateRef.current && !stateRef.current.contains(event.target as Node)) {
            setHide(true);
        }
    })

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutSide);
        return () => {
            document.removeEventListener('mousedown', handleClickOutSide);
        };
    });


    return (
        <div ref={stateRef} className='w-full h-full'>
            <Button
                disabled={disabled}
                onClick={handleButtonClick}
                className='absolute bottom-4 lg:right-36 right-4 bg-black/20 backdrop-blur-sm rounded-lg group w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-black/20'>
                <AiFillSpotify size={20} className='text-white group-hover:scale-110 duration-300 min-w-6 min-h-6 ' />
            </Button>
            {!disabled &&
                <div className={`absolute bottom-20 right-4 lg:w-96 w-80 max-h-[560px] overflow-hidden rounded-xl transition-opacity duration-500 z-10 ${hide ? 'opacity-0 h-0' : 'opacity-100'}`} id="embed-iframe">
                    <iframe
                        className=''
                        src={playlistLink}
                        width="100%"
                        height="520"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen picture-in-picture"
                        loading="lazy">
                    </iframe>
                </div>
            }
        </div>
    );
});

export default SpotifyEmbedJSX;
