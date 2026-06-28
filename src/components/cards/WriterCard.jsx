
import Image from 'next/image';
import { motion } from 'framer-motion';

import { CheckCircle2 } from 'lucide-react';
import { FiArrowRight, FiInstagram, FiFacebook } from 'react-icons/fi';
import { SiX } from 'react-icons/si';
import { useSelector } from "react-redux";
// Use your exact card motion physical parameters
const cardTransition = { type: 'spring', stiffness: 300, damping: 20 };

export default function WriterCard({ writer, index, itemVariants }) {
    const { isDark } = useSelector((state) => state.theme);
    return (
        <motion.div
            key={writer._id || index}
            variants={itemVariants}
            whileHover={{ y: -6 }}
            transition={cardTransition}
            className="w-full"
        >
            <div className={`group relative flex flex-col items-center p-6 w-full transition-all duration-300 shadow-md hover:shadow-xl rounded-lg border
        ${isDark
                    ? 'bg-gradient-to-b from-[#111836] to-[#0b0f24] border-white/5 hover:border-[var(--theme-primary)]/45'
                    : 'bg-white border-black/5 hover:border-[var(--theme-primary)]/30'
                }`}
            >

                <div className="absolute top-6 left-6 z-10 flex h-10 w-fit px-3 rounded-xl bg-black/80  items-center justify-center text-sm font-bold text-white shadow-md shadow-[var(--theme-primary)]/20">
                    Rank #{index + 1}
                </div>
                {/* 1. Profile Avatar Circle */}
                <div className="relative h-24 w-24 overflow-hidden rounded-full border border-black/5 shadow-inner mb-4">
                    <Image
                        src={writer.image || '/default-avatar.png'}
                        alt={`${writer.name || 'Writer'}'s Avatar`}
                        fill
                        sizes="96px"
                        priority={index < 4}
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                </div>

                {/* 2. Identity Name with Verified Badge matching design */}
                <div className="mb-4 flex items-center justify-center gap-1.5 w-full">
                    <h3 className={` text-lg font-bold tracking-tight line-clamp-1
            ${isDark ? 'text-white' : 'text-slate-900'}`}
                    >
                        {writer.name}
                    </h3>
                    {/* Blue verification check icon from layout image */}
                    <CheckCircle2 className="h-6 w-6 text-white fill-blue-500 stroke-[3] shrink-0" />
                </div>

                {/* Writer Role Header */}
                <span className="text-xs font-bold text-theme-primary/80 uppercase tracking-widest block mb-1">
                    {writer.role || 'Writer'}
                </span>

                {/* 4. Short Description Biography Block */}
                <p className={`mb-4 text-xs sm:text-sm font-medium text-center line-clamp-2 max-w-[240px] mb-6 min-h-[40px]
          ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
                >
                    {writer.bio || 'Dark storyteller with a passion for mystery and horror.'}
                </p>

                {/* Circular Social Media Icon Buttons Panel */}
                <div className="flex items-center justify-center gap-3 mb-5">
                    <a
                        href={writer.socials?.x || 'https://x.com'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-black/80 border border-white/10 text-white/70 hover:bg-black/60 hover:text-white hover:border-[var(--theme-primary)] transition-all duration-300"
                        title={`Follow ${writer.name} on X`}
                    >
                        <SiX className="w-3.5 h-3.5" />
                    </a>
                    <a
                        href={writer.socials?.instagram || 'https://instagram.com'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-black/80 border border-white/10 text-white/70 hover:bg-black/60 hover:text-white hover:border-[var(--theme-primary)] transition-all duration-300"
                        title={`Follow ${writer.name} on Instagram`}
                    >
                        <FiInstagram className="w-3.5 h-3.5" />
                    </a>
                    <a
                        href={writer.socials?.facebook || 'https://facebook.com'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-black/80 border border-white/10 text-white/70 hover:bg-black/60 hover:text-white hover:border-[var(--theme-primary)] transition-all duration-300"
                        title={`Follow ${writer.name} on Facebook`}
                    >
                        <FiFacebook className="w-3.5 h-3.5" />
                    </a>
                </div>

                {/* 3. Core Stats Dashboard Panel split by subtle center divider */}
                <div className={`flex items-center justify-center w-full grid-cols-2 text-center mb-5 border-y py-3 gap-0
          ${isDark ? 'border-white/5' : 'border-black/5'}`}
                >
                    {/* Books Metrics Column */}
                    <div className="flex-1 flex flex-col items-center justify-center border-r border-inherit">
                        <span className={`text-base font-extrabold tracking-tight
              ${isDark ? 'text-white' : 'text-slate-900'}`}
                        >
                            {writer.booksPublished || '31'}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-400 mt-0.5">
                            Books
                        </span>
                    </div>

                    {/* Sales Metrics Column */}
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <span className={`text-base font-extrabold tracking-tight
              ${isDark ? 'text-white' : 'text-slate-900'}`}
                        >
                            {writer.sales ? `${(writer.sales / 1000).toFixed(1)}K` : '17.2K'}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-400 mt-0.5">
                            Sales
                        </span>
                    </div>
                </div>



                {/* 5. Minimalist Follow Action Button */}
                <button
                    className={`w-full font-bold text-sm py-2 px-4 transition-all duration-300 border bg-transparent rounded-lg cursor-pointer
            ${isDark
                            ? 'text-[var(--theme-primary)] border-[var(--theme-primary)]/40 hover:bg-[var(--theme-primary)]/10'
                            : 'text-[var(--theme-primary)] border-[var(--theme-primary)]/40 hover:bg-[var(--theme-primary)] hover:text-white'
                        }`}
                    aria-label={`Follow ${writer.name}`}
                >
                    Follow
                </button>
            </div>
        </motion.div>
    );
}
