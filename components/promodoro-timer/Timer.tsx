import { BrainIcon, CoffeeIcon, FastForwardIcon, Gamepad2Icon, PauseIcon, PlayIcon, Settings2Icon, Ticket } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useAppStore } from '@/(store)/App';
import { motion, useDragControls } from 'framer-motion'

const Timer = ({ references, isHidden }: { references: any, isHidden?: boolean }) => {

    const [isPaused, setIsPaused] = useState(true);
    const [secondsLeft, setSecondsLeft] = useState(0);
    const [mode, setMode] = useState<'pomodoro' | 'shortBreak' | 'longBreak'>('pomodoro');

    const secondsLeftRef = useRef(secondsLeft);
    const isPausedRef = useRef(isPaused);
    const modeRef = useRef(mode);

    const { pomodoroTime, setPomodoroTime, shortBreakTime, setShortBreakTime, longBreakTime, setLongBreakTime } = useAppStore((state) => ({
        pomodoroTime: state.pomodoroTime,
        setPomodoroTime: state.setPomodoroTime,
        shortBreakTime: state.shortBreakTime,
        setShortBreakTime: state.setShortBreakTime,
        longBreakTime: state.longBreakTime,
        setLongBreakTime: state.setLongBreakTime
    }))

    const stopTimer = () => {
        //stop the timer
        setIsPaused(true);
        isPausedRef.current = true;
    }

    const switchMode = useCallback(() => {
        let nextMode: 'pomodoro' | 'shortBreak' | 'longBreak';
        if (modeRef.current === 'pomodoro') {
            nextMode = 'shortBreak';
        } else if (modeRef.current === 'shortBreak') {
            nextMode = 'longBreak';
        } else {
            nextMode = 'pomodoro';
        }

        const nextSeconds = nextMode === 'pomodoro' ?
            pomodoroTime * 60 : nextMode === 'shortBreak' ?
                shortBreakTime * 60 : longBreakTime * 60

        stopTimer();

        // Switch mode and reset the timer
        setMode(nextMode);
        setSecondsLeft(nextSeconds);
        modeRef.current = nextMode;
        secondsLeftRef.current = nextSeconds;
    }, [pomodoroTime, shortBreakTime, longBreakTime]);

    const tick = useCallback(() => {
        if (secondsLeftRef.current > 0) {
            secondsLeftRef.current--;
            setSecondsLeft(secondsLeftRef.current);
        } else {
            switchMode();
        }
    }, [switchMode]);

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
        mode === 'pomodoro'
            ? pomodoroTime * 60
            : mode === 'shortBreak'
                ? shortBreakTime * 60
                : longBreakTime * 60;

    const percentage = Math.round((secondsLeft / totalSeconds) * 100);
    const minutes = Math.floor(secondsLeft / 60)
        .toString()
        .padStart(2, '0');
    const seconds = (secondsLeft % 60).toString().padStart(2, '0');

    const SettingsDialog = () => {
        return (
            <Dialog>
                <DialogTrigger asChild >
                    <Button onClick={() => stopTimer()} className='bg-red-50/10 px-4 py-6 rounded-2xl'>
                        <Settings2Icon className="h-5 w-5 text-red-50" />
                    </Button>
                </DialogTrigger>
                <DialogContent
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
                                    value={pomodoroTime}
                                    autoFocus
                                    id="pomodoro"
                                    type="number"
                                    min={5}
                                    onChange={((e) => {
                                        e.stopPropagation();
                                        setPomodoroTime(Number(e.target.value));
                                    })}
                                />
                            </span>
                            <span className="flex flex-col gap-1">
                                <Label htmlFor="short-break" className="font-base text-xs text-slate-300 font-medium">
                                    Short Break
                                </Label>
                                <Input
                                    className="bg-black/10 border-white/10"
                                    type="number"
                                    id="short-break"
                                    defaultValue={shortBreakTime}
                                    onChange={(e) => {
                                        e.stopPropagation();
                                        setShortBreakTime(Number(e.target.value));
                                    }}
                                />
                            </span>
                            <span className="flex flex-col gap-1">
                                <Label htmlFor="long-break" className="font-base text-xs text-slate-300 font-medium">
                                    Long Break
                                </Label>
                                <Input
                                    className="bg-black/10 border-white/10"
                                    type="number"
                                    id="long-break"
                                    defaultValue={longBreakTime}
                                    onChange={(e) => {
                                        e.stopPropagation();
                                        setLongBreakTime(Number(e.target.value));
                                    }}
                                />
                            </span>
                        </div>
                    </div>
                    <span className="flex justify-between w-full items-center">
                        <Label className="font-base text-slate-300 font-medium">Color</Label>
                        <div className="flex gap-3">
                            <span className="bg-[#f43f5e] hover:bg-rose-600 w-8 h-8 rounded-full"></span>
                            <span className="bg-[#22c55e] hover:bg-green-600 w-8 h-8 rounded-full"></span>
                            <span className="bg-[#60a5fa] hover:bg-blue-500 w-8 h-8 rounded-full"></span>
                        </div>
                    </span>
                    <Button className="bg-red-50/10 hover:bg-black/30 rounded-md">Apply Changes</Button>
                </DialogContent>
            </Dialog>
        )
    }

    if (isHidden) return;
    return (
        <motion.div
            drag
            dragConstraints={references}
            whileDrag={{ scale: 1.02 }}
            dragElastic={0.1}
            style={{ touchAction: "none" }}
            className='bg-black/30 backdrop-blur-lg rounded-lg p-6 shadow flex flex-col items-center gap-3 border border-white/10'>
            <div className={`flex items-center text-red-50 border rounded-3xl px-4 py-2 select-none ${mode === 'pomodoro' ? 'border-rose-300 text-rose-300' : mode === 'shortBreak' ? 'border-green-300 text-green-300' : 'border-blue-300 text-blue-300'}`}>
                {
                    mode === 'pomodoro' ? (
                        <>
                            <BrainIcon className="mr-2 h-5 w-5" />
                            <p className='text-sm font-base'>Focus</p>
                        </>
                    ) : mode === 'shortBreak' ? (
                        <>
                            <CoffeeIcon className="mr-2 h-5 w-5" />
                            <p className='text-sm font-base'>Short Break</p>
                        </>
                    ) : (
                        <>
                            <Gamepad2Icon className="mr-2 h-5 w-5" />
                            <p className='text-sm font-base'>Long Break</p>
                        </>
                    )
                }
            </div>
            <div className='w-48 h-48'>
                <CircularProgressbar
                    value={percentage}
                    maxValue={100}
                    text={`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}
                    styles={buildStyles({
                        textColor: '#FFF2F2',
                        textSize: '24px',
                        pathColor: mode === 'pomodoro'
                            ? '#FF4C4C'
                            : mode === 'shortBreak'
                                ? '#4DDA6E'
                                : '#4CACFF',
                        trailColor: 'rgba(255, 255, 255, 0.2)',
                    })}
                />
            </div>
            <div className='flex items-center gap-2'>
                <SettingsDialog />
                <Button type='button'
                    className={` px-6 py-6 rounded-2xl flex items-center ${mode === 'pomodoro' ? 'bg-rose-600 hover:bg-rose-700' : mode === 'shortBreak' ? 'bg-green-600 hover:bg-green-700' : 'bg-indigo-500 hover:bg-indigo-600'}`}
                    onClick={() => setIsPaused(!isPaused)}
                >
                    {isPaused ?
                        <PlayIcon strokeWidth={2.5} className="h-5 w-5 text-red-50" /> :
                        <PauseIcon strokeWidth={2.5} className="h-5 w-5 text-red-50" />}
                </Button>
                <Button
                    onClick={() => {
                        stopTimer();
                        switchMode();
                    }}
                    className='bg-red-50/10 px-4 py-6 rounded-2xl'
                >
                    <FastForwardIcon className="h-5 w-5 text-red-50" />
                </Button>
            </div>
        </motion.div>
    )
}

export default Timer
