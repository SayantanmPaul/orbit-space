import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { PlayerReference } from "video-react";
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

  return (
    <div className={`player-wrapper ${className}`}>
      <motion.div
        key={source}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <video
          className="video-player"
          src={source}
          ref={playerRef}
          controls={false}
          autoPlay={true}
          loop={true}
          muted={true}
          playsInline={true}
          preload="auto"
        />
      </motion.div>
    </div>
  );
};
//prevent hydration error
export default dynamic(() => Promise.resolve(Videoplayer), { ssr: false });
