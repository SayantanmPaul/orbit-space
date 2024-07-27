import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { PopoverContent } from '@radix-ui/react-popover'
import { Earth, ListMusic, Music4, Settings } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { WallpaperSelection } from './BackgroundOptions'
import { Popover, PopoverTrigger } from './ui/popover'
import { Toggle } from './ui/toggle'

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
              <PopoverContent>
                <WallpaperSelection />
              </PopoverContent>
            </Popover>
            <ToggleGroupItem
              value="bold"
              aria-label="Toggle bold"
              className='group hover:bg-black/30 rounded-lg'
            >
              <ListMusic size={18}
                className='text-white group-hover:scale-110 duration-300 ' />
              {/* <Music4
                size={18}
                className='text-white group-hover:rotate-[25deg] duration-300 '
              /> */}
            </ToggleGroupItem>
          </>
        }
      </ToggleGroup>
      {/* <Toggle variant="outline" aria-label="Toggle italic" className='group bg-black/20 hover:bg-black/30 backdrop-blur-lg rounded-lg'>
            </Toggle> */}
    </div>
  )
}

export default SettingsJSX
