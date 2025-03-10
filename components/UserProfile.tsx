"use client";
import { useAppStore } from "@/(store)/App";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dialog } from "@radix-ui/react-dialog";
import classNames from "classnames";
import { CircleUserRound, DotIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import React, { useState } from "react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import Image from "next/image";

const UserProfileJSX = ({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement>;
}) => {
  const user = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);
  const [dialogOpen, setDialogOpen] = useState(false);

  const signOutHandler = () => {
    signOut();
    setUser({ name: "", email: "" });
  };

  const tooltipClass = classNames({
    "font-base text-xs bg-black/70 border-none backdrop-blur-sm m-2 text-white":
      true,
  });

  return (
    <>
      <TooltipProvider delayDuration={100}>
        <DropdownMenu modal={false}>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <span className=" bg-black/40 backdrop-blur-sm rounded-lg group w-12 h-12 flex items-center justify-center cursor-pointer ">
                  <CircleUserRound
                    size={20}
                    className="text-white group-hover:scale-110 duration-300 w-5 h-5"
                  />
                </span>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent className={tooltipClass}>Profile</TooltipContent>
          </Tooltip>
          <DropdownMenuContent
            container={containerRef.current}
            className="w-56 bg-black/40 backdrop-blur-xl shadow-lg dark mx-4"
          >
            <DropdownMenuLabel>Hi {user?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setDialogOpen(true)}>
              <DotIcon
                strokeWidth={5}
                absoluteStrokeWidth
                className=" text-yellow-200 animate-pulse -ml-1 mr-2"
              />
              <span>A note from the creator</span>
              <DropdownMenuShortcut></DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={signOutHandler}>
              <RiLogoutCircleRLine strokeWidth={0.5} className="mr-3 h-4 w-4" />
              <span>Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TooltipProvider>
      <CreatorsNoteDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        containerRef={containerRef}
      />
    </>
  );
};

export default UserProfileJSX;

const CreatorsNoteDialog = ({
  isOpen,
  onClose,
  containerRef,
}: {
  isOpen: boolean;
  onClose: () => void;
  containerRef: React.RefObject<HTMLDivElement>;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        container={containerRef.current}
        className=" bg-black/30 backdrop-blur-lg border border-white/10 text-white max-w-lg w-full"
      >
        <DialogHeader>
          <DialogTitle className="font-base">A small gesture</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-start gap-4">
          <p className="font-base text-sm text-slate-300 font-medium gap-4">
            Orbit Space: A small workspace that enhances Productivity while
            keeping the cozy vibe. Every feature—from custom themes to promodoro
            timer and sticky notes sticky notes—is designed to create the
            perfect flow of deep work. <br className="space-y-2 h-4" />
            Your support means everything! If you’ve been able to productive
            even a single bit while using Orbit Space, an upvote on Product Hunt
            would be greatly appreciated. 🚀
          </p>
          <div className="flex flex-row-reverse items-center justify-between gap-3 w-full">
            <a
              href="https://www.producthunt.com/posts/orbit-space?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-orbit&#0045;space"
              target="_blank"
            >
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=939830&theme=neutral&t=1741624538188"
                alt="OrbitSpace - Smart Workspace for Focus Enhancement & Productivity | Product Hunt"
                style={{ width: "180px", height: "40px" }}
                width="250"
                height="54"
              />
            </a>
            <span className="flex items-center gap-2">
              <Image
                src="https://avatars.githubusercontent.com/u/103353878?s=400&u=b65e6f93756ca4c131ddc7871ae58ec6b96c0a4c&v=4"
                alt="creator"
                className="rounded-full h-10 w-10 object-cover"
                width={100}
                height={100}
              />
              <span className="flex flex-col gap-[2px]">
                <a
                  href="https://github.com/SayantanmPaul"
                  target="_blank"
                  rel="noreferrer"
                  className="font-base text-sm text-indigo-300 hover:text-indigo-500 "
                >
                  Sayantanm_p
                </a>
                <p className="font-base text-xs text-slate-300 ">
                  creator of obit space
                </p>
              </span>
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
