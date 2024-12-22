import { useAppStore } from "@/(store)/App";
import { useState } from "react";
import { motion } from "framer-motion";
import { Textarea } from "../ui/textarea";
import {
  ChevronLeftIcon,
  NotebookIcon,
  PencilLineIcon,
  Trash2Icon,
} from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";
import toast from "react-hot-toast";

const Note = ({
  noteId,
  content,
  initPostion,
  containerRef,
}: {
  noteId: number;
  content: string;
  initPostion?: { x: number; y: number };
  containerRef: React.RefObject<HTMLDivElement>;
}) => {
  const { editStickyNote, deleteStickyNote } = useAppStore();

  // Local state for managing edit mode and note text
  const [isEditing, setIsEditing] = useState(content.trim() === "");
  const [noteText, setNoteText] = useState(content);

  const handleDeleteNote = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    deleteStickyNote(id);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveNote = () => {
    if (noteText.trim() === "") {
      toast.error("Note cannot be empty.");
      return;
    }
    editStickyNote(noteId, noteText);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    if (content.trim() === "" || noteText.trim() === "") {
      deleteStickyNote(noteId);
    } else {
      setIsEditing(false);
    }
  };

  return (
    <motion.div
      drag
      dragConstraints={containerRef}
      dragElastic={0.1}
      whileDrag={{ scale: 1.02 }}
      style={{
        left: `${initPostion?.x}px`,
        top: `${initPostion?.y}px`,
        touchAction: "none",
      }}
      onClick={(e) => e.stopPropagation()}
      className="absolute w-96 border border-white/10 backdrop-blur bg-black/20 s p-3 select-none max-w-full rounded-md text-white flex flex-col cursor-grab"
    >
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <textarea
            value={noteText}
            autoFocus={true}
            placeholder="study for 1 hour..."
            onChange={(e) => setNoteText(e.target.value)}
            className="w-full h-32 bg-transparent border border-white/10 p-2 text-white rounded-md focus-visible:ring-0 focus-visible:outline-none focus-visible:border-white/70 font-base"
          />
          <div className="flex justify-end gap-2">
            <button
              disabled={noteText.trim() === ""}
              onClick={handleCancelEdit}
              className="px-3 py-1 bg-gray-600 rounded-md disabled:text-white/50 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveNote}
              className="px-3 py-1 bg-green-600 rounded-md hover:bg-green-500 text-sm"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <ContextMenu>
          <ContextMenuTrigger>
            <div className="space-y-3 w-full h-full">
              <p className="text-xl font-sans-secondary font-medium leading-normal tracking-normal text-primary-foreground">
                <span className="mr-2">📌</span>
                {content}
              </p>
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent className="w-48 bg-black/50 border-white/10 backdrop-blur text-white ">
            <ContextMenuItem
              inset
              className="focus:bg-white/20 focus:text-white px-0"
            >
              <ChevronLeftIcon size={18} strokeWidth={2.2} className="mx-2" />
              Back
            </ContextMenuItem>
            <ContextMenuItem
              onClick={handleEditToggle}
              inset
              className="focus:bg-white/20 focus:text-white px-0"
            >
              <PencilLineIcon size={18} strokeWidth={2} className="mx-2" />
              Edit note
            </ContextMenuItem>
            <ContextMenuItem
              onClick={(e) => handleDeleteNote(e, noteId)}
              inset
              className="focus:bg-white/20 focus:text-white px-0"
            >
              <Trash2Icon size={18} strokeWidth={2} className="mx-2" />
              Delete
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      )}
    </motion.div>
  );
};

export default Note;
