import { Settings } from 'lucide-react'
import React from 'react'
import { Toggle } from './ui/toggle'

const SettingsJSX = () => {
    return (
        <>
            <Toggle variant="outline" aria-label="Toggle italic" className='group bg-black/20 hover:bg-black/30 backdrop-blur-lg rounded-lg'>
                <Settings size={18} className='text-white group-hover:rotate-[25deg] duration-300 ' />
            </Toggle>
        </>
    )
}

export default SettingsJSX
