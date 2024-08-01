import React, { useCallback, useEffect, useState } from 'react';
import { useAppStore } from "@/(store)/App";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ArrowUpFromLine, Trash, Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

export const localVideoSource = [
  "/lofi/lofi-cozy-house-rainy-day-moewalls-com.mp4",
  "/lofi/steam-autumn-sale-2024-moewalls-com.mp4",
  "/lofi/lofi-boy-chilling-with-cat-moewalls-com.mp4",
]

const WallpaperSelection = () => {
  const setSource = useAppStore(state => state.setSource)
  const source = useAppStore(state => state.source)

  const [videoSources, setVideoSources] = useState<string[]>([...localVideoSource])
  const setIsUploaded = useAppStore(state => state.setIsUploaded)
  const isUploaded = useAppStore(state => state.isUploaded)

  const videoURls = useAppStore((state) => state.videoSources)
  const setVideoURls = useAppStore((state) => state.setVideoSources)

  const handleClick = useCallback((source: string) => {
    setSource(source);
  }, [setSource]);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      const updatedSources = [...videoSources, videoUrl];
      const updatedIsUploaded = [...isUploaded, true];
      setVideoSources(updatedSources);
      setVideoURls(updatedSources);
      setIsUploaded(updatedIsUploaded);
      // setSource(videoUrl);
    }
  }

  const handleRemove = (index: number) => {
    const updatedSources = videoSources.filter((_, i) => i !== index);
    const updatedIsUploaded = isUploaded.filter((_, i) => i !== index);
    if (videoSources[index] === source) {
      setSource(localVideoSource[0]);
    }
    setVideoSources(updatedSources);
    setVideoURls(updatedSources);
    setIsUploaded(updatedIsUploaded);
  }

  useEffect(() => {
    const resetURls = () => {
      setVideoURls([...localVideoSource]),
        setSource('/lofi/lofi-cozy-house-rainy-day-moewalls-com.mp4')
    }
    window.addEventListener('beforeunload' ,resetURls)
    return () => {
      window.removeEventListener('beforeunload', resetURls)
    }
  }, [setVideoURls, setSource])

  return (
    <ScrollArea className=" z-10 max-h-96 overflow-scroll overflow-x-hidden rounded-md bg-black/40 ml-4 mb-4 scroll-smooth backdrop-blur-xl">
      <div className="flex flex-col w-max gap-4 p-4 items-center relative ">
        {videoURls.map((video, i) => (
          <div
            onClick={() => handleClick(video)}
            key={i}
            className={`w-full h-full hover:ring-1 hover:ring-yellow-300 rounded-md overflow-hidden duration-300 relative ${video === source && 'ring-1 ring-yellow-300 backdrop-brightness-50'}`}>
            <video
              autoPlay
              loop
              muted
              playsInline
              className={`object-fill w-[360px] max-w-[360px] h-48`}
            >
              <source src={video} />
            </video>
            {video === source &&
              <div className="bg-gradient-to-b from-black/70 to-transparent h-32 w-full overflow-hidden absolute top-0">
              </div>
            }
            {video === source &&
              <Image
                src={'/galaxy.gif'}
                alt="galaxy"
                width={100}
                height={100}
                className="absolute top-3 right-3 w-8 h-8"
              />
            }
            {isUploaded[i] &&
              <button
                className="absolute top-3 left-3 w-8 h-8 bg-rose-500 rounded-md items-center justify-center flex cursor-pointer"
                onClick={() => handleRemove(i)}
              >
                <Trash2 strokeWidth={2.5} className="w-4 h-4 text-white" />
              </button>
            }
          </div>
        ))}
        <label htmlFor="upload-video" className="w-full cursor-pointer">
          <input
            type="file"
            id="upload-video"
            accept="video/mp4,video/quicktime"
            className="hidden"
            onChange={handleUpload}
          />
          <span className="w-full font-semibold font-base inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm  ring-offset-background transition-colors bg-white py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            upload custom video
            <ArrowUpFromLine strokeWidth={3} absoluteStrokeWidth className="ml-2 w-3 h-3" />
          </span>
        </label>
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
}

export default WallpaperSelection;
