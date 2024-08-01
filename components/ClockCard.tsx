import React, { useEffect, useState } from 'react'
import '../app/globals.css'
import moment from 'moment'
import { motion } from 'framer-motion'

const ClockCard = ({ references, hide }: { references: any, hide?: boolean }) => {
    const [currentTime, setCurrentTime] = useState(moment().format('hh:mm A'))
    const [currentDate, setCurrentDate] = useState(moment().format('dddd, DD.MM.YYYY'))

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(moment().format('hh:mm A'))
            setCurrentDate(moment().format('dddd, DD.MM.YYYY'))
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    const [hour, minute, zone] = currentTime.split(/[: ]/)

    return (
        <motion.div
            drag
            dragConstraints={references}
            whileDrag={{ scale: 1.05 }}
            dragElastic={0.5}
            style={{ touchAction: "none" }}
            className={`p-8 w-72 rounded-lg bg-black bg-opacity-40 flex flex-col items-center justify-center backdrop-blur-md backdrop-filter cursor-grab ${hide ? 'hidden' : 'block '}`}
        >
            <div className="flex items-center justify-center">
                <span className="text-sm font-semibold flex items-baseline justify-center gap-3 font-oswald text-white">
                    <p className="text-7xl">{hour}</p>
                    <p className="text-7xl font-normal text-white/70">:</p>
                    <p className="text-7xl">{minute}</p>
                    <p className="font-normal text-white/70">{zone}</p>
                </span>
            </div>
            <div className="flex items-center justify-center font-base pt-1">
                <p className="flex items-center justify-center gap-2 text-white/50">
                    <span>{currentDate}</span>
                </p>
            </div>
        </motion.div>
    )
}

export default ClockCard
