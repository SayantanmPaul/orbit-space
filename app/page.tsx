"use client";
import { useAppStore } from "@/(store)/App";
import AudioNoiseControls from "@/components/AudioNoiseControls";
import ClockCard from "@/components/ClockCard";
import FullScreenView from "@/components/FullScreenView";
import Timer from "@/components/promodoro-timer/Timer";
import QuoteCard from "@/components/QuoteCard";
import RestrictedPage from "@/components/RestrictedPage";
import SettingsJSX from "@/components/settings";
import SpotifyEmbeadJSX from "@/components/SpotifyEmbead";
import SpotifyLoginJSX from "@/components/SpotifyLogin";
import Note from "@/components/sticky-notes/Note";
import { ToggleHide } from "@/components/ToggleHideSettings";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import UserProfileJSX from "@/components/UserProfile";
import Videoplayer from "@/components/videoplayer";
import useMatchMediaHook from "@/hooks/MatchMediaHook";
import { ChevronLeftIcon, Loader, NotebookIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NoteType {
  id: number;
  text: string;
  position?: { x: number; y: number };
}

//update the source video on first load
function useInitializeSource(setSource: (source: string) => void) {
  useEffect(() => {
    if (!localStorage.getItem("sourceSet")) {
      setSource("/lofi/lofi-cozy-house-rainy-day-moewalls-com.mp4");
      localStorage.setItem("sourceSet", "true");
    }
  }, [setSource]);
}

export default function Page() {
  const ref = useRef(null);

  const {
    source,
    user,
    playList: currentPlayList,
    hideTime,
    hideQuote,
    hideSettings,
    hidePomodoroCard,
    setSource,
    setUser,
    notes,
    setNotes,
  } = useAppStore((state) => ({
    source: state.source,
    user: state.user,
    playList: state.playList,
    hideTime: state.hideTime,
    hideQuote: state.hideQuote,
    hideSettings: state.hideAllSettings,
    setSource: state.setSource,
    setUser: state.setUser,
    hidePomodoroCard: state.hidePromodoroTimer,
    notes: state.stickyNotes,
    setNotes: state.setStickyNotes,
  }));

  const { data: session, status } = useSession();

  useInitializeSource(setSource);

  //set user after login
  useEffect(() => {
    if (status === "authenticated" && session) {
      setUser({
        name: session.user?.name || "",
        email: session.user?.email || "",
      });
    }
  }, [status, session, setUser]);

  //for sticky notes possition
  const determineNewNotePosition = () => {
    const maxX = window.innerWidth - 250;
    const maxY = window.innerHeight - 250;

    return {
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY),
    };
  };

  //creating and handleing sticky notes
  const handleAddNewStickyNote = useCallback(() => {
    const newNote = {
      id: Date.now(),
      text: "",
      position: determineNewNotePosition(),
    };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
  }, [notes, setNotes]);

  useEffect(() => {
    if (notes.length > 0 && notes.length === 0) {
      setNotes(
        notes.map((note: NoteType) => {
          return {
            ...note,
            position: note.position || determineNewNotePosition(),
          };
        })
      );
    }
  }, [setNotes, notes]);

  const LoaderScreenJSX = useMemo(
    () => (
      <motion.div
        key="loader"
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
        // exit={{ opacity: 0 }}
        // transition={{ duration: 0.2 }}
        className="w-full max-h-screen flex items-center justify-center dark select-none "
      >
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
      </motion.div>
    ),
    []
  );

  const ContainerViewJSX = useMemo(
    () => (
      <motion.div
        key="container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full h-full overflow-hidden relative "
        ref={ref}
        id="container"
      >
        <ContextMenu>
          <ContextMenuTrigger>
            <div
              className="overflow-hidden w-full h-[100vh] object-cover relative -z-10 bg-[#021526]"
              id="container"
            >
              <Videoplayer source={source} />
            </div>
          </ContextMenuTrigger>
          {status === "authenticated" && session && (
            <ContextMenuContent className="w-56 bg-black/50 border-white/10 backdrop-blur text-white ">
              <ContextMenuItem
                inset
                className="focus:bg-white/20 focus:text-white px-0"
              >
                <ChevronLeftIcon size={18} strokeWidth={2.2} className="mx-2" />
                Back
              </ContextMenuItem>
              <ContextMenuItem
                onClick={handleAddNewStickyNote}
                inset
                className="focus:bg-white/20 focus:text-white px-0"
              >
                <NotebookIcon size={18} strokeWidth={2} className="mx-2" />
                Add new note
              </ContextMenuItem>
            </ContextMenuContent>
          )}
        </ContextMenu>
        {notes.map((note) => {
          return (
            <Note
              noteId={note.id}
              key={note.id}
              initPostion={note.position}
              content={note.text}
              containerRef={ref}
            />
          );
        })}
        <span className="absolute top-4 right-4 hidden lg:block md:block">
          <span className="flex flex-row gap-4">
            <ToggleHide disabled={!user.name} />
            <FullScreenView />
          </span>
        </span>
        {status === "unauthenticated" && (
          <span className="absolute lg:bottom-4 lg:left-4 md:right-4 lg:-translate-x-0 bottom-4 left-1/2 transform -translate-x-1/2 w-full px-4 lg:px-0">
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
          <span className={!user.name || hideSettings ? "hidden" : "block"}>
            <SpotifyEmbeadJSX
              playlistLink={
                currentPlayList?.length > 0
                  ? currentPlayList
                  : "https://open.spotify.com/embed/playlist/0iepisLXvVe5RxB3owHjlj?utm_source=generator"
              }
              disabled={!user.name}
              hideIcon={hideSettings}
            />
          </span>
        </>
        <span className="absolute top-4 left-4">
          <ClockCard hide={hideTime} references={ref} />
        </span>
        <span className={`absolute left-4 ${hideTime ? "top-4" : "top-48"}`}>
          <QuoteCard hide={hideQuote} references={ref} />
        </span>
        <span className={`absolute bottom-48 left-4`}>
          <Timer isHidden={hidePomodoroCard} references={ref} />
        </span>
        <span
          className={`absolute ${
            hideTime || hideQuote ? "top-4" : "bottom-20"
          } left-4`}
        ></span>
      </motion.div>
    ),
    [
      source,
      user.name,
      currentPlayList,
      hideTime,
      hideQuote,
      hideSettings,
      status,
      hidePomodoroCard,
      notes,
      handleAddNewStickyNote,
      session,
    ]
  );

  const isDesktopResolution = useMatchMediaHook({
    mediaquery: "(min-width: 1024px)",
    initValue: true,
  });

  const isTabletResolution = useMatchMediaHook({
    mediaquery: "(min-width: 768px)",
    initValue: true,
  });

  if (isDesktopResolution && isTabletResolution) {
    return (
      <div className="w-full max-h-screen overflow-hidden relative ">
        <AnimatePresence mode="wait">
          {status === "loading" ? LoaderScreenJSX : ContainerViewJSX}
        </AnimatePresence>
      </div>
    );
  } else return <RestrictedPage />;
}
