import * as React from "react"
import Image from "next/image"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Videoplayer from "./videoplayer"

export interface Artwork {
    artist: string
    art: string
}

export function ScrollAreaHorizontalDemo() {
    return (
        <ScrollArea className=" w-min max-h-80 overflow-scroll overflow-x-hidden rounded-md border border-black bg-black/50 ml-4 mb-4 scroll-smooth">
            <div className="flex flex-col w-max gap-4 p-4 items-center">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className='max-w-96 h-full object-fill rounded-md'
                >
                    <source src='/lofi/204241-923909574.mp4' />
                </video>
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className='max-w-96 h-full object-fill rounded-md'
                >
                    <source src='/lofi/lofi-boy-chilling-with-cat-moewalls-com.mp4' />
                </video>
                {/* {works.map((artwork) => (
                    <figure key={artwork.artist} className="shrink-0">
                        <div className="overflow-hidden rounded-md">
                            <Image
                                src={artwork.art}
                                alt={`Photo by ${artwork.artist}`}
                                className="aspect-[3/4] h-fit w-fit object-cover"
                                width={300}
                                height={400}
                            />
                        </div>
                        <figcaption className="pt-2 text-xs text-muted-foreground">
                            Photo by{" "}
                            <span className="font-semibold text-white">
                                {artwork.artist}
                            </span>
                        </figcaption>
                    </figure>
                ))} */}
            </div>
            <ScrollBar orientation="vertical" />
        </ScrollArea>
    )
}
