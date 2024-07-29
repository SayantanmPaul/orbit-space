import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { PopoverContent } from '@radix-ui/react-popover'
import { Earth, ListMusic, Music4, Settings } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { WallpaperSelection } from './BackgroundOptions'
import { Popover, PopoverTrigger } from './ui/popover'
import { Toggle } from './ui/toggle'
import classNames from 'classnames'
import AddNewPlayList from "./AddNewPlayList"

const SettingsJSX = () => {
  const [isOpen, setIsOpen] = useState(false)
  const stateRef = useRef<HTMLDivElement | null>(null)

  const handleClickOutSide = ((event: MouseEvent) => {
    if (stateRef.current && !stateRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  })

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutSide);
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  }, []);

  const animationClass = classNames({
    "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2": true
  })

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
              <PopoverTrigger>
                <ToggleGroupItem
                  value="bold"
                  aria-label="Toggle bold"
                  className='group hover:bg-black/30 rounded-lg'
                >
                  <Earth
                    size={18}
                    className='text-white group-hover:rotate-[25deg] duration-300 '
                  />
                </ToggleGroupItem>
              </PopoverTrigger>
              <PopoverContent className={animationClass}>
                <WallpaperSelection />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger>
                <ToggleGroupItem
                  value="bold"
                  aria-label="Toggle bold"
                  className='group hover:bg-black/30 rounded-lg'
                >
                  <ListMusic size={18}
                    className='text-white group-hover:scale-110 duration-300 ' />
                </ToggleGroupItem>
              </PopoverTrigger>
              <PopoverContent className={`bg-black/50 backdrop-blur-xl shadow-lg m-4 pl-0 dark ${animationClass}`}>
                <div className="">
                  <AddNewPlayList />
                </div>
              </PopoverContent>
            </Popover>

          </>
        }
      </ToggleGroup>
    </div>
  )
}

export default SettingsJSX

