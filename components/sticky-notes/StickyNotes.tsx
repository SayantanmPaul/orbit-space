import React, { createRef, useEffect, useRef } from 'react'
import Note from './Note'

interface NoteType {
    id: number;
    text: string;
    position?: { x: number, y: number };
}

const StickyNotes = (
    {
        notes,
        setNotes,
        containerRef
    }: {
        notes: NoteType[],
        setNotes: Function
        containerRef: React.RefObject<HTMLDivElement>
    }) => {

    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem("notes") || "[]");

        const updateNotes = notes.map((note) => {
            const savedNote = savedNotes.find((n: NoteType) => n.id === note.id);
            if (savedNote) {
                return { ...note, position: savedNote.position }
            } else {
                const position = determineNewNotePosition();
                return { ...note, position }
            }
        })
        setNotes(updateNotes);
        localStorage.setItem("notes", JSON.stringify(updateNotes));
    }, [notes.length])



    const determineNewNotePosition = () => {
        const maxX = window.innerWidth - 250;
        const maxY = window.innerHeight - 250;

        return {
            x: Math.floor(Math.random() * maxX),
            y: Math.floor(Math.random() * maxY)
        }
    }
    return (
        <div>
            {notes.map((note) => {
                return (
                    <Note
                        noteId={note.id}
                        key={note.id}
                        initPostion={note.position}
                        content={note.text}
                        containerRef={containerRef}
                    />
                )
            })}
        </div>
    )
}

export default StickyNotes


