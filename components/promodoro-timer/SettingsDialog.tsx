import { useAppStore } from "@/(store)/App";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Settings2Icon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const SettingsDialog = ({
  stopTimer,
  timerMode,
  containerRef,
}: {
  stopTimer: () => void;
  timerMode: "pomodoro" | "shortBreak" | "longBreak";
  containerRef: React.RefObject<HTMLDivElement>;
}) => {
  const {
    pomodoroTime,
    setPomodoroTime,
    shortBreakTime,
    setShortBreakTime,
    longBreakTime,
    setLongBreakTime,
    selectedTimerColor,
    setSelectedTimerColor,
    clockFace,
    setClockFace,
  } = useAppStore((state) => ({
    pomodoroTime: state.pomodoroTime,
    setPomodoroTime: state.setPomodoroTime,
    shortBreakTime: state.shortBreakTime,
    setShortBreakTime: state.setShortBreakTime,
    longBreakTime: state.longBreakTime,
    setLongBreakTime: state.setLongBreakTime,
    selectedTimerColor: state.selectedTimerColor,
    setSelectedTimerColor: state.setSelectedTimerColor,
    clockFace: state.clockFace,
    setClockFace: state.setClockFace,
  }));

  // Local state for temporary settings
  const [tempPomodoroTime, setTempPomodoroTime] = useState(() => pomodoroTime);
  const [tempShortBreakTime, setTempShortBreakTime] = useState(
    () => shortBreakTime
  );
  const [tempLongBreakTime, setTempLongBreakTime] = useState(
    () => longBreakTime
  );
  const [tempSelectedTimerColor, setTempSelectedTimerColor] =
    useState(selectedTimerColor);
  const [tempClockFace, setTempClockFace] = useState(clockFace);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const applyChanges = () => {
    setPomodoroTime(tempPomodoroTime);
    setShortBreakTime(tempShortBreakTime);
    setLongBreakTime(tempLongBreakTime);
    setSelectedTimerColor(tempSelectedTimerColor);
    setClockFace(tempClockFace);
    setIsDialogOpen(false);
  };

  useEffect(() => {
    if (isDialogOpen) stopTimer();
  }, [isDialogOpen, stopTimer]);

  useEffect(() => {
    const defaultCol = {
      pomodoro: "#14B8A6",
      shortBreak: "rgb(168, 136, 181)",
      longBreak: "rgb(95, 189, 255)",
    };
    setSelectedTimerColor(defaultCol[timerMode]);
  }, [timerMode, setSelectedTimerColor]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-red-50/10 px-4 py-6 rounded-2xl">
          <Settings2Icon className="h-5 w-5 text-red-50" />
        </Button>
      </DialogTrigger>
      <DialogContent
        container={containerRef.current}
        className="bg-black/30 backdrop-blur-lg border border-white/10 text-white max-w-md"
      >
        <DialogHeader>
          <DialogTitle className="font-base">Settings</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-4">
          <div className="flex w-full items-center gap-3">
            <span className="flex flex-col gap-1">
              <Label className="font-base text-xs text-slate-300 font-medium">
                Pomodoro
              </Label>
              <Input
                className="bg-black/10 border-white/10"
                value={tempPomodoroTime}
                autoFocus
                id="pomodoro"
                type="number"
                min={5}
                onChange={(e) => {
                  setTempPomodoroTime(Number(e.target.value));
                }}
              />
            </span>
            <span className="flex flex-col gap-1">
              <Label
                htmlFor="short-break"
                className="font-base text-xs text-slate-300 font-medium"
              >
                Short Break
              </Label>
              <Input
                className="bg-black/10 border-white/10"
                type="number"
                id="short-break"
                value={tempShortBreakTime}
                onChange={(e) => {
                  setTempShortBreakTime(Number(e.target.value));
                }}
              />
            </span>
            <span className="flex flex-col gap-1">
              <Label
                htmlFor="long-break"
                className="font-base text-xs text-slate-300 font-medium"
              >
                Long Break
              </Label>
              <Input
                className="bg-black/10 border-white/10"
                type="number"
                id="long-break"
                value={tempLongBreakTime}
                onChange={(e) => {
                  setTempLongBreakTime(Number(e.target.value));
                }}
              />
            </span>
          </div>
        </div>
        <span className="flex justify-between w-full items-center">
          <Label className="font-base text-slate-300 font-medium">Color</Label>
          <div className="flex gap-3 items-center">
            {[
              "rgb(217, 22, 86)",
              "#FFBD73",
              "#14B8A6",
              "#9694FF",
              "#F075AA",
            ].map((color) => (
              <span
                key={color}
                className="w-8 h-8 rounded-full"
                style={{
                  backgroundColor: color,
                  border:
                    tempSelectedTimerColor === color
                      ? "2px solid white"
                      : "none",
                }}
                onClick={() => setTempSelectedTimerColor(color)}
              ></span>
            ))}
          </div>
        </span>
        <span className="flex justify-between w-full items-center">
          <Label className="font-base text-slate-300 font-medium">
            Clock Face
          </Label>
          <div className="flex gap-3 items-start ">
            {["Oswald", "Times New Roman", "Lobster"].map((font) => (
              <span
                key={font}
                className="w-9 h-9 rounded-full flex items-center justify-center font-medium select-none "
                style={{
                  fontFamily: font,
                  backgroundColor:
                    tempClockFace === font
                      ? "rgba(255,255,255,0.1)"
                      : "transparent",
                  border: tempClockFace === font ? "1px solid white" : "none",
                }}
                onClick={() => setTempClockFace(font)}
              >
                Aa
              </span>
            ))}
          </div>
        </span>
        <Button
          className="bg-red-50/10 hover:bg-black/30 rounded-md"
          onClick={applyChanges}
        >
          Apply Changes
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
