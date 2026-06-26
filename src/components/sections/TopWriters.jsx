"use client"; // This line must be at the very top of the file

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionHeading from '../shared/SectionHeading';
import WriterCard from '../cards/WriterCard';


// Framer Motion configuration matching your exact bounce physics settings
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        type: 'spring',
        opacity: 1,
        y: 0,
        transition: {
            stiffness: 380,
            damping: 30,
        },
    },
};

export default function TopWriters({ topWriters = [] }) {
    // Defensive check: Ensures exactly 3 elements are passed
    const writersToDisplay = topWriters.slice(0, 3);

    // console.log('topWriters: ', topWriters)

    return (
        <div className='py-12 tablet:py-30 overflow-hidden bg-background'>
            {/* Container holding the maximum layout constraints */}
            <div className='mx-auto max-w-[1400px] px-4 tablet:px-6 desktop:px-8'>

                <SectionHeading
                    title='Top Sellers & Writers'
                    subTitle='TOP WRITERS'
                    actionTxtBtn={{ text: 'View All Writers', url: '/all-writers' }}
                    classNames='pb-8 tablet:pb-16'
                />

                {/* Animated Grid Container using your section layout metrics */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'
                >
                    {writersToDisplay.map((writer, index) => (
                        <WriterCard key={index} writer={writer} index={index} itemVariants={itemVariants} />
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
