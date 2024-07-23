"use client"
import { useAppStore } from "@/(store)/App";
import FullScreenView from "@/components/FullScreenView";
import SettingsJSX from "@/components/settings";
import Videoplayer from "@/components/videoplayer";
// import Image from "next/image";

export default function Page() {
  const source = useAppStore(state => state.source)
  const setSource = useAppStore(state => state.setSource)

  console.log(source);

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
