import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type UserType= {
  name: string,
  email: string
}
interface StoreState {
  source: string,
  setSource: (src: string) => void,
  getSource: () => string,
  user: UserType ;
  setUser: (user: UserType) => void;
  getUser: () => UserType;
}
export const useAppStore = create<StoreState>()(
  persist(
    (set, get) => ({
      source: '',
      user: { name: '', email: '' },

      setSource: (src: string) => {
        set({ source: src })
      },
      setUser:(user: UserType)=> {
        set({user})
      },

      getSource: () => get().source,
      getUser: ()=>get().user,
    }),
    {
      name: "orbit-space",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
