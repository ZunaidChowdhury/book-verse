"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import SectionHeading from '../shared/SectionHeading';
import { useSelector } from "react-redux";
// Fully replaced with premium React Icons mappings
import {
    FiBookOpen,
    FiSearch,
    FiHeart,
    FiActivity, // Clean modern replacement for Self Development
    FiCompass,
    FiCpu
} from 'react-icons/fi';



import {
    Compass, Landmark, GraduationCap, User, Skull, ShieldAlert, Cpu,
    Search, Wand2, BookOpen, Flame, Heart, Rocket, Zap, HelpCircle,
    HelpCircle as FallbackIcon
} from "lucide-react";
import {
    FaGhost, FaCrosshairs, FaUserAstronaut, FaHistory,
    FaEye, FaRobot, FaUserFriends, FaMask
} from "react-icons/fa";
import {
    GiHourglass, GiSteampunkGoggles, GiAmphora, GiBrain,
    GiSwordInStone, GiGalaxy
} from "react-icons/gi";


// Framer Motion staggered variants matching your exact layout specifications
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05, // Faster stagger for 12 items to optimize feel
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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

// Data array mapping out your categories with responsive hover presets
export const genresData = [
    { name: "Adventure", slug: "adventure", icon: Compass, style: "text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
    { name: "Ancient Civilizations", slug: "ancient-civilizations", icon: Landmark, style: "text-amber-700 dark:text-amber-400 bg-amber-500/10 border-amber-500/20" },
    // { name: "Archaeology", slug: "archaeology", icon: GiAmphora, style: "text-yellow-700 dark:text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
    { name: "Biography", slug: "biography", icon: User, style: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    // { name: "Cosmic Horror", slug: "cosmic-horror", icon: FaEye, style: "text-indigo-700 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
    { name: "Crime", slug: "crime", icon: ShieldAlert, style: "text-red-600 dark:text-red-400 bg-red-500/10 border-red-500/20" },
    { name: "Cyberpunk", slug: "cyberpunk", icon: FaRobot, style: "text-fuchsia-600 dark:text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20" },
    { name: "Detective Fiction", slug: "detective-fiction", icon: Search, style: "text-zinc-700 dark:text-zinc-400 bg-zinc-500/10 border-zinc-500/20" },
    { name: "Fantasy", slug: "fantasy", icon: Wand2, style: "text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20" },
    { name: "Fiction", slug: "fiction", icon: BookOpen, style: "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20" },
    { name: "History", slug: "history", icon: FaHistory, style: "text-stone-600 dark:text-stone-400 bg-stone-500/10 border-stone-500/20" },
    { name: "Horror", slug: "horror", icon: FaGhost, style: "text-orange-600 dark:text-orange-400 bg-orange-500/10 border-orange-500/20" },
    { name: "Leadership", slug: "leadership", icon: GraduationCap, style: "text-teal-600 dark:text-teal-400 bg-teal-500/10 border-teal-500/20" },
    // { name: "Military Strategy", slug: "military-strategy", icon: GiSwordInStone, style: "text-red-700 dark:text-red-400 bg-red-600/10 border-red-600/20" },
    { name: "Mystery", slug: "mystery", icon: FaMask, style: "text-violet-600 dark:text-violet-400 bg-violet-500/10 border-violet-500/20" },
    // { name: "Non-Fiction", slug: "non-fiction", icon: BookOpen, style: "text-sky-700 dark:text-sky-400 bg-sky-500/10 border-sky-500/20" },
    // { name: "Personal Development", slug: "personal-development", icon: Zap, style: "text-lime-600 dark:text-lime-400 bg-lime-500/10 border-lime-500/20" },
    { name: "Psychology", slug: "psychology", icon: GiBrain, style: "text-pink-600 dark:text-pink-400 bg-pink-500/10 border-pink-500/20" },
    { name: "Relationships", slug: "relationships", icon: FaUserFriends, style: "text-rose-500 dark:text-rose-400 bg-rose-500/10 border-rose-500/20" },
    { name: "Romance", slug: "romance", icon: Heart, style: "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20" },
    { name: "Sci-Fi", slug: "sci-fi", icon: Rocket, style: "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
    { name: "Science", slug: "science", icon: Cpu, style: "text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    // { name: "Science Fiction", slug: "science-fiction", icon: Rocket, style: "text-sky-600 dark:text-sky-400 bg-sky-500/10 border-sky-500/20" },
    { name: "Self Development", slug: "self-development", icon: Zap, style: "text-orange-500 dark:text-orange-400 bg-orange-500/10 border-orange-500/20" },
    // { name: "Self-Help", slug: "self-help", icon: HelpCircle, style: "text-green-600 dark:text-green-400 bg-green-500/10 border-green-500/20" },
    // { name: "Space Opera", slug: "space-opera", icon: GiGalaxy, style: "text-violet-700 dark:text-violet-400 bg-violet-500/10 border-violet-500/20" },
    // { name: "Steampunk", slug: "steampunk", icon: GiSteampunkGoggles, style: "text-amber-800 dark:text-amber-500 bg-amber-600/10 border-amber-600/20" },
    // { name: "Supernatural", slug: "supernatural", icon: Flame, style: "text-red-500 dark:text-red-400 bg-red-500/10 border-red-500/20" },
    { name: "Technology", slug: "technology", icon: Cpu, style: "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20" },
    { name: "Thriller", slug: "thriller", icon: FaCrosshairs, style: "text-rose-700 dark:text-rose-400 bg-rose-500/10 border-rose-500/20" },
    // { name: "Time Travel", slug: "time-travel", icon: GiHourglass, style: "text-cyan-700 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/20" }
];

export default function BookGenres() {
      const { isDark } = useSelector((state) => state.theme);
    return (
        <div className='py-12 tablet:py-30 overflow-hidden bg-theme-background'>
            {/* Root Layout boundary container matching your exact 1400px specification */}
            <div className='mx-auto max-w-[1400px] px-4 tablet:px-6 desktop:px-8'>

                <SectionHeading
                    title='Ebook Genres'
                    subTitle='GENRES'
                    actionTxtBtn={{ text: 'View All', url: '/all-categories' }}
                    classNames='pb-8 tablet:pb-16'
                              dark={true}
                />

                {/* Responsive Grid System mirroring your standard design framework layout */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className='grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-6'
                >
                    {genresData.map((genre) => {
                        const IconComponent = genre.icon;
                        return (
                            <motion.div
                                key={genre.slug}
                                variants={itemVariants}
                                whileHover={{ y: -5 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                                className="w-full "
                            >
                                <Link
                                    href={`/books?genres=${genre.slug}&limit=9`}
                                    className={`bg-[#111836] rounded-lg group relative flex h-24 items-center gap-4 border p-5 transition-all duration-300 shadow-sm  focus-visible:outline-2 focus-visible:outline-[var(--theme-primary)] overflow-hidden
                  ${isDark
                                            ? ' border-white/5 hover:border-[var(--theme-primary)]/45'
                                            : ' border-black/5 hover:border-[var(--theme-primary)]/30'
                                        }`}
                                    aria-label={`Explore books in the ${genre.name} category`}
                                >

                                    {/* 1. Icon container featuring light backdrop tint with deep text-contrast coloring */}
                                    <div className={`rounded-lg relative flex h-12 w-12 shrink-0 items-center justify-center border transition-transform duration-300 group-hover:scale-105  ${genre.style}`}>
                                        <IconComponent className="h-5 w-5 transition-transform duration-300 group-hover:rotate-6" />
                                    </div>

                                    {/* 2. Text layout wrapper featuring adaptive dark/light typography scaling */}
                                    <div className="overflow-hidden flex-1">
                                        <span className={`block truncate text-base font-bold tracking-tight transition-colors duration-200 group-hover:text-[var(--theme-primary)]
                    text-white`}>
                                            {genre.name}
                                        </span>
                                        {/* <span className={`block text-[11px] font-semibold uppercase tracking-wider mt-0.5
                    ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                            Explore Collection
                                        </span> */}
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
}
