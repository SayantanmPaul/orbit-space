"use client"
import { CircleUserRound, LogOut } from 'lucide-react'
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAppStore } from '@/(store)/App'
import { signOut } from 'next-auth/react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import classNames from 'classnames'

const UserProfileJSX = () => {
    const user = useAppStore(state => state.user)
    const setUser = useAppStore(state => state.setUser)

    const signOutHandler = () => {
        signOut();
        setUser({ name: '', email: '' });
    }

    const tooltipClass = classNames({
        "font-base text-xs bg-black/70 border-none backdrop-blur-sm m-2 text-white": true
    })
    
    return (
        <TooltipProvider delayDuration={100}>
            <DropdownMenu>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DropdownMenuTrigger asChild>
                            <span className=' bg-black/40 backdrop-blur-sm rounded-lg group w-12 h-12 flex items-center justify-center cursor-pointer '>
                                <CircleUserRound size={20} className='text-white group-hover:scale-110 duration-300 w-5 h-5' />
                            </span>
                        </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent className={tooltipClass}>
                        Profile
                    </TooltipContent>
                </Tooltip>
                <DropdownMenuContent className="w-56 bg-black/40 backdrop-blur-xl shadow-lg dark mx-4">
                    <DropdownMenuLabel>Hi {user?.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOutHandler}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </TooltipProvider>
    )
}

export default UserProfileJSX
