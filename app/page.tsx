"use client"
import { useAppStore } from "@/(store)/App";
import FullScreenView from "@/components/FullScreenView";
import SettingsJSX from "@/components/settings";
import SpotifyEmbeadJSX from "@/components/SpotifyEmbead";
import SpotifyLoginJSX, { SpotifyLoginCardSkeleton } from "@/components/SpotifyLogin";
import UserProfileJSX from "@/components/UserProfile";
import Videoplayer from "@/components/videoplayer";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
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
      if (user.name) {
        toast.success(`Hi ${user.name}, you're logged in successfully`)
      }
    }
  }, [status, session, setUser]);

  return (
    <div className="w-full h-full overflow-hidden relative" id="container">
      <div className='overflow-hidden w-full h-[100vh] object-cover relative' id='container'>
        <Videoplayer source={source} />
      </div>
      <span className="hidden lg:block md:block">
        <FullScreenView />
      </span>
      {status === 'loading' &&
        <span className="absolute bottom-4 left-4">
          <SpotifyLoginCardSkeleton />
        </span>
      }
      {status === 'unauthenticated' &&
        <span className="absolute bottom-4 left-4">
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

      <span className="">
        {/* handleClickOutSide */}
        <SpotifyEmbeadJSX disabled={user.email ? false : true} />
      </span>
    </div>
  )
}