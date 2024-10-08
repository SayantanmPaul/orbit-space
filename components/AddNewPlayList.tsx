import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import z from 'zod';
import { useAppStore } from '@/(store)/App';
import '../app/globals.css'

// check for playlist url validity
const playlistSchema = z.object({
    url: z.string().url().startsWith('https://open.spotify.com/playlist/', {
        message: 'url is not valid, please try again later.'
    })
});

// playlist link fromat for iframe
const formatPlaylistUrl = (url: string) => {
    const urlParts = url.split('?')[0].split('/');
    const playlistId = urlParts[urlParts.length - 1];
    return `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator`;
};

const AddNewPlayList = () => {
    const setPlayList = useAppStore(state => state.setPlayList);
    const currentPlayList = useAppStore(state => state.playList)
    const setHide = useAppStore(state => state.setHideCard);
    const hide = useAppStore(state => state.hideCard);

    const [playlistUrl, setPlaylistUrl] = useState(currentPlayList);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setLoading(true);

        const res = playlistSchema.safeParse({ url: playlistUrl });
        if (!res.success) {
            setError(res.error.errors[0].message);
            setLoading(false);
        } else {
            setError('');
            const formattedUrl = formatPlaylistUrl(playlistUrl);
            setPlayList(formattedUrl)
            setHide(!hide);
            setLoading(false);
        }
    };

    return (
        <div className=" bg-black/20 flex flex-col gap-4 dark text-white p-4 scroll-smooth rounded-md lg:w-96 w-full">
            <div className="space-y-2">
                <h4 className="font-medium leading-none font-base">Add custom playlist</h4>
                <p className="text-xs text-muted-foreground">
                    Don&apos;t know how to get the link of a playlist?
                    {" "}
                    <a className='text-violet-400 underline-offset-4' href='https://mashable.com/article/spotify-share-playlist-how-to'>
                        learn more</a>
                </p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col w-full">
                    <Input
                        id="width"
                        className="col-span-2 h-10 rounded-none"
                        placeholder='https://open.spotify.com/playlist/...'
                        value={playlistUrl}
                        onChange={(e) => setPlaylistUrl(e.target.value)}
                    />
                    {error && <p className="text-rose-500 text-xs font-base ml-3 mt-2">{error}</p>}
                    <div className='w-full flex justify-end'>
                        <Button type='submit' className='w-full  max-w-24 rounded-none h-8 mt-3' disabled={loading}>
                            {loading ? 'Adding...' : 'Add'}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddNewPlayList;
