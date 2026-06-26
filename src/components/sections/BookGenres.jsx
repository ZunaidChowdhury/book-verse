"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import SectionHeading from '../shared/SectionHeading';

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
    FaRocket, 
    FaChevronRight, 
    FaGhost, // Styled alternative for Horror
    FaCrosshairs, // Clean tactical alternative for Thriller
    FaUserAstronaut, // Unique modern icon for Biography
    FaLandmark, 
    FaFortAwesome // High-fidelity castle alternative for Fantasy
} from 'react-icons/fa';

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
const genresData = [
    { name: 'Fiction', slug: 'fiction', icon: FiBookOpen, style: 'text-purple-500 bg-purple-500/5 group-hover:bg-purple-500/10 border-purple-500/10' },
    { name: 'Mystery', slug: 'mystery', icon: FiSearch, style: 'text-amber-500 bg-amber-500/5 group-hover:bg-amber-500/10 border-amber-500/10' },
    { name: 'Romance', slug: 'romance', icon: FiHeart, style: 'text-pink-500 bg-pink-500/5 group-hover:bg-pink-500/10 border-pink-500/10' },
    { name: 'Sci-Fi', slug: 'sci-fi', icon: FaRocket, style: 'text-sky-500 bg-sky-500/5 group-hover:bg-sky-500/10 border-sky-500/10' },
    { name: 'Fantasy', slug: 'fantasy', icon: FaFortAwesome, style: 'text-red-500 bg-red-500/5 group-hover:bg-red-500/10 border-red-500/10' },
    { name: 'Horror', slug: 'horror', icon: FaGhost, style: 'text-orange-600 bg-orange-600/5 group-hover:bg-orange-600/10 border-orange-600/10' },
    { name: 'Adventure', slug: 'adventure', icon: FiCompass, style: 'text-cyan-500 bg-cyan-500/5 group-hover:bg-cyan-500/10 border-cyan-500/10' },
    { name: 'Thriller', slug: 'thriller', icon: FaCrosshairs, style: 'text-rose-600 bg-rose-600/5 group-hover:bg-rose-600/10 border-rose-600/10' },
    { name: 'Biography', slug: 'biography', icon: FaUserAstronaut, style: 'text-emerald-500 bg-emerald-500/5 group-hover:bg-emerald-500/10 border-emerald-500/10' },
    { name: 'Self Development', slug: 'self-development', icon: FiActivity, style: 'text-orange-500 bg-orange-500/5 group-hover:bg-orange-500/10 border-orange-500/10' },
    { name: 'History', slug: 'history', icon: FaLandmark, style: 'text-violet-500 bg-violet-500/5 group-hover:bg-violet-500/10 border-violet-500/10' },
    { name: 'Technology', slug: 'technology', icon: FiCpu, style: 'text-blue-500 bg-blue-500/5 group-hover:bg-blue-500/10 border-blue-500/10' },
];

export default function BookGenres() {
    return (
        <div className='py-12 tablet:py-30 overflow-hidden bg-background'>
            {/* Root Layout boundary container matching your exact 1400px specification */}
            <div className='mx-auto max-w-[1400px] px-4 tablet:px-6 desktop:px-8'>

                <SectionHeading
                    title='Ebook Genres'
                    subTitle='GENRES'
                    actionTxtBtn={{ text: 'View All', url: '/all-categories' }}
                    classNames='pb-8 tablet:pb-16'
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
                                whileHover={{ y: -6 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                className="w-full"
                            >
                                <Link
                                    href={`/genres/${genre.slug}`}
                                    className="group relative flex h-24 items-center gap-4 rounded-2xl bg-gradient-to-b from-[#111836] to-[#0b0f24] border border-white/5 hover:border-theme-primary/45 p-5 transition-all duration-300 shadow-lg hover:shadow-[0_12px_24px_rgba(78,103,252,0.12)] focus:outline-none focus-visible:outline-2 focus-visible:outline-[var(--theme-primary)] overflow-hidden"
                                    aria-label={`Explore books in the ${genre.name} category`}
                                >
                                    {/* Subtle Glow Effect on Hover */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,var(--theme-primary)_0%,transparent_70%)] pointer-events-none" />

                                    {/* Left Side: Icon Container Box built matching standard book item layout */}
                                    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#070b1e] border border-white/5 text-theme-primary/90 shadow-md shadow-black/40 transition-transform duration-300 group-hover:scale-105">
                                        <IconComponent className="h-5 w-5 transition-transform duration-300 group-hover:rotate-6" />
                                    </div>

                                    {/* Right Side: Category Title Details */}
                                    <div className="overflow-hidden flex-1">
                                        <span className="block truncate text-base font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-theme-primary">
                                            {genre.name}
                                        </span>
                                        <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
                                            Explore Collection
                                        </span>
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
