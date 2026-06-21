"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@heroui/react';
import { FiStar, FiArrowRight } from 'react-icons/fi';

const BookCard = ({ book }) => {
    if (!book) return null;

    const {
        _id,
        title = 'Untitled Book',
        writerName = 'Unknown Writer',
        description = '',
        image = '',
        price = 0,
        availabilityStatus = 'Available',
        rating = 0,
        genres = [],
    } = book;

    // Safe pricing handling
    const displayPrice = typeof price === 'number'
        ? (price === 0 ? 'Free' : `$${price.toFixed(2)}`)
        : (price ? (price.toString().startsWith('$') ? price : `$${price}`) : 'Free');

    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="group relative flex flex-col justify-between w-full h-[500px] rounded-2xl bg-gradient-to-b from-[#111836] to-[#0b0f24] border border-white/5 hover:border-theme-primary/45 shadow-lg hover:shadow-[0_12px_30px_rgba(78,103,252,0.15)] overflow-hidden transition-all duration-300"
        >
            {/* Subtle Glow Effect on Hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,var(--theme-primary)_0%,transparent_70%)] pointer-events-none" />

            {/* Card Header & Book Cover Area */}
            <div className="relative p-4 pb-0 ">
                <div className="relative w-52.5 aspect-[3/4] mx-auto rounded-xl overflow-hidden shadow-md shadow-black/40 bg-[#070b1e]">
                    {image ? (
                        <Link href={`/books/${book._id}`}>
                            <Image
                                src={'/books/romance.png'}
                                alt={title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                priority={false}
                                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                            />
                        </Link>
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 border border-white/5 text-slate-500 p-4 text-center">
                            <svg className="w-12 h-12 mb-2 opacity-40 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="text-sm font-medium">No Cover Available</span>
                        </div>
                    )}
                </div>

                {/* Availability Badge */}
                <div className="absolute top-2.5 left-2.5 z-10">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide uppercase backdrop-blur-md border ${availabilityStatus?.toLowerCase() === 'available'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                        }`}>
                        {availabilityStatus}
                    </span>
                </div>

                {/* Rating Badge */}
                {rating > 0 && (
                    <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-black/60 text-amber-400 border border-amber-500/20 backdrop-blur-md">
                        <FiStar className="fill-amber-400 stroke-amber-400 w-3 h-3" />
                        <span>{rating.toFixed(1)}</span>
                    </div>
                )}

                {/* Genre Overlay on Bottom of Image */}
                <div className="absolute bottom-2.5 left-2.5 z-10 flex flex-wrap gap-1 max-w-[90%]">
                    {genres.slice(0, 2).map((genre, index) => (
                        <span
                            key={index}
                            className="bg-black/65 border border-white/10 text-white/95 backdrop-blur-sm text-[11px] px-2 py-0.5 rounded-md font-semibold"
                        >
                            {genre}
                        </span>
                    ))}
                </div>
            </div>

            {/* Card Info Details */}
            <div className="p-4 pt-3.5 flex-1 flex flex-col justify-between">
                <div>
                    {/* Writer Info */}
                    <span className="text-xs font-bold text-theme-primary/80 uppercase tracking-widest block mb-1">
                        {writerName}
                    </span>
                    {/* Title */}
                    <Link href={`/books/${book._id}`}>
                    <h4 className="text-lg font-bold text-white group-hover:text-theme-primary transition-colors duration-200 line-clamp-1 mb-1.5">
                        {title}
                    </h4>
                    </Link>
                    {/* Description */}
                    <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">
                        {description}
                    </p>
                </div>

                {/* Card Footer Actions */}
                <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/5 mt-4">
                    {/* Price Info */}
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Price</span>
                        <span className="text-lg font-extrabold text-white tracking-tight">
                            {displayPrice}
                        </span>
                    </div>

                    {/* Action Button */}
                    <Link href={`/books/${book._id}`} className="shrink-0">
                        <Button
                            size="sm"
                            className="bg-gradient-to-r from-theme-secondary-purple to-theme-primary hover:opacity-90 text-white text-sm font-bold rounded-lg px-4 h-9 shadow-md shadow-theme-primary/10 transition-all duration-300 group/btn cursor-pointer"
                        >
                            <span>Details</span>
                            <FiArrowRight className="w-3.5 h-3.5 ml-1 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default BookCard;