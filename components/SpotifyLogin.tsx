import React from 'react'
import { AiFillSpotify } from 'react-icons/ai'
import { Button } from './ui/button'
import { signIn, useSession } from 'next-auth/react'
import { HoverCard, HoverCardContent } from './ui/hover-card'
import { useAppStore } from '@/(store)/App'
import { Skeleton } from './ui/skeleton'

const SpotifyLoginJSX = () => {

    const signInHandler = async () => {
        await signIn('spotify', { redirect: false });
        // toast(`Hi ${user.name}, you're logged in successfully` )
    };

    return (
        <HoverCard>
            <div className="max-w-96 w-full bg-black/40 backdrop-blur-xl shadow-lg dark p-4 text-base z-50 rounded-md borderp-4 text-popover-foreground outline-none
            ">
                <div className="space-y-4 w-full ">
                    <div className="space-y-2 w-full">
                        <h4 className="text-md font-medium font-base">Orbit-Space</h4>
                        <p className="text-muted-foreground text-sm ">
                            Helping to stay focused & boost productivity. Log in to access music controls and other features.
                        </p>
                    </div>
                    <Button
                        onClick={signInHandler}
                        className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring font-base"

                    >
                        <div className="flex items-center gap-2 ">
                            Login with Spotify
                            <AiFillSpotify className="h-5 w-5 " />
                        </div>
                    </Button>
                </div>
            </div>
        </HoverCard>
    )
}

export default SpotifyLoginJSX


export const SpotifyLoginCardSkeleton = () => {
    return (
        <div className="w-96 bg-black/10 backdrop-blur-xl shadow-lg p-4 text-base z-50 rounded-md border text-popover-foreground">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-full" />
                </div>
                <Skeleton className="h-9 w-48" />
            </div>
        </div>
    )
}