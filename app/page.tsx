"use client"
import { useAppStore } from "@/(store)/App";
import FullScreenView from "@/components/FullScreenView";
import SettingsJSX from "@/components/settings";
import Videoplayer from "@/components/videoplayer";
import { useEffect } from "react";
// import Image from "next/image";

export default function Page() {
  const setSource = useAppStore(state => state.setSource)

  useEffect(() => {
    //check for cookies exist
    const isFirstVisit = !localStorage.getItem('sourceSet');
    if (isFirstVisit) {
      setSource('/lofi/lofi-boy-chilling-with-cat-moewalls-com.mp4');
      localStorage.setItem('sourceSet', 'true');
    }
  }, [setSource]);

  const source = useAppStore(state => state.source)
  return (
    <div className="w-full h-full overflow-hidden relative" id="container">
      <div className='overflow-hidden w-full h-[100vh] object-cover relative' id='container'>
        <Videoplayer source={source} />
      </div>
      <span className="hidden lg:block md:block">
        <FullScreenView />
      </span>
      <span className="absolute bottom-4 left-4">
        <SettingsJSX />
      </span>
    </div>
  )
}
