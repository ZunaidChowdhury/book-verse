"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";
import { ArrowRight, PencilToSquare } from "@gravity-ui/icons";
import { SlPeople } from "react-icons/sl";
import { LuBookOpen } from "react-icons/lu";
import { IoPersonOutline } from "react-icons/io5";

export default function Slide1({ isDarkMode }) {
    const stats = [
        {
            id: 1,
            value: "10K+",
            label: "Readers",
            icon: <SlPeople className="w-6 h-6 tablet:w-8 tablet:h-8 text-[var(--theme-primary)]" />
        },
        {
            id: 2,
            value: "2K+",
            label: "Ebooks",
            icon: <LuBookOpen className="w-6 h-6 tablet:w-8 tablet:h-8 text-[var(--theme-primary)]" />
        },
        {
            id: 3,
            value: "500+",
            label: "Writers",
            icon: <IoPersonOutline className="w-6 h-6 tablet:w-8 tablet:h-8 text-[var(--theme-primary)]" />
        }
    ];

    return (
        <section className={`relative w-full min-h-auto tablet:min-h-[calc(100vh-5rem)] overflow-hidden flex items-start tablet:items-center transition-all duration-300 ${isDarkMode
                ? 'bg-gradient-to-b from-[#111836] to-[#0b0f24] border-b border-white/5 text-white'
                : 'bg-gradient-to-br from-foreground via-foreground/95 to-[var(--theme-primary)]/5 text-text-primary border-b border-black/5'
            }`}>
            {/* Ambient Background Glow Layer - Matches the card's interactive radial formula */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_30%_30%,var(--theme-primary)_0%,transparent_60%)]" />
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(circle_at_70%_70%,var(--theme-secondary-purple)_0%,transparent_60%)]" />

            {/* Visual Ambient Background Glow Spots */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] tablet:w-[450px] h-[300px] tablet:h-[450px] rounded-full bg-[var(--theme-primary)]/8 blur-[100px] tablet:blur-[130px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] tablet:w-[550px] h-[350px] tablet:h-[550px] rounded-full bg-[var(--theme-secondary-purple)]/8 blur-[110px] tablet:blur-[150px] pointer-events-none" />

            <div className="mx-auto max-w-[1400px] w-full px-4 tablet:px-6 desktop:px-8 py-10 tablet:py-16 desktop:py-20 z-10">
                <div className="grid grid-cols-1 desktop:grid-cols-2 gap-10 desktop:gap-8 items-center">

                    {/* Left Column: Text Content & Statistics */}
                    <div className="flex flex-col items-center text-center desktop:items-start desktop:text-left order-2 desktop:order-1">

                        {/* Tag Badge */}
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-md mb-6 ${isDarkMode ? 'border-white/10 bg-black/40 text-white/95' : 'border-text-primary/10 bg-text-primary/5 text-text-primary/80'
                            }`}>
                            <span className="text-xs font-bold tracking-wide flex items-center gap-1.5">
                                📖 Trusted by Readers & Writers
                            </span>
                        </div>

                        {/* Main Headline Catchphrase */}
                        <h1 className={`text-3xl tablet:text-5xl desktop:text-6xl font-bold tracking-tight leading-[1.2] tablet:leading-[1.15] ${isDarkMode ? 'text-white' : 'text-text-primary'
                            }`}>
                            Discover & Read <br className="hidden tablet:inline" />
                            <span className="bg-gradient-to-r from-[var(--theme-primary)] via-[var(--theme-secondary-purple)] to-blue-400 bg-clip-text text-transparent">
                                Original Ebooks
                            </span>
                        </h1>

                        {/* Description Subtext */}
                        <p className={`mt-4 tablet:mt-6 text-sm tablet:text-base desktop:text-lg max-w-xl font-medium tracking-wide leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-text-primary/70'
                            }`}>
                            Explore thousands of unique stories, novels, guides, and educational ebooks shared by talented writers from around the world.
                        </p>

                        {/* Interactive Call-To-Action Button Links */}
                        <div className="mt-8 flex flex-col tablet:flex-row items-center gap-4 w-full tablet:w-auto">
                            <Link href="/browse-ebooks" className="w-full tablet:w-auto">
                                <Button
                                    className="w-full tablet:w-auto bg-gradient-to-r from-[var(--theme-secondary-purple)] to-[var(--theme-primary)] hover:opacity-95 text-white font-bold text-sm h-12 px-6 rounded-md shadow-lg shadow-[var(--theme-primary)]/20 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[var(--theme-primary)] cursor-pointer group/btn"
                                >
                                    <span>Browse Ebooks</span>
                                    <ArrowRight className="w-4 h-4 ml-0.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                                </Button>
                            </Link>

                            <Link href="/auth/register" className="w-full tablet:w-auto">
                                <Button
                                    className={`w-full tablet:w-auto border bg-transparent font-bold text-sm h-12 px-6 rounded-md transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[var(--theme-primary)] cursor-pointer ${isDarkMode
                                            ? 'border-white/20 hover:border-white/40 text-white hover:bg-white/5'
                                            : 'border-text-primary/20 hover:border-text-primary/40 text-text-primary hover:bg-text-primary/5'
                                        }`}
                                >
                                    <span>Become a Writer</span>
                                    <PencilToSquare className={`w-4 h-4 ml-0.5 ${isDarkMode ? 'text-slate-400' : 'text-text-primary/60'}`} />
                                </Button>
                            </Link>
                        </div>

                        {/* Counter Analytics Footer Grid */}
                        <div className={`mt-12 tablet:mt-16 w-full pt-8 border-t flex flex-col tablet:flex-row items-center justify-between gap-6 max-w-2xl ${isDarkMode ? 'border-white/5' : 'border-text-primary/10'
                            }`}>
                            {stats.map((stat, index) => (
                                <React.Fragment key={stat.id}>
                                    {index > 0 && (
                                        <div className={`hidden tablet:block w-[1px] h-10 shrink-0 self-center ${isDarkMode ? 'bg-white/10' : 'bg-text-primary/10'
                                            }`} />
                                    )}

                                    <div className="flex items-center gap-4 w-full tablet:w-auto justify-center tablet:first:justify-start tablet:last:justify-end">
                                        <div className={`w-12 h-12 tablet:w-14 tablet:h-14 rounded-md flex items-center justify-center shrink-0 border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-text-primary/5 border-text-primary/5'
                                            }`}>
                                            {stat.icon}
                                        </div>
                                        <div className="text-left">
                                            <h4 className={`text-xl tablet:text-2xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-text-primary'
                                                }`}>
                                                {stat.value}
                                            </h4>
                                            <p className={`text-xs tablet:text-sm font-medium tracking-wide ${isDarkMode ? 'text-slate-500' : 'text-text-primary/50'
                                                }`}>
                                                {stat.label}
                                            </p>
                                        </div>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Isolated Artwork Scene */}
                    <div className="w-full flex justify-center order-1 desktop:order-2 max-w-[260px] tablet:max-w-[500px] desktop:max-w-full mx-auto max-h-[320px] tablet:max-h-none">
                        <div className="relative w-full aspect-square overflow-hidden">
                            <Image
                                src='/book-verse-cover-image.png'
                                alt='BookVerse Cover Artwork illustration'
                                fill
                                priority
                                sizes="(max-w-768px) 320px, (max-w-1200px) 500px, 700px"
                                className="object-contain"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
