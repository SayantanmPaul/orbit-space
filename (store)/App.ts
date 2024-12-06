import { audioSource } from "@/components/AudioNoiseControls";
import { localVideoSource } from "@/components/BackgroundOptions";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserType = {
  name: string;
  email: string;
};
interface StoreState {
  source: string;
  setSource: (src: string) => void;
  getSource: () => string;

  user: UserType;
  setUser: (user: UserType) => void;
  getUser: () => UserType;

  hideCard: boolean;
  setHideCard: (hide: boolean) => void;

  playList: string;
  setPlayList: (src: string) => void;
  getPlayList: () => string;

  backgroundVolumes: number[];
  setBackgroundVolumes: (index: number, volume: number) => void;
  setBackgroundVolumesFromTheme: (volume: number[]) => void;

  isPlayingBgAudio: boolean;
  setIsPlayingBgAudio: (play: boolean) => void;

  hideTime: boolean;
  setHideTime: (hide: boolean) => void;

  hideQuote: boolean;
  setHideQuote: (hide: boolean) => void;

  hideAllSettings: boolean;
  setHideAllSettings: (hide: boolean) => void;

  //video props
  videoSources: string[];
  setVideoSources: (sources: string[]) => void;
  isUploaded: boolean[];
  setIsUploaded: (uploaded: boolean[]) => void;

  //theme props
  seletedTheme: string;
  setSeletedTheme: (src: string) => void;

  //pomodorotimer props
  pomodoroTime: number;
  setPomodoroTime: (time: number) => void;
  shortBreakTime: number;
  setShortBreakTime: (time: number) => void;
  longBreakTime: number;
  setLongBreakTime: (time: number) => void;
  selectedTimerColor: string;
  setSelectedTimerColor: (color: string) => void;
  hidePromodoroTimer: boolean;
  setHidePromodoroTimer: (hide: boolean) => void;
  clockFace: string;
  setClockFace: (face: string) => void;
}

export const useAppStore = create<StoreState>()(
  persist(
    (set, get) => ({
      source: "",
      user: { name: "", email: "" },
      hideCard: false,
      playList: "",
      backgroundVolumes: audioSource.map((source) => source.initialVolume),
      isPlayingBgAudio: false,
      hideTime: true,
      hideQuote: true,
      hideAllSettings: false,
      hidePromodoroTimer: true,
      videoSources: localVideoSource.map((videoURl) => videoURl),
      isUploaded: localVideoSource.map(() => false),
      seletedTheme: "",
      pomodoroTime: 25,
      shortBreakTime: 5,
      longBreakTime: 12,
      selectedTimerColor: 'rgb(217, 22, 86)',
      clockFace: 'Oswald',
      
      setSource: (src: string) => {
        set({ source: src });
      },
      setUser: (user: UserType) => {
        set({ user });
      },
      setHideCard: (hide: boolean) => {
        set({ hideCard: hide });
      },
      setHideTime: (hide: boolean) => {
        set({ hideTime: hide });
      },
      setHideQuote: (hide: boolean) => {
        set({ hideQuote: hide });
      },
      setPlayList: (link: string) => {
        set({ playList: link });
      },
      setHideAllSettings: (hide) => {
        set({ hideAllSettings: hide });
      },
      setHidePromodoroTimer(hide) {
        set({ hidePromodoroTimer: hide });
      },
      setBackgroundVolumes: (volume: number, index: number) => {
        set((state) => {
          const currentVolumes = [...state.backgroundVolumes];
          currentVolumes[index] = volume;
          return { backgroundVolumes: currentVolumes };
        });
      },
      setBackgroundVolumesFromTheme: (volumes: number[]) => {
        set({ backgroundVolumes: volumes });
      },

      setIsPlayingBgAudio: (play: boolean) => {
        set({ isPlayingBgAudio: play });
      },

      setVideoSources: (sources: string[]) => {
        set({ videoSources: sources });
      },
      setIsUploaded: (uploaded: boolean[]) => {
        set({ isUploaded: uploaded });
      },

      setSeletedTheme: (src: string) => {
        set({ seletedTheme: src });
      },

      setPomodoroTime: (time: number) => {
        set({ pomodoroTime: time });
      },
      setShortBreakTime: (time: number) => {
        set({ shortBreakTime: time })
      },
      setLongBreakTime: (time: number) => {
        set({ longBreakTime: time })
      },
      setSelectedTimerColor: (color: string) => {
        set({ selectedTimerColor: color })
      },
      setClockFace: (face: string) => {
        set({ clockFace: face })
      },

      getSource: () => get().source,
      getPlayList: () => get().playList,
      getUser: () => get().user,
    }),

    {
      name: "orbit-space",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
