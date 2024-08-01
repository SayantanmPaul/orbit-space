import { useAppStore } from '@/(store)/App';
import React, { useState } from 'react'
import { ScrollArea, ScrollBar } from './ui/scroll-area';

interface themeType {
    themeName: string,
    wallpaperURl: string,
    playlistUrl: string,
    bgAudio: number[],
}
const AvailableThemes: themeType[] = [
    {
        themeName: 'cozy home',
        wallpaperURl: '/lofi/lofi-cozy-house-rainy-day-moewalls-com.mp4',
        playlistUrl: 'https://open.spotify.com/embed/playlist/0iepisLXvVe5RxB3owHjlj?utm_source=generator',
        bgAudio: [ 0.7, 0, 0, 0.7, 0.2, 0]
    },
    {
        themeName: 'ghibli',
        wallpaperURl: '/lofi/shou-relaxing-flower-field-the-secret-world-of-arrietty-moewalls-com (1).mp4',
        playlistUrl: 'https://open.spotify.com/embed/playlist/7jiQemqr9EFtd2zlzMEQ7h?utm_source=generator',
        bgAudio: [ 0, 0, 0, 0, 0.6, 0.1]
    },
    {
        themeName: 'countryside',
        wallpaperURl: '/lofi/train-station-rainy-day-moewalls-com (1).mp4',
        playlistUrl: 'https://open.spotify.com/embed/playlist/1UAIEpILhZMPhpamN4Cn9w?utm_source=generator',
        bgAudio: [ 0.3, 0, 0.7, 0.3, 0, 0.1]
    },
    {
        themeName: 'nightowl',
        wallpaperURl: '/lofi/lofi-girl.mp4',
        playlistUrl: 'https://open.spotify.com/embed/playlist/3BGlRkrccFeOaNnG5tfR88?utm_source=generator"',
        bgAudio: [ 0.6, 0.1, 0, 1, 0, 0]
    },
]
const ThemeSelectionJSX = () => {
    const setSource = useAppStore((state) => state.setSource);
    // const source = useAppStore((state) => state.source);

    const setPlayList = useAppStore(state => state.setPlayList);
    // const currentPlayList = useAppStore(state => state.playList)

    const setHide = useAppStore(state => state.setHideCard);
    // const hide = useAppStore(state => state.hideCard);

    const selectedTheme = useAppStore((state) => state.seletedTheme)
    const setSelectedTheme = useAppStore((state) => state.setSeletedTheme)

    const setBackgroundVolumesFromTheme = useAppStore(state => state.setBackgroundVolumesFromTheme);

    const changeTheme = (theme: themeType) => {
        setSource(theme.wallpaperURl);
        setPlayList(theme.playlistUrl);
        setHide(false);
        setSelectedTheme(theme.themeName);
        setBackgroundVolumesFromTheme(theme.bgAudio)
    };

    return (
        <ScrollArea className=' flex flex-col gap-4 dark text-white p-4 scroll-smooth w-80 max-h-72 relative bg-black/30'>
            <div className="space-y-4 ">
                <h4 className="font-medium leading-none text-sm font-base">Select theme</h4>
                <div className='flex flex-col gap-2'>
                    {AvailableThemes.map((theme, index) => (
                        <div
                            onClick={() => changeTheme(theme)}
                            key={index} className='relative w-full h-full rounded-full'
                        >
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className='object-cover w-full h-16 rounded-md overflow-hidden'
                            >
                                <source src={theme.wallpaperURl} />
                            </video>
                            <div className={`absolute inset-0 flex items-center justify-center border border-white/40 hover:border-yellow-300 rounded-md duration-300 overflow-hidden bg-black/30 ${selectedTheme === theme.themeName && 'border-yellow-300'}`}>
                                <button
                                    className='p-2 text-white font-semibold font-base shadow-2xl'
                                >
                                    {theme.themeName}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ScrollBar orientation="vertical" />
        </ScrollArea>
    )
}

export default ThemeSelectionJSX
