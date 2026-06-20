"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
// Assuming standard Gravity Icons naming maps or fallback layout equivalent wrapper variables
import {
    Persons,
    BookOpen,
    Person,
    ArrowRight,
    PencilToSquare
} from "@gravity-ui/icons";
import { SlPeople } from "react-icons/sl";
import { LuBookOpen } from "react-icons/lu";
import { IoPersonOutline } from "react-icons/io5";
import Image from "next/image";

export default function Slide1() {

    // Real stats counter mapping left-hand footer columns
    const stats = [
        {
            id: 1,
            value: "10K+",
            label: "Readers",
            icon: <SlPeople className="w-8 h-8 text-[#9945FF]" />
        },
        {
            id: 2,
            value: "2K+",
            label: "Ebooks",
            icon: <LuBookOpen className="w-8 h-8 text-[#9945FF]" />
        },
        {
            id: 3,
            value: "500+",
            label: "Writers",
            icon: <IoPersonOutline className="w-8 h-8 text-[#9945FF]" />
        }
    ];

    return (
        <section className="relative w-full min-h-[calc(100vh-5rem)] bg-gradient-to-r from-theme-background via-theme-background to-[#06091a] text-white overflow-hidden flex items-center">

            {/* Visual Ambient Background Glow Spots */}
            {/* <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#9945FF]/10 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[140px] pointer-events-none" /> */}

            <div className="mx-auto max-w-[1400px] w-full px-4 tablet:px-6 desktop:px-8 py-12 md:py-20 z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* ==========================================
              LEFT COLUMN: TEXT CONTENT & STATISTICS
             ========================================== */}
                    <div className=" flex flex-col items-start text-left">

                        {/* Tag Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 bg-white/5 backdrop-blur-md mb-6">
                            <span className="text-xs text-slate-300 font-medium tracking-wide flex items-center gap-1.5">
                                📖 Trusted by Readers & Writers
                            </span>
                        </div>

                        {/* Main Headline Catchphrase */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-[1.15]">
                            Discover & Read <br />
                            <span className="bg-gradient-to-r from-[#9945FF] via-[#B46EFF] to-blue-400 bg-clip-text text-transparent">
                                Original Ebooks
                            </span>
                        </h1>

                        {/* Description Subtext */}
                        <p className="mt-6 text-base md:text-lg text-slate-400 max-w-xl font-light leading-relaxed">
                            Explore thousands of unique stories, novels, guides, and educational ebooks shared by talented writers from around the world.
                        </p>

                        {/* Interactive Call-To-Action Button Links */}
                        <div className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
                            <Link href="/browse-ebooks">
                                <Button
                                    className="bg-gradient-to-r from-theme-secondary-purple via-theme-secondary-purple to-theme-primary hover:opacity-95 text-white font-medium text-sm h-12 px-6 rounded-md shadow-xl shadow-[#9945FF]/10 transition-all duration-300 cursor-pointer"
                                >
                                    Browse Ebooks
                                    <ArrowRight className="w-4 h-4 ml-0.5" />
                                </Button>
                            </Link>

                            <Link href="/auth/register">
                                <Button
                                    // variant="bordered"
                                    className="border border-white/60 hover:border-white/80 bg-transparent  text-white font-medium text-sm h-12 px-6 rounded-md hover:bg-white/5 transition-all duration-300"

                                >
                                    Become a Writer
                                    <PencilToSquare className="w-4 h-4 ml-0.5 text-slate-400" />
                                </Button>
                            </Link>
                        </div>

                        {/* Counter Analytics Footer Grid */}
                        <div className="mt-16 w-full pt-8 flex items-center justify-between gap-6 max-w-2xl">
                            {stats.map((stat, index) => (
                                <React.Fragment key={stat.id}>
                                    {/* Render a vertical divider before every item except the very first one */}
                                    {index > 0 && (
                                        <div className="w-[1px] h-10 bg-white/10 shrink-0 self-center" />
                                    )}

                                    <div className="flex items-center gap-4 flex-1 justify-center first:justify-start last:justify-end">
                                        <div className="w-14 h-14 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                                            {stat.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-lg md:text-2xl font-bold tracking-tight text-white">
                                                {stat.value}
                                            </h4>
                                            <p className="text-xs md:text-base text-slate-500 font-medium">
                                                {stat.label}
                                            </p>
                                        </div>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>


                    </div>

                    {/* ==========================================
              RIGHT COLUMN: ISOLATED ARTWORK SCENE
             ========================================== */}
                    <div>
                        <Image
                            src='/hero-1.png'
                            alt=''
                            width={800}
                            height={800} />
                    </div>


                </div>
            </div>
        </section>
    );
}
