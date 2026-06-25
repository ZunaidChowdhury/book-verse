"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";
import { ArrowRight } from "@gravity-ui/icons";

export default function GroundedHero({ isDarkMode }) {
    return (
        <section className={`relative w-full min-h-[calc(100vh-5rem)] overflow-hidden flex items-center transition-all duration-300 ${
            isDarkMode
                ? 'bg-gradient-to-b from-[#111836] to-[#0b0f24] border-b border-white/5 text-white'
                : 'bg-gradient-to-br from-foreground via-foreground/95 to-[var(--theme-primary)]/5 text-text-primary border-b border-black/5'
        }`}>
            {/* Ambient Background Glow Layer - Card radial style formula */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_30%_30%,var(--theme-primary)_0%,transparent_60%)]" />
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(circle_at_70%_70%,var(--theme-secondary-purple)_0%,transparent_60%)]" />

            {/* Visual Ambient Background Glow Spots - Calibrated brand blurs */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] tablet:w-[450px] h-[300px] tablet:h-[450px] rounded-full bg-[var(--theme-primary)]/8 blur-[100px] tablet:blur-[130px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] tablet:w-[550px] h-[350px] tablet:h-[550px] rounded-full bg-[var(--theme-secondary-purple)]/8 blur-[110px] tablet:blur-[150px] pointer-events-none" />

            <div className="mx-auto max-w-[1400px] w-full px-4 tablet:px-6 desktop:px-8 py-10 tablet:py-16 desktop:py-20 z-10">
                <div className="grid grid-cols-1 desktop:grid-cols-2 gap-10 desktop:gap-8 items-center">

                    {/* ==========================================
                        LEFT COLUMN: TEXT CONTENT & ACTION
                       ========================================== */}
                    <div className="flex flex-col items-center text-center desktop:items-start desktop:text-left order-2 desktop:order-1">

                        {/* Main Headline Catchphrase */}
                        <h1 className={`text-3xl tablet:text-5xl desktop:text-6xl font-bold tracking-tight leading-[1.2] tablet:leading-[1.15] ${
                            isDarkMode ? 'text-white' : 'text-text-primary'
                        }`}>
                            Become the <br />
                            <span className="bg-gradient-to-r from-[var(--theme-primary)] via-[var(--theme-secondary-purple)] to-blue-400 bg-clip-text text-transparent">
                                Grounded Man
                            </span>
                        </h1>

                        {/* Description Subtext */}
                        <p className={`mt-4 tablet:mt-6 text-sm tablet:text-base desktop:text-lg max-w-xl font-medium tracking-wide leading-relaxed ${
                            isDarkMode ? 'text-slate-400' : 'text-text-primary/70'
                        }`}>
                            Master the proven 7-step system to stop being the &ldquo;Nice Guy,&rdquo; build unstoppable confidence, and attract the woman of your dreams.
                        </p>

                        {/* Interactive Call-To-Action Button Links */}
                        <div className="mt-8 flex flex-col tablet:flex-row items-center gap-4 w-full tablet:w-auto">
                            <Link href="/browse-ebooks" className="w-full tablet:w-auto">
                                <Button
                                    className="w-full tablet:w-auto bg-gradient-to-r from-[var(--theme-secondary-purple)] to-[var(--theme-primary)] hover:opacity-95 text-white font-bold text-sm h-12 px-6 rounded-md shadow-lg shadow-[var(--theme-primary)]/20 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[var(--theme-primary)] cursor-pointer group/btn"
                                >
                                    <span>Explore Books</span>
                                    <ArrowRight className="w-4 h-4 ml-0.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* ==========================================
                        RIGHT COLUMN: ISOLATED ARTWORK SCENE
                       ========================================== */}
                    <div className="w-full flex justify-center order-1 desktop:order-2 max-w-[320px] tablet:max-w-[450px] desktop:max-w-full mx-auto">
                        <div className="relative w-full aspect-square flex items-center justify-center filter drop-shadow-[0_25px_25px_rgba(78,103,252,0.15)] transition-transform duration-500 hover:scale-[1.02]">
                            <Image
                                src="/book-verse-cover-image-2.png"
                                alt="The Dating Playbook for Men Book Cover"
                                fill
                                priority
                                sizes="(max-w-768px) 320px, (max-w-1200px) 450px, 600px"
                                className="object-contain"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
