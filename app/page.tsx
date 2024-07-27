"use client"
import { useAppStore } from "@/(store)/App";
import FullScreenView from "@/components/FullScreenView";
import SettingsJSX from "@/components/settings";
import SpotifyEmbeadJSX from "@/components/SpotifyEmbead";
import SpotifyLoginJSX, { SpotifyLoginCardSkeleton } from "@/components/SpotifyLogin";
import UserProfileJSX from "@/components/UserProfile";
import Videoplayer from "@/components/videoplayer";
import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useCallback, useEffect } from "react";
import { toast } from "sonner"

// import Image from "next/image";

export default function Page() {
  const { data: session, status } = useSession();
  const setSource = useAppStore(state => state.setSource)
  const setUser = useAppStore(state => state.setUser)

  const source = useAppStore(state => state.source)
  const user = useAppStore(state => state.user)

  useEffect(() => {
    //check for cookies exist
    const isFirstVisit = !localStorage.getItem('sourceSet');
    if (isFirstVisit) {
      setSource('/lofi/lofi-boy-chilling-with-cat-moewalls-com.mp4');
      localStorage.setItem('sourceSet', 'true');
    }
  }, [setSource]);

  //setUser when the user signed in 
  useEffect(() => {
    if (status === 'authenticated' && session) {
      setUser({
        name: session.user?.name || '',
        email: session.user?.email || ''
      });
    }
  }, [status, session, setUser]);

  const LoaderScreenJSX = () => {
    return (
      <div className="w-full h-screen flex items-center justify-center dark ">
        <div className="overflow-hidden w-full h-[100vh] object-cover relative" id="container">
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-4 flex-col ">
            <Image
              src={'/meteorite.gif'}
              width={500}
              height={500}
              alt="loading"
              className="w-24 h-24 object-cover "
            />
            <div className="flex flex-row gap-2 items-center">
              <p className="text-lg font-semibold font-base ">Loading up your space</p>
              <Loader strokeWidth={3} className="animate-spin w-5 h-5" />
            </div>
          </span>
        </div>
      </div>
    )
  }

  const ContainerViewJSX = () => {
    return (
      <div className="w-full h-full overflow-hidden relative" id="container">
        <div className='overflow-hidden w-full h-[100vh] object-cover relative ' id='container'>
          <Videoplayer source={source} />
        </div>
        <span className="hidden lg:block md:block">
          <FullScreenView />
        </span>
        {status === 'unauthenticated' &&
          <span className="absolute lg:bottom-4 lg:left-4 md:right-4 lg:-translate-x-0  bottom-4 left-1/2 transform -translate-x-1/2 w-min">
            <SpotifyLoginJSX />
          </span>
        }
        {status === 'authenticated' &&
          <>
            <span className="absolute bottom-4 left-4">
              <UserProfileJSX />
            </span>
            <span className="absolute bottom-4 left-20">
              <SettingsJSX />
            </span>
          </>

        }

        <span className={!user.name ? 'hidden lg:block' : 'block'}>
          {/* handleClickOutSide */}
          <SpotifyEmbeadJSX disabled={user.name ? false : true} />
        </span>
      </div>
    )
  }

  return (
    <div className="w-full h-full overflow-hidden relative ">
      <div className={` transition-opacity duration-1000 ${status==="loading" ? "opacity-100" : "opacity-0"}`}>
        {status=== 'loading' && <LoaderScreenJSX />}
      </div>
      <div className={` transition-opacity duration-1000 ${status==='loading' ? "opacity-0" : "opacity-100"}`}>
        <ContainerViewJSX />
      </div>
    </div>
  )
}