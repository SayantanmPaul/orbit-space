import { useAppStore } from "@/(store)/App";
import { motion } from "framer-motion";
import { Howl } from "howler";
import {
  BrainIcon,
  CoffeeIcon,
  FastForwardIcon,
  Gamepad2Icon,
  PauseIcon,
  PlayIcon,
} from "lucide-react";
import { darken, lighten } from "polished";
import { useCallback, useEffect, useRef, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Button } from "../ui/button";
import SettingsDialog from "./SettingsDialog";

const Timer = ({
  references,
  isHidden,
}: {
  references: any;
  isHidden?: boolean;
}) => {
  const [isPaused, setIsPaused] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [mode, setMode] = useState<"pomodoro" | "shortBreak" | "longBreak">(
    "pomodoro"
  );

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  const {
    pomodoroTime,
    setPomodoroTime,
    shortBreakTime,
    setShortBreakTime,
    longBreakTime,
    setLongBreakTime,
    selectedTimerColor,
    clockFace,
  } = useAppStore((state) => ({
    pomodoroTime: state.pomodoroTime,
    setPomodoroTime: state.setPomodoroTime,
    shortBreakTime: state.shortBreakTime,
    setShortBreakTime: state.setShortBreakTime,
    longBreakTime: state.longBreakTime,
    setLongBreakTime: state.setLongBreakTime,
    selectedTimerColor: state.selectedTimerColor,
    clockFace: state.clockFace,
  }));

  const stopTimer = () => {
    //stop the timer
    setIsPaused(true);
    isPausedRef.current = true;
  };

  //switch mode and reset the timer
  const switchMode = useCallback(() => {
    let nextMode: "pomodoro" | "shortBreak" | "longBreak";
    if (modeRef.current === "pomodoro") {
      nextMode = "shortBreak";
    } else if (modeRef.current === "shortBreak") {
      nextMode = "longBreak";
    } else {
      nextMode = "pomodoro";
    }

    const nextSeconds =
      nextMode === "pomodoro"
        ? pomodoroTime * 60
        : nextMode === "shortBreak"
        ? shortBreakTime * 60
        : longBreakTime * 60;

    stopTimer();

    // Switch mode and reset the timer
    setMode(nextMode);
    setSecondsLeft(nextSeconds);
    modeRef.current = nextMode;
    secondsLeftRef.current = nextSeconds;
  }, [pomodoroTime, shortBreakTime, longBreakTime]);

  // start the timer
  const tick = useCallback(() => {
    if (secondsLeftRef.current > 0) {
      secondsLeftRef.current--;
      setSecondsLeft(secondsLeftRef.current);
    } else {
      switchMode();
    }
  }, [switchMode]);

  // initialize the timer
  const initTimer = useCallback(() => {
    const initialSeconds = pomodoroTime * 60;
    setSecondsLeft(initialSeconds);
    secondsLeftRef.current = initialSeconds;
  }, [pomodoroTime]);

  useEffect(() => {
    initTimer();
    const interval = setInterval(() => {
      if (isPausedRef.current) return;
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [initTimer, tick]);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  const totalSeconds =
    mode === "pomodoro"
      ? pomodoroTime * 60
      : mode === "shortBreak"
      ? shortBreakTime * 60
      : longBreakTime * 60;

  const percentage = Math.round((secondsLeft / totalSeconds) * 100);
  const minutes = Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (secondsLeft % 60).toString().padStart(2, "0");

  //darken and lighten of the timer dynamic color
  const darkenColor = (color: string, amount: number) => {
    return darken(amount, color);
  };
  const lightenColor = (color: string, amount: number) => {
    return lighten(amount, color);
  };

  // handle play and completeion sound for the timer
  const sounds = {
    start: new Howl({ src: ["/timer-sound/timer-sound.mp3"] }),
    complete: new Howl({ src: ["/timer-sound/alarm-clock.mp3"] }),
  };

  const handlePlayPause = () => {
    setIsPaused(!isPaused);
    if (isPaused) {
      sounds.start.play();
    }
  };

  useEffect(() => {
    if (secondsLeft === 0 && !isPaused) {
      sounds.complete.play();
    }
  }, [secondsLeft, isPaused, sounds.complete]);

  if (isHidden) return;
  return (
    <motion.div
      drag
      dragConstraints={references}
      whileDrag={{ scale: 1.02 }}
      dragElastic={0.1}
      style={{ touchAction: "none" }}
      className="bg-black/30 backdrop-blur-lg rounded-lg p-6 shadow flex flex-col items-center gap-3 border border-white/10"
    >
      <div
        style={{
          borderColor: lightenColor(selectedTimerColor, 0.2),
          color: lightenColor(selectedTimerColor, 0.2),
        }}
        className={`flex items-center border rounded-3xl px-4 py-2 select-none `}
      >
        {mode === "pomodoro" ? (
          <>
            <BrainIcon className="mr-2 h-5 w-5" />
            <p className="text-sm font-base">Focus</p>
          </>
        ) : mode === "shortBreak" ? (
          <>
            <CoffeeIcon className="mr-2 h-5 w-5" />
            <p className="text-sm font-base">Short Break</p>
          </>
        ) : (
          <>
            <Gamepad2Icon className="mr-2 h-5 w-5" />
            <p className="text-sm font-base">Long Break</p>
          </>
        )}
      </div>
      <div className="w-48 h-48">
        <CircularProgressbar
          value={percentage}
          maxValue={100}
          text={`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
            2,
            "0"
          )}`}
          styles={{
            root: {},
            path: {
              stroke: selectedTimerColor,
              strokeLinecap: "round",
              transition: "stroke-dashoffset 0.5s ease 0s",
            },
            trail: {
              stroke: "rgba(255, 255, 255, 0.2)",
            },
            text: {
              fontFamily: clockFace,
              fill: selectedTimerColor,
              fontSize: "24px",
            },
          }}
        />
      </div>
      <div className="flex items-center gap-2">
        <SettingsDialog
          stopTimer={stopTimer}
          timerMode={mode}
          containerRef={references}
        />
        <Button
          type="button"
          style={{ backgroundColor: darkenColor(selectedTimerColor, 0.1) }}
          className={` px-6 py-6 rounded-2xl flex items-center `}
          onClick={handlePlayPause}
        >
          {isPaused ? (
            <PlayIcon strokeWidth={2.5} className="h-5 w-5 text-red-50" />
          ) : (
            <PauseIcon strokeWidth={2.5} className="h-5 w-5 text-red-50" />
          )}
        </Button>
        <Button
          onClick={() => {
            stopTimer();
            switchMode();
          }}
          className="bg-red-50/10 px-4 py-6 rounded-2xl"
        >
          <FastForwardIcon className="h-5 w-5 text-red-50" />
        </Button>
      </div>
    </motion.div>
  );
};

export default Timer;
