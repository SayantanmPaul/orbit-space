import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface StoreState {
  source: string,
  setSource: (src: string) => void,
  getSource: () => string
}
export const useAppStore = create<StoreState>()(
  persist(
    (set, get) => ({
      source: '',
      setSource: (src: string) => {
        set({ source: src })
      },
      getSource: () => get().source,
    }),
    {
      name: "orbit-space",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
