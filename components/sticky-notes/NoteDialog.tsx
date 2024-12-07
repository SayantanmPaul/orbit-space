import { useAppStore } from "@/(store)/App"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { NotebookPenIcon } from 'lucide-react'
import React, { useEffect, useState } from "react"
import { Textarea } from "../ui/textarea"


const NoteDialog = ({
    noteId,
    content,
    isOpen,
    setIsOpen,
    hideDialogTrigger,
}: {
    noteId?: number;
    content?: string;
    isOpen: boolean;
    setIsOpen: (state: boolean) => void;
    hideDialogTrigger?: boolean;
}) => {
    const { addStickyNote, editStickyNote } = useAppStore();

    const [noteText, setNoteText] = useState(content || '');
    const [error, setError] = useState('');

    useEffect(() => {
        if (content) {
            setNoteText(content);
        }
    }, [content]);

    const handleSaveEditedNote = (e: React.FormEvent) => {
        e.preventDefault();
        if (noteText.trim() === '') {
            setError('Add a note');
            return;
        }
        if (noteId) {
            editStickyNote(noteId, noteText);
        } else {
            addStickyNote({
                id: Date.now(),
                text: noteText
            })
        }
        setIsOpen(false);
        setNoteText("");
        setError("");
    }

    console.log("Dialog Open State:", isOpen);


    return (
        <Dialog
            open={isOpen}
            onOpenChange={setIsOpen} >
            <DialogTrigger hidden={hideDialogTrigger}>
                <div className='group hover:bg-black/30 rounded-lg w-10 h-10 flex items-center justify-center cursor-pointer'>
                    <NotebookPenIcon
                        size={18}
                        className='text-white group-hover:scale-110 duration-300'
                    />
                </div>
            </DialogTrigger>
            <DialogContent className='bg-black/30 backdrop-blur-lg border border-white/10 text-white max-w-lg z-50'>
                <DialogHeader>
                    <DialogTitle className="font-base">
                        {noteId ?
                            "Edit Note 📌" :
                            "Add New Note 📌"
                        }
                    </DialogTitle>
                    <DialogDescription> Make sure to complete those tasks 😉
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSaveEditedNote}>
                    <div className='flex flex-col gap-1 font-base'>
                        <Textarea
                            id="notesarea"
                            className={`col-span-2 h-10 rounded-none bg-transparent border  focus-visible:ring-0 focus-visible:ring-offset-0 text-white ${error ? 'border-rose-500' : 'order-white/10'}`}
                            placeholder='Big plans small steps...'
                            value={noteText}
                            onFocus={(e) => e.target.select()}
                            onChange={(e) => setNoteText(e.target.value)}
                        />
                        <DialogDescription className="text-xs"> To delete the notes, simply right click on the note and select &quot;Delete&quot;
                        </DialogDescription>
                        {error && <p className="text-rose-500 text-xs font-base">{error}</p>}
                        <div className='w-full flex justify-end'>
                            <Button type="submit" className='w-full bg-white hover:bg-slate-100 text-black max-w-24 rounded-none h-8 mt-3'>
                                {noteId ? "Save" : "Add"}
                            </Button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default NoteDialog
