import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { ControlBar, Player, PlayerReference } from "video-react";
import "video-react/dist/video-react.css";
import "/app/globals.css";

const Videoplayer = ({
  source,
  className,
}: {
  source: string;
  className?: string;
}) => {
  const playerRef = useRef<PlayerReference>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    return () => clearTimeout(timer);
  }, [source]);

  // loop play
  const handleVideoEnd = () => {
    if (playerRef.current) {
      playerRef.current.seek(0);
      playerRef.current.play();
    }
  };

  return (
    <div className={`player-wrapper ${className} bg-[#021526]`}>
      <style>
        {`
          .video-react .video-react-spinner {
            display: none !important;
          }
        `}
      </style>
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={source}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Player
              playsInline
              autoPlay
              ref={playerRef}
              src={source}
              fluid={true}
              preload="auto"
              muted={true}
              onEnded={handleVideoEnd}
            >
              <ControlBar disableCompletely={true} />
            </Player>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
//prevent hydration error
export default dynamic(() => Promise.resolve(Videoplayer), { ssr: false });
