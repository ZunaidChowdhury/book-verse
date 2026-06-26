import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { FiArrowRight, FiInstagram, FiFacebook } from 'react-icons/fi';
import { SiX } from 'react-icons/si';
import { Button } from '@heroui/react';

// Use your exact card motion physical parameters
const cardTransition = { type: 'spring', stiffness: 300, damping: 20 };

export default function WriterCard({ writer, index, itemVariants }) {
    return (
        <motion.div
            key={writer._id || index}
            variants={itemVariants}
            whileHover={{ y: -8 }}
            transition={cardTransition}
            className="w-full"
        >
            <div className="group relative flex flex-col justify-between w-full rounded-2xl bg-gradient-to-b from-[#111836] to-[#0b0f24] border border-white/5 hover:border-theme-primary/45 shadow-lg hover:shadow-[0_12px_30px_rgba(78,103,252,0.15)] overflow-hidden transition-all duration-300">

                {/* Subtle Glow Effect on Hover */}
                {/* <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,var(--theme-primary)_0%,transparent_70%)] pointer-events-none" /> */}

                {/* Card Header & Avatar Area */}
                <div className="relative p-6 pb-0">
                    {/* Visual Rank Badge with secondary gradient overlay */}
                    <div className="absolute top-4 left-4 z-10 flex h-10 w-fit px-3 rounded-xl bg-black/30 border border-theme-primary backdrop-blur-lg items-center justify-center text-sm font-bold text-white shadow-md shadow-[var(--theme-primary)]/20">
                        Rank {index + 1}
                    </div>

                    {/* Optimized Next.js Avatar Block inside BookVerse standard rounded-xl layout */}
                    <div className="relative h-28 w-28 mx-auto overflow-hidden rounded-full ">
                        <Image
                            src={writer.image || '/default-avatar.png'}
                            alt={`${writer.name || 'Writer'}'s Avatar`}
                            fill
                            sizes="(max-width: 768px) 100vw, 112px"
                            priority={false}
                            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                    </div>
                </div>

                {/* Profile Details Content Box */}
                <div className="p-6 pt-4 flex-1 flex flex-col justify-between text-center">
                    <div>
                        {/* Writer Role Header */}
                        <span className="text-xs font-bold text-theme-primary/80 uppercase tracking-widest block mb-1">
                            {writer.role || 'Author'}
                        </span>

                        {/* Profile Identity Name */}
                        <h3 className="text-xl font-bold text-white tracking-tight line-clamp-1 mb-3">
                            {writer.name}
                        </h3>

                        {/* Circular Social Media Icon Buttons Panel */}
                        <div className="flex items-center justify-center gap-3 mb-5">
                            <a
                                href={writer.socials?.x || 'https://x.com'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-8 h-8 rounded-full bg-black/40 border border-white/10 text-white/70 hover:bg-black/60 hover:text-white hover:border-[var(--theme-primary)] transition-all duration-300"
                                title={`Follow ${writer.name} on X`}
                            >
                                <SiX className="w-3.5 h-3.5" />
                            </a>
                            <a
                                href={writer.socials?.instagram || 'https://instagram.com'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-8 h-8 rounded-full bg-black/40 border border-white/10 text-white/70 hover:bg-black/60 hover:text-white hover:border-[var(--theme-primary)] transition-all duration-300"
                                title={`Follow ${writer.name} on Instagram`}
                            >
                                <FiInstagram className="w-3.5 h-3.5" />
                            </a>
                            <a
                                href={writer.socials?.facebook || 'https://facebook.com'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-8 h-8 rounded-full bg-black/40 border border-white/10 text-white/70 hover:bg-black/60 hover:text-white hover:border-[var(--theme-primary)] transition-all duration-300"
                                title={`Follow ${writer.name} on Facebook`}
                            >
                                <FiFacebook className="w-3.5 h-3.5" />
                            </a>
                        </div>

                        {/* Stats Dashboard Grid (Small Info Cards) */}
                        <div className="grid grid-cols-2 gap-2.5 mb-2 text-left">
                            <div className="p-3 rounded-xl bg-black/30 border border-white/5 flex flex-col justify-center">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">Books</span>
                                <span className="text-sm font-extrabold text-white tracking-tight">
                                    {writer.booksPublished?.toLocaleString() || '12'}
                                </span>
                            </div>
                            <div className="p-3 rounded-xl bg-black/30 border border-white/5 flex flex-col justify-center">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">Sales</span>
                                <span className="text-sm font-extrabold text-white tracking-tight">
                                    {writer.sales?.toLocaleString() || '80,510'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="flex flex-col gap-3 pt-4 border-t border-white/5 mt-auto">
                        {/* Accessible Profile Action Button using your gradient style configuration */}
                        <Link href={`/writers/${writer._id}`} className="w-full block">
                            <Button
                                size="sm"
                                className="w-full bg-gradient-to-r from-theme-secondary-purple to-theme-primary hover:opacity-90 text-white text-sm font-bold rounded-lg h-10 shadow-md shadow-theme-primary/10 transition-all duration-300 group/btn cursor-pointer"
                                aria-label={`View full profile of writer ${writer.name}`}
                            >
                                <span>View Profile</span>
                                <FiArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                            </Button>
                        </Link>
                    </div>

                </div>
            </div>
        </motion.div>
    );
}
