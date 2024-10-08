import { QuoteIcon } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { Skeleton } from './ui/skeleton';
import { motion, useDragControls } from 'framer-motion'

const QuoteCard = ({ references, hide }: { references: any, hide?: boolean }) => {
    const [quote, setQuote] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getQuote();
    },[]);

    // generate any random quote
    const getQuote = async () => {
        try {
            const url = `https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json`
            const response = await fetch(url);
            const data = await response.json();
            const randomQuote = data.quotes[Math.floor(Math.random() * data.quotes.length)];
            setQuote(randomQuote.quote);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching quote:", error);
            setLoading(false);
        }
    }

    return (
        <motion.div
            drag
            dragConstraints={references}
            whileDrag={{ scale: 1.02 }}
            dragElastic={0.1}
            style={{ touchAction: "none" }}
            className={`w-[336px] max-w-md rounded-lg backdrop-blur-lg bg-black/40 flex flex-col items-start p-8 relative cursor-grab ${hide ? 'hidden' : 'block '}`}>
            <div className='space-y-3 w-full'>
                <QuoteIcon className="w-8 h-8 text-primary-foreground" />
                {!loading ? (
                    <>
                        <p className='text-xl font-sans-secondary font-medium leading-tight text-primary-foreground'>
                            {quote}
                        </p>
                    </>
                ) : (
                    <div className='flex flex-col gap-2 w-full'>
                        <Skeleton className='w-full h-5' />
                        <Skeleton className='w-11/12 h-5' />
                        <Skeleton className='w-2/3 h-5' />
                    </div>
                )}
            </div>
        </motion.div>
    )
}

export default QuoteCard
