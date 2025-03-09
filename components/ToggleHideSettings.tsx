import { Eye, EyeOff } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useAppStore } from "@/(store)/App";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import classNames from "classnames";

export function ToggleHide({ disabled }: { disabled: boolean }) {
  const hideSettings = useAppStore((state) => state.hideAllSettings);
  const setHideSettings = useAppStore((state) => state.setHideAllSettings);
  const user = useAppStore((state) => state.user);

  const [loading, setLoading] = useState(true);

  const handleHideSettings = () => {
    setHideSettings(!hideSettings);
  };

  useEffect(() => {
    if (!user.name) setHideSettings(false);
    setLoading(false);
  }, [user.name, setHideSettings]);

  const tooltipClass = classNames({
    "font-base text-xs bg-black/70 border-none backdrop-blur-sm m-2 text-white":
      true,
  });

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Toggle
            disabled={disabled}
            onClick={handleHideSettings}
            variant="outline"
            aria-label="Toggle italic"
            className="bg-black/20 backdrop-blur-sm rounded-lg group w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-black/20 data-[state=on]:bg-primary/20"
          >
            {!hideSettings ? (
              <Eye
                size={20}
                className="text-white group-hover:scale-110 duration-300 w-5 h-5"
              />
            ) : (
              <EyeOff
                size={20}
                className="text-white group-hover:scale-110 duration-300 w-5 h-5"
              />
            )}
            {loading && <Skeleton className="w-10 h-10 rounded-lg" />}
          </Toggle>
        </TooltipTrigger>
        <TooltipContent className={tooltipClass}>
          {!hideSettings ? "Hide options" : "Show options"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
