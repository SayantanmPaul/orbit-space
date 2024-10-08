import React, { useCallback, useEffect, useState } from 'react';
import { useAppStore } from "@/(store)/App";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ArrowUpFromLine, Loader2, Trash, Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

export const localVideoSource = [
  "/lofi/lofi-cozy-house-rainy-day-moewalls-com.mp4",
  "/lofi/steam-autumn-sale-2024-moewalls-com.mp4",
  "/lofi/shou-relaxing-flower-field-the-secret-world-of-arrietty-moewalls-com (1).mp4",
  "/lofi/lofi-boy-chilling-with-cat-moewalls-com.mp4",
  "/lofi/lofi-furries-night-camping-moewalls-com (1).mp4",
  "/lofi/lofi-girl.mp4",
  "/lofi/train-station-rainy-day-moewalls-com (1).mp4",
]

const WallpaperSelection = () => {

  const {source, setSource, isUploaded, setIsUploaded, videoSources, setVideoSources } = useAppStore();

  const [videoUrls, setvideoUrls] = useState<string[]>([...localVideoSource]);
  const [loadingStates, setLoadingStates] = useState<boolean[]>(Array(localVideoSource.length).fill(false));

  const handleClick = useCallback((source: string) => {
    setSource(source);
  }, [setSource]);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      const updatedSources = [...videoSources, videoUrl];
      const updatedIsUploaded = [...isUploaded, true];
      const updatedLoadingStates = [...loadingStates, true];

      setvideoUrls(updatedSources);
      setVideoSources(updatedSources);
      setIsUploaded(updatedIsUploaded);
      // setSource(videoUrl);
      setLoadingStates(updatedLoadingStates);
    }
  }

  const handleRemove = (index: number) => {
    const updatedSources = videoSources.filter((_, i) => i !== index);
    const updatedIsUploaded = isUploaded.filter((_, i) => i !== index);
    const updatedLoadingStates = loadingStates.filter((_, i) => i !== index);
    setvideoUrls(updatedSources);
    setVideoSources(updatedSources);
    setIsUploaded(updatedIsUploaded);
    setLoadingStates(updatedLoadingStates);
    setSource(videoUrls[1]);
  }

  const handleVideoLoaded = (index: number) => {
    const updatedLoadingStates = [...loadingStates];
    updatedLoadingStates[index] = false;
    setLoadingStates(updatedLoadingStates);
  }

  return (
    <ScrollArea className=" z-10 max-h-96 overflow-scroll overflow-x-hidden rounded-lg bg-black/60 ml-4 mb-4 scroll-smooth backdrop-blur-xl">
      <div className="flex flex-col w-max gap-4 p-4 items-center relative ">
        {videoSources.map((video, i) => (
          <div
            onClick={() => handleClick(video)}
            key={i}
            className={`w-full h-full hover:ring-1 hover:ring-yellow-300 rounded-md overflow-hidden duration-300 relative ${video === source && 'ring-1 ring-yellow-300 backdrop-brightness-50'}`}>
            <video
              autoPlay={false}
              muted
              onLoadedData={() => handleVideoLoaded(i)}
              className={`object-fill w-[360px] max-w-[360px] h-48`}
            >
              <source src={video} />
            </video>
            {loadingStates[i] && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <Loader2 className="w-8 h-8 animate-spin text-white" />
              </div>
            )}
            {video === source &&
              <div className="bg-gradient-to-b from-black/70 to-transparent h-32 w-full overflow-hidden absolute top-0">
              </div>
            }
            {video === source &&
              <Image
                src={'/galaxy.gif'}
                alt="galaxy"
                width={50}
                height={50}
                className="absolute top-3 right-3 w-8 h-8"
                unoptimized
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