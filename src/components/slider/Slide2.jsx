"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";
import { ArrowRight } from "@gravity-ui/icons";

export default function Slide2() {
    return (
        <section className="relative w-full min-h-[calc(100vh-5rem)] bg-gradient-to-r from-theme-background via-theme-background to-[#06091a] text-white overflow-hidden flex items-center">

            {/* Visual Ambient Background Glow Spots */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#9945FF]/5 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[140px] pointer-events-none" />

            <div className="mx-auto max-w-[1400px] w-full px-4 tablet:px-6 desktop:px-8 py-12 md:py-20 z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* ==========================================
                        LEFT COLUMN: TEXT CONTENT & ACTION
                       ========================================== */}
                    <div className="flex flex-col items-start text-left">

                        {/* Main Headline Catchphrase */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-[1.15]">
                            Become the <br />
                            <span className="bg-gradient-to-r from-[#9945FF] via-[#B46EFF] to-blue-400 bg-clip-text text-transparent">
                                Grounded Man
                            </span>
                        </h1>

                        {/* Description Subtext */}
                        <p className="mt-6 text-base md:text-lg text-slate-400 max-w-xl font-light leading-relaxed">
                            Master the proven 7-step system to stop being the &ldquo;Nice Guy,&rdquo; build unstoppable confidence, and attract the woman of your dreams.
                        </p>

                        {/* Interactive Call-To-Action Button Links */}
                        <div className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
                            <Link href="/browse-ebooks">
                                <Button
                                    className="bg-gradient-to-r from-theme-secondary-purple via-theme-secondary-purple to-theme-primary hover:opacity-95 text-white font-medium text-sm h-12 px-6 rounded-md shadow-xl shadow-[#9945FF]/10 transition-all duration-300 cursor-pointer"
                                >
                                    Explore Books
                                    <ArrowRight className="w-4 h-4 ml-0.5" />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* ==========================================
                        RIGHT COLUMN: ISOLATED ARTWORK SCENE
                       ========================================== */}
                    <div className="flex justify-center lg:justify-end items-center w-full">
                        <div className="relative w-full max-w-[450px] aspect-square flex items-center justify-center filter drop-shadow-[0_25px_25px_rgba(153,69,255,0.15)] transition-transform duration-500 hover:scale-[1.02]">
                            <Image
                                src="book-verse-cover-image-2.png" // Replace with your exact image path
                                alt="The Dating Playbook for Men Book Cover"
                                width={450}
                                height={450}
                                priority
                                className="object-contain"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
