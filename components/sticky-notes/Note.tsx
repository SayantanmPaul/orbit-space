import { useAppStore } from '@/(store)/App'
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuShortcut,
    ContextMenuTrigger
} from "@/components/ui/context-menu"
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import NoteDialog from './NoteDialog'

const Note = ({
    noteId,
    content,
    initPostion,
    containerRef,
}: {
    noteId: number,
    content: string,
    initPostion?: { x: number, y: number },
    containerRef: React.RefObject<HTMLDivElement>,
}) => {
    const { deleteStickyNote } = useAppStore()

    // Local state for managing dialog open/close
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleDeleteNote = (e: React.MouseEvent, id: number) => {
        e.preventDefault()
        deleteStickyNote(id)
    }

    const handleEditNote = () => {
        setIsDialogOpen(true)
    }

    return (
        <>
            <ContextMenu>
                <ContextMenuTrigger>
                    <motion.div
                        drag
                        dragConstraints={containerRef}
                        dragElastic={0.1}
                        whileDrag={{ scale: 1.02 }}
                        style={{
                            left: `${initPostion?.x}px`,
                            top: `${initPostion?.y}px`,
                            touchAction: "none"
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="absolute w-96 border border-white/10 backdrop-blur bg-black/20 s p-4 select-none max-w-md rounded-md text-white flex flex-col cursor-grab"
                    >
                        <div className="space-y-3 w-full h-full">
                            <p className="text-xl font-sans-secondary font-medium leading-tight text-primary-foreground">
                                <span className="mr-2">📌</span>
                                {content}
                            </p>
                        </div>
                    </motion.div>
                </ContextMenuTrigger>
                <ContextMenuContent className="w-56 bg-black/50 border-white/10 backdrop-blur text-white">
                    <ContextMenuItem inset className="focus:bg-white/20 focus:text-white">
                        Back
                        <ContextMenuShortcut className="text-white/60">⌘[</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuItem
                        onClick={handleEditNote}
                        inset
                        className="focus:bg-white/20 focus:text-white"
                    >
                        Edit
                        <ContextMenuShortcut className="text-white/60">⌘E</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuItem
                        onClick={(e) => handleDeleteNote(e, noteId)}
                        inset
                        className="focus:bg-white/20 focus:text-white"
                    >
                        Delete
                        <ContextMenuShortcut className="text-white/60">⌘D</ContextMenuShortcut>
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
            <NoteDialog
                noteId={noteId}
                content={content}
                isOpen={isDialogOpen}
                setIsOpen={setIsDialogOpen}
                hideDialogTrigger
            />
        </>
    )
}

export default Note
