import { audioSource } from "@/components/AudioNoiseControls";
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
  setUser: (user: UserType) => void;
  getUser: () => UserType;

  hideCard: boolean;
  setHideCard: (hide: boolean) => void;

  playList: string,
  setPlayList: (src: string) => void,
  getPlayList: () => string,

  backgroundVolumes: number[],
  setBackgroundVolumes: (index: number, volume: number) => void;

  isPlayingBgAudio: boolean,
  setIsPlayingBgAudio: (play: boolean) => void
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

      setSource: (src: string) => {
        set({ source: src })
      },
      setUser: (user: UserType) => {
        set({ user })
      },
      setHideCard(hide: boolean) {
        set({ hideCard: hide })
      },
      setPlayList(link: string) {
        set({ playList: link })
      },
      setBackgroundVolumes: (volume: number, index: number) => {
        set((state) => {
          const currentVolumes = Array.isArray(state.backgroundVolumes) ? [...state.backgroundVolumes] : [];
          currentVolumes[index] = volume;
          return { backgroundVolumes: currentVolumes };
        });
      },

      setIsPlayingBgAudio(play: boolean) {
        set({ isPlayingBgAudio: play })
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
