"use client"
import FullScreenView from "@/components/FullScreenView";
import SettingsJSX from "@/components/settings";
import Videoplayer from "@/components/videoplayer";
// import Image from "next/image";

export default function Page() {
  return (
    <div className="w-full h-screen overflow-hidden relative" id="container">
      <Videoplayer />
      <span className="hidden lg:block md:block">
        <FullScreenView />
      </span>
      <span className="absolute bottom-4 left-4">
        <SettingsJSX />
      </span>
    </div>
  )
}