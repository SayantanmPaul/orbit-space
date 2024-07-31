import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { PopoverContent } from '@radix-ui/react-popover'
import { BookOpen, Clock2, Earth, ListMusic, Quote, Settings } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { WallpaperSelection } from './BackgroundOptions'
import { Popover, PopoverTrigger } from './ui/popover'
import { Toggle } from './ui/toggle'
import AddNewPlayList from "./AddNewPlayList"
import { animationClass } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "./ui/dropdown-menu"
import { useAppStore } from "@/(store)/App"

const SettingsJSX = () => {
  const [isOpen, setIsOpen] = useState(false)
  const stateRef = useRef<HTMLDivElement | null>(null)

  //hide clock and quotes
  const setHideTime = useAppStore(state => state.setHideTime)
  const hideTime = useAppStore(state => state.hideTime)
  const setHideQuote = useAppStore(state => state.setHideQuote)
  const hideQuote = useAppStore(state => state.hideQuote)

  // const handleClickOutSide = (event: MouseEvent) => {
  //   if (stateRef.current && !stateRef.current.contains(event.target as Node)) {
  //     setIsOpen(false);
  //   }
  // }

  // useEffect(() => {
  //   document.addEventListener('mousedown', handleClickOutSide);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutSide);
  //   };
  // }, []);

  return (
    <div ref={stateRef}>
      <ToggleGroup type='multiple' className='bg-black/30 backdrop-blur-lg rounded-lg p-1 shadow'>
        <Toggle
          onClick={() => setIsOpen(!isOpen)}
          value="bold"
          aria-label="Toggle bold"
          className='group hover:bg-black/20 rounded-lg'
        >
          <Settings
            size={18}
            className={`text-white group-hover:rotate-[25deg] duration-300 ${isOpen && 'rotate-[25deg]'}`}
          />
        </Toggle>
        {isOpen &&
          <>
            <Popover>
              <PopoverTrigger className="w-10 h-10 items-center justify-center flex" asChild>
                <div className='group hover:bg-black/30 rounded-lg'>
                  <Earth
                    size={18}
                    className='text-white group-hover:rotate-[25deg] duration-300'
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className={animationClass}>
                <WallpaperSelection />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger className="w-10 h-10 items-center justify-center flex" asChild>
                <div className='group hover:bg-black/30 rounded-lg'>
                  <ListMusic
                    size={18}
                    className='text-white group-hover:scale-110 duration-300'
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className={`bg-black/50 backdrop-blur-xl shadow-lg m-4 pl-0 dark ${animationClass}`}>
                <div>
                  <AddNewPlayList />
                </div>
              </PopoverContent>
            </Popover>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className='rounded-lg group w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-black/20'>
                  <BookOpen size={18} className='text-white group-hover:scale-110 duration-300' />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 bg-black/40 backdrop-blur-xl shadow-lg dark m-4">
                <DropdownMenuItem onClick={() => setHideTime(!hideTime)}>
                  <Clock2 className="mr-2 h-4 w-4" />
                  <span>Show time</span>
                  <DropdownMenuShortcut>⌘T</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setHideQuote(!hideQuote)}>
                  <Quote className="mr-2 h-4 w-4" />
                  <span>Show random quotes</span>
                  <DropdownMenuShortcut>⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        }
      </ToggleGroup>
    </div>
  )
}

export default SettingsJSX
