
import { useAppStore } from "@/(store)/App";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ArrowUpFromLine } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

const localVideoSource = [
  "/lofi/204241-923909574.mp4",
  "/lofi/lofi-boy-chilling-with-cat-moewalls-com.mp4",
  "/lofi/lofi-cozy-house-rainy-day-moewalls-com.mp4"
]

export function WallpaperSelection() {
  const setSource = useAppStore(state => state.setSource)
  const source = useAppStore(state => state.source)

  const handleClick = (source: string) => {
    setSource(source);
  }
  return (
    <ScrollArea className=" z-10 max-h-96 overflow-scroll overflow-x-hidden rounded-md bg-black/50 ml-4 mb-4 scroll-smooth backdrop-blur-xl">
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
              className={`object-fill w-[360px] max-w-[360px] h-48`}
            >
              <source src={video} />
            </video>
            {video === source &&
              <div className="bg-gradient-to-b from-black/70 to-transparent h-32 w-full overflow-hidden absolute top-0">
              </div>
            }
            {video === source &&
              // <Orbit absoluteStrokeWidth className="absolute top-3 right-3 shadow-2xl text-yellow-300 w-5 h-5" />
              <Image
                src={'/galaxy.gif'}
                alt="galaxy"
                width={100}
                height={100}
                className="absolute top-3 right-3 w-8 h-8"
              />
            }
          </div>
        ))}
        <Button type="button" className="w-full font-medium font-base" variant="outline">
          upload custom video
          <ArrowUpFromLine strokeWidth={2} absoluteStrokeWidth className="ml-2 w-4 h-4" />
        </Button>
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
}


