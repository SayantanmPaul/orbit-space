import { useEffect, useState } from "react";
import { useAppStore } from "@/(store)/App";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ArrowUpFromLine } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

const initialLocalVideoSource = [
  "/lofi/Cozy House Rainy Day.mp4",
  "/lofi/Lofi boy with cat.mov",
  "/lofi/steam-autumn-sale-2024-moewalls-com.mp4",
  "/lofi/Lofi Boy Wallpaper.mp4"
];

export function WallpaperSelection() {
  const setSource = useAppStore(state => state.setSource);
  const source = useAppStore(state => state.source);
  const [localVideoSource, setLocalVideoSource] = useState(initialLocalVideoSource);

  // useEffect(() => {
  //   const cachedVideos = localStorage.getItem("localVideoSource");
  //   if (cachedVideos) {
  //     setLocalVideoSource(JSON.parse(cachedVideos));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("localVideoSource", JSON.stringify(localVideoSource));
  // }, [localVideoSource]);

  const handleClick = (source: string) => {
    setSource(source);
  };

  // const handleUpload = (event: any) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const fileType = file.type;
  //     const validFileTypes = ["video/mp4", "video/quicktime"];
  //     if (validFileTypes.includes(fileType)) {
  //       const url = URL.createObjectURL(file);
  //       setLocalVideoSource(prev => {
  //         const updatedSources = [...prev, url];
  //         localStorage.setItem("localVideoSource", JSON.stringify(updatedSources));
  //         return updatedSources;
  //       });
  //     } else {
  //       toast.error("Invalid file format. Please upload an mp4/mov file.");
  //     }
  //   }

  return (
    <ScrollArea className="z-10 max-h-96 overflow-scroll overflow-x-hidden rounded-md bg-black/40 ml-4 mb-4 scroll-smooth backdrop-blur-xl">
      <div className="flex flex-col w-max gap-4 p-4 items-center relative">
        {localVideoSource.map((video, i) => (
          <div
            onClick={() => handleClick(video)}
            key={i}
            className={`w-full h-full hover:ring-1 hover:ring-yellow-300 rounded-md overflow-hidden duration-300 relative ${video === source && 'ring-1 ring-yellow-300 backdrop-brightness-50'}`}>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="object-fill max-w-[302px] w-[360px] lg:max-w-[360px] lg:h-48 h-40"
            >
              <source src={video} />
            </video>
            {video === source && (
              <div className="bg-gradient-to-b from-black/70 to-transparent h-32 w-full overflow-hidden absolute top-0" />
            )}
            {video === source && (
              <Image
                src={'/galaxy.gif'}
                alt="galaxy"
                width={100}
                height={100}
                className="absolute top-3 right-3 w-8 h-8"
              />
            )}
          </div>
        ))}
        {/* <label htmlFor="upload-video" className="w-full cursor-pointer">
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

        </label> */}

      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
}

