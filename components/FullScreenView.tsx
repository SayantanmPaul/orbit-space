import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import classNames from "classnames";
import { Maximize, Minimize } from "lucide-react";
import { useEffect, useState } from "react";

const FullScreenView = ({ hide }: { hide?: boolean }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreenView = () => {
    const isFullScreen = document.fullscreenElement;
    const element = document.getElementById("container");
    if (!isFullScreen) {
      element?.requestFullscreen();
    } else document.exitFullscreen();
    setIsFullScreen(!isFullScreen);
  };

  const tooltipClass = classNames({
    "font-base text-xs bg-black/70 border-none backdrop-blur-sm m-2 text-white":
      true,
  });

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <button
            onClick={toggleFullScreenView}
            aria-label="Toggle Full Screen"
            className={`bg-black/20 backdrop-blur-sm rounded-lg group w-12 h-12 flex items-center justify-center cursor-pointer  ${
              hide ? "hidden" : "block"
            }`}
          >
            {!isFullScreen ? (
              <Maximize
                size={18}
                className="text-white group-hover:scale-110 duration-300 w-5 h-5"
              />
            ) : (
              <Minimize
                size={18}
                className="text-white group-hover:scale-110 duration-300 w-5 h-5"
              />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent className={tooltipClass}>
          {!isFullScreen ? "Maximize" : "Minimize"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default FullScreenView;
