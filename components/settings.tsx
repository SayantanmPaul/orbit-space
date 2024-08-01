import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { PopoverContent } from '@radix-ui/react-popover'
import { BookOpen, Clock2, Earth, ListMusic, Palette, Quote, Settings } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
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
import WallpaperSelection from "./BackgroundOptions"
import ThemeSelectionJSX from "./ThemeSelection"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import classNames from "classnames"

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

  const tooltipClass = classNames({
    "font-base text-xs bg-black/70 border-none backdrop-blur-sm m-2 text-white": true
  })

  return (
    <div ref={stateRef} className="z-40">
      <TooltipProvider delayDuration={200}>
        <ToggleGroup type='multiple' className='bg-black/30 backdrop-blur-lg rounded-lg p-1 shadow'>
          <Tooltip>
            <TooltipTrigger asChild>
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
            </TooltipTrigger>
            <TooltipContent className={tooltipClass}>
              Settings
            </TooltipContent>
          </Tooltip>
          {isOpen &&
            <>
              {/* popover for wallpapaer selection */}
              <Popover>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <PopoverTrigger className="w-10 h-10 items-center justify-center flex cursor-pointer" asChild>
                      <div className='group hover:bg-black/30 rounded-lg'>
                        <Earth
                          size={18}
                          className='text-white group-hover:rotate-[25deg] duration-300'
                        />
                      </div>
                    </PopoverTrigger>
                  </TooltipTrigger>
                  <TooltipContent className={tooltipClass}>
                    Select wallpaper
                  </TooltipContent>
                </Tooltip>
                <PopoverContent className={animationClass}>
                  <WallpaperSelection />
                </PopoverContent>
              </Popover>
              {/* popover for custom playlist form */}
              <Popover>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <PopoverTrigger className="w-10 h-10 items-center justify-center flex cursor-pointer" asChild>
                      <div className='group hover:bg-black/30 rounded-lg'>
                        <ListMusic
                          size={18}
                          className='text-white group-hover:scale-110 duration-300'
                        />
                      </div>
                    </PopoverTrigger>
                  </TooltipTrigger>
                  <TooltipContent className={tooltipClass}>
                    Add playlist
                  </TooltipContent>
                </Tooltip>
                <PopoverContent className={`bg-black/50 shadow-lg m-4 pl-0 dark ${animationClass}`}>
                  <AddNewPlayList />
                </PopoverContent>
              </Popover>
              {/* dropdown for show/hide clockcard and quotecard view */}
              <DropdownMenu>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <div className='rounded-lg group w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-black/20'>
                        <BookOpen size={18} className='text-white group-hover:scale-110 duration-300' />
                      </div>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent className={tooltipClass}>
                    Clock/quote
                  </TooltipContent>
                </Tooltip>
                <DropdownMenuContent className="w-64 bg-black/40 backdrop-blur-xl shadow-lg dark m-4">
                  <DropdownMenuItem onClick={() => setHideTime(!hideTime)}>
                    <Clock2 className="mr-2 h-4 w-4" />
                    {hideTime ? 'Show time' : 'Hide time'}
                    {/* <span>Show time</span> */}
                    <DropdownMenuShortcut>⌘T</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setHideQuote(!hideQuote)}>
                    <Quote className="mr-2 h-4 w-4" />
                    {/* <span>Show random quotes</span> */}
                    {hideQuote ? 'Show random quotes' : 'Hide random quotes'}
                    <DropdownMenuShortcut>⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {/* theme selection popover */}
              <Popover>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <PopoverTrigger asChild>
                      <div className='group hover:bg-black/30 rounded-lg w-10 h-10 flex items-center justify-center cursor-pointer'>
                        <Palette
                          size={18}
                          className='text-white group-hover:scale-110 duration-300'
                        />
                      </div>
                    </PopoverTrigger>
                  </TooltipTrigger>
                  <TooltipContent className={tooltipClass}>
                    Select theme
                  </TooltipContent>
                </Tooltip>
                <PopoverContent className={`bg-black/40 backdrop-blur-xl rounded-lg shadow-lg m-4 pl-0 dark overflow-hidden ${animationClass}`}>
                  <div>
                    <ThemeSelectionJSX />
                  </div>
                </PopoverContent>
              </Popover>
            </>
          }
        </ToggleGroup>
      </TooltipProvider>
    </div >
  )
}

export default SettingsJSX
