import { audioSource } from "@/components/AudioNoiseControls";
import { localVideoSource } from "@/components/BackgroundOptions";
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type UserType = {
  name: string,
  email: string
}
interface StoreState {
  source: string,
  setSource: (src: string) => void,
  getSource: () => string,

  user: UserType;
  setUser: (user: UserType) => void,
  getUser: () => UserType,

  hideCard: boolean;
  setHideCard: (hide: boolean) => void,

  playList: string,
  setPlayList: (src: string) => void,
  getPlayList: () => string,

  backgroundVolumes: number[],
  setBackgroundVolumes: (index: number, volume: number) => void,
  setBackgroundVolumesFromTheme: (volume: number[]) => void

  isPlayingBgAudio: boolean,
  setIsPlayingBgAudio: (play: boolean) => void,

  hideTime: boolean,
  setHideTime: (hide: boolean) => void

  hideQuote: boolean,
  setHideQuote: (hide: boolean) => void,

  hideAllSettings: boolean,
  setHideAllSettings: (hide: boolean) => void,

  videoSources: string[],
  setVideoSources: (sources: string[]) => void,
  isUploaded: boolean[],
  setIsUploaded: (uploaded: boolean[]) => void,

  seletedTheme: string,
  setSeletedTheme: (src: string) => void,
}
export const useAppStore = create<StoreState>()(
  persist(
    (set, get) => ({
      source: '',
      user: { name: '', email: '' },
      hideCard: false,
      playList: '',
      backgroundVolumes: audioSource.map((source) => source.initialVolume),
      isPlayingBgAudio: false,
      hideTime: true,
      hideQuote: true,
      hideAllSettings: false,
      videoSources: localVideoSource.map((videoURl) => videoURl),
      isUploaded: localVideoSource.map(() => false),
      seletedTheme: '',

      setSource: (src: string) => {
        set({ source: src })
      },
      setUser: (user: UserType) => {
        set({ user })
      },
      setHideCard: (hide: boolean) => {
        set({ hideCard: hide })
      },
      setHideTime: (hide: boolean) => {
        set({ hideTime: hide })
      },
      setHideQuote: (hide: boolean) => {
        set({ hideQuote: hide })
      },
      setPlayList: (link: string) => {
        set({ playList: link })
      },
      setHideAllSettings: (hide) => {
        set({ hideAllSettings: hide })
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
        set({ seletedTheme: src })
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
)
