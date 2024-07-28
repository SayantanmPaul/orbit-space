import { useEffect, useRef } from 'react';
import '/app/globals.css';
import ReactPlayer from 'react-player'
import dynamic from "next/dynamic";

const Videoplayer = ({
  source,
  className,
  onLoading,
  onLoaded
}: {
  source: string,
  className?: string,
  onLoading?: () => void,
  onLoaded?: () => void
}) => {
  const playerRef = useRef<ReactPlayer>(null);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.seekTo(0); // Optional: reset the video to the beginning
    }
  }, [source]);

  return (
    <div className={`player-wrapper ${className}`}>
      <ReactPlayer
        ref={playerRef}
        url={source}
        key={source}
        playing
        loop
        muted
        width="100%"
        height="100%"
        className="react-player"
        controls={false}
      />
    </div>
  );
}
//prevent hydration error
export default dynamic(() => Promise.resolve(Videoplayer), { ssr: false });
