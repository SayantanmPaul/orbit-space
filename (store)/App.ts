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
}
export const useAppStore = create<StoreState>()(
  persist(
    (set, get) => ({
      source: '',
      user: { name: '', email: '' },
      hideCard: false,
      playList: '',

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

      getSource: () => get().source,
      getPlayList: ()=> get().playList,
      getUser: () => get().user,
    }),

{
  name: "orbit-space",
    storage: createJSONStorage(() => localStorage),
    }
  )
)
