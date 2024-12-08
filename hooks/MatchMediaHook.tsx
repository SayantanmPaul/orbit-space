import React, { useEffect, useState } from "react";

const useMatchMediaHook = ({
  mediaquery,
  initValue,
}: {
  mediaquery: string;
  initValue: boolean;
}) => {
  const [isMatching, setIsMatching] = useState(initValue);

  useEffect(() => {
    //matchMedia instance based on the media query
    const watcher = window.matchMedia(mediaquery);
    setIsMatching(watcher.matches);

    //listener to update state on media query change
    const listener = (e: MediaQueryListEvent) => {
      setIsMatching(e.matches);
    };

    if (watcher.addEventListener) {
      watcher.addEventListener("change", listener);
    } else {
      watcher.addListener(listener);
    }

    return () => {
      if (watcher.removeEventListener) {
        return watcher.removeEventListener("change", listener);
      } else {
        return watcher.addListener(listener);
      }
    };
  }, [mediaquery]);

  return isMatching;
};

export default useMatchMediaHook;
