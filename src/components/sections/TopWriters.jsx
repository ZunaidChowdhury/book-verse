"use client"; // This line must be at the very top of the file

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionHeading from '../shared/SectionHeading';


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
                        <motion.div
                            key={writer._id || index}
                            variants={itemVariants}
                            className="w-full"
                        >
                            {/* Card Container following frosted-glass layout aesthetics */}
                            <div className="group relative overflow-hidden rounded-md border border-foreground/5 bg-foreground/5 p-8 transition-all duration-300 hover:bg-foreground/10 focus-within:outline-2 focus-within:outline-[var(--theme-primary)]">

                                {/* Visual Rank Badge with secondary gradient overlay */}
                                <div className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-md bg-gradient-to-br from-[var(--theme-primary)] to-[var(--theme-secondary-purple)] text-base font-bold text-white shadow-md shadow-[var(--theme-primary)]/10">
                                    #{index + 1}
                                </div>

                                <div className="flex flex-col items-center text-center gap-4">
                                    {/* Optimized Next.js Avatar Block */}
                                    <div className="relative h-30 w-30 overflow-hidden rounded-md   transition-transform duration-300 group-hover:scale-105">
                                        <Image
                                            src={writer.image || '/default-avatar.png'}
                                            alt={`${writer.name || 'Writer'}'s Avatar`}
                                            fill
                                            sizes="(max-width: 96px) 100vw, 96px"
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Profile Metadata */}
                                    <div className="space-y-1">
                                        <h3 className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
                                            {writer.name}
                                        </h3>
                                        <p className="text-base font-semibold tracking-wider uppercase">
                                            {writer.role || 'Author'}
                                        </p>
                                    </div>

                                    {/* Sales Analytics Track Pill */}
                                    <div className="w-full italic px-4 py-2.5">
                                        <span className="text-2xl font-bold text-theme-primary">
                                            {writer.sales?.toLocaleString() || 80510}
                                        </span>
                                        <div className="text-base">Sales</div>
                                    </div>

                                    {/* Accessible Profile Anchor Button */}
                                    <Link
                                        href={`/writers/${writer._id}`}
                                        className="mt-2 w-full text-center py-2 text-lg font-semibold rounded-md border border-foreground/10 bg-transparent text-foreground/80 transition-all hover:bg-[var(--theme-primary)] hover:text-white hover:border-transparent focus:outline-none focus-visible:outline-2 focus-visible:outline-[var(--theme-primary)]"
                                        aria-label={`View full profile of writer ${writer.name}`}
                                    >
                                        View Profile
                                    </Link>

                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
