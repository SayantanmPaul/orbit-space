"use client";
import { useAppStore } from "@/(store)/App";
import AudioNoiseControls from "@/components/AudioNoiseControls";
import ClockCard from "@/components/ClockCard";
import FullScreenView from "@/components/FullScreenView";
import QuoteCard from "@/components/QuoteCard";
import SettingsJSX from "@/components/settings";
import SpotifyEmbeadJSX from "@/components/SpotifyEmbead";
import SpotifyLoginJSX from "@/components/SpotifyLogin";
import { ToggleHide } from "@/components/ToggleHideSettings";
import UserProfileJSX from "@/components/UserProfile";
import Videoplayer from "@/components/videoplayer";
import { CircleAlert, Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const ref = useRef(null);

  const { data: session, status } = useSession();
  const setSource = useAppStore((state) => state.setSource);
  const setUser = useAppStore((state) => state.setUser);

  const source = useAppStore((state) => state.source);
  const user = useAppStore((state) => state.user);
  const currentPlayList = useAppStore((state) => state.playList);

  const hideTime = useAppStore((state) => state.hideTime);
  const hideQuote = useAppStore((state) => state.hideQuote);

  const hideSettings = useAppStore((state) => state.hideAllSettings);

  const [toastShown, setToastShown] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);

  useEffect(() => {
    const isFirstVisit = !localStorage.getItem("sourceSet");
    if (isFirstVisit) {
      setSource("/lofi/lofi-cozy-house-rainy-day-moewalls-com.mp4");
      localStorage.setItem("sourceSet", "true");
    }
  }, [setSource]);

  useEffect(() => {
    if (status === "authenticated" && session) {
      setUser({
        name: session.user?.name || "",
        email: session.user?.email || "",
      });
    }
  }, [status, session, setUser]);

  // toast card for information
  useEffect(() => {
    const isFirstVisit = !localStorage.getItem("sourceNotification");
    if (status === "unauthenticated" && !toastShown && isFirstVisit) {
      const toastId = toast(
        <div className="relative">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-lg"></div>
          <div className="relative flex flex-col gap-2 p-3 bg-transparent text-white z-10">
            <div className="flex flex-row gap-2 items-center">
              <p className="text-sm font-semibold font-base">A Short Note</p>
              <CircleAlert strokeWidth={3} className="w-4 h-4" />
            </div>
            <p className="text-[13px] tracking-normal dark">
              This app does not store your information or uploaded content. Note
              that your content may reset when the cache is cleared.
            </p>
            <button
              className="w-fit text-black font-semibold font-base text-xs bg-white px-4 py-1 mt-2"
              onClick={() => toast.dismiss(toastId)}
            >
              Okay, got it
            </button>
          </div>
        </div>,
        {
          unstyled: true,
          style: {
            background: "transparent",
          },
          duration: Infinity,
        }
      );
      setToastShown(true);
      localStorage.setItem("sourceNotification", "true");
    }
  }, [status, toastShown]);

  const LoaderScreenJSX = () => (
    <div className="w-full max-h-screen flex items-center justify-center dark ">
      <div
        className="overflow-hidden w-full h-[100vh] object-cover relative"
        id="container"
      >
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-4 flex-col ">
          <Image
            src={"/meteorite.gif"}
            width={500}
            height={500}
            alt="loading"
            draggable={false}
            className="w-24 h-24 object-cover "
            priority
            unoptimized
          />
          <div className="flex flex-row gap-2 items-center">
            <p className="lg:text-lg text-base text-nowrap font-semibold font-base ">
              Loading up your space
            </p>
            <Loader
              strokeWidth={3}
              className="animate-spin lg:w-5 lg:h-5 w-4 h-4"
            />
          </div>
        </span>
      </div>
    </div>
  );

  const ContainerViewJSX = () => (
    <div
      ref={ref}
      className="w-full h-full overflow-hidden relative"
      id="container"
    >
      <div
        className="overflow-hidden w-full h-[100vh] object-cover relative"
        id="container"
      >
        <Videoplayer
          source={source}
          onLoading={() => setVideoLoading(true)}
          onLoaded={() => setVideoLoading(false)}
        />
      </div>
      <span className="absolute top-4 right-4 hidden lg:block md:block">
        <span className="flex flex-row gap-4">
          <ToggleHide disabled={!user.name} />
          <FullScreenView />
        </span>
      </span>
      {status === "unauthenticated" && (
        <span className="absolute lg:bottom-4 lg:left-4 md:right-4 lg:-translate-x-0  bottom-4 left-1/2 transform -translate-x-1/2 w-full px-4 lg:px-0">
          <SpotifyLoginJSX />
        </span>
      )}
      {status === "authenticated" && !hideSettings && (
        <span className="absolute bottom-4 left-4">
          <span className="flex flex-row lg:gap-4 gap-2">
            <UserProfileJSX />
            <SettingsJSX />
          </span>
        </span>
      )}
      <>
        <span className="absolute right-4 top-4 lg:top-auto lg:bottom-4 lg:right-4">
          <AudioNoiseControls disabled={!user.name} hide={hideSettings} />
        </span>
        <span className={!user.name || hideSettings ? "hidden " : "block"}>
          <SpotifyEmbeadJSX
            playlistLink={
              currentPlayList && currentPlayList.length > 0
                ? currentPlayList
                : "https://open.spotify.com/embed/playlist/0iepisLXvVe5RxB3owHjlj?utm_source=generator"
            }
            disabled={!user.name}
            hideIcon={hideSettings}
          />
        </span>
      </>
      <span className=" absolute top-4 left-4">
        <ClockCard hide={hideTime} references={ref} />
      </span>
      <span className={`absolute left-4 ${hideTime ? "top-4" : "top-48"}`}>
        <QuoteCard hide={hideQuote} references={ref} />
      </span>
    </div>
  );

  const showLoader = status === "loading" || videoLoading;

  return (
    <div className="w-full max-h-screen overflow-hidden relative ">
      <div
        className={` transition-opacity w-full h-full duration-1000 ${
          showLoader ? "opacity-100" : "opacity-0"
        }`}
      >
        {showLoader && <LoaderScreenJSX />}
      </div>
      <div
        className={` transition-opacity w-full h-full duration-1000 ${
          showLoader ? "opacity-0" : "opacity-100"
        }`}
      >
        <ContainerViewJSX />
      </div>
    </div>
  );
}
