'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { RiHome2Line } from 'react-icons/ri';
import { GrFormPreviousLink } from 'react-icons/gr';
import { Button } from '@heroui/react';
import { useSelector } from 'react-redux';

export default function NotFoundPage() {
    const router = useRouter();
    // Access global theme configuration state safely
    const { isDark } = useSelector((state) => state.theme);

    return (
        <div className={`min-h-screen flex flex-col items-center justify-center px-4 text-center transition-all duration-300 ${isDark ? 'bg-theme-background' : 'bg-background'
            }`}>
            {/* Dynamic Card Panel Wrapper */}
            <div className={`w-full max-w-[480px] p-8 rounded-2xl border shadow-xl transition-all duration-300 ${isDark
                ? 'bg-gradient-to-b from-[#111836] to-[#0b0f24] border-white/5 shadow-black/40'
                : 'bg-foreground border-black/5 shadow-slate-200/50'
                }`}>

                {/* 404 Big Error Header */}
                <h1 className="text-8xl font-extrabold tracking-tighter bg-gradient-to-b from-[var(--theme-primary)] to-[var(--theme-secondary-purple)] bg-clip-text text-transparent mb-4 select-none">
                    404
                </h1>

                {/* Clear, bold heading */}
                <h4 className={`text-2xl font-bold tracking-tight mb-2 ${isDark ? 'text-text-primary' : 'text-text-primary'}`}>
                    Page not found.
                </h4>

                {/* Simple, helpful subtext */}
                <p className="text-sm text-text-secondary max-w-sm mx-auto leading-relaxed mb-8">
                    It might have been moved or deleted. Check the address string parameter details and try again.
                </p>

                {/* Action Controls Matrix */}
                <div className="flex flex-col tablet:flex-row gap-3 justify-center w-full">
                    {/* Primary Button: Return Home */}
                    <div className="w-full tablet:flex-1">
                        <Link href="/" className="w-full">
                            <Button
                                className="w-full bg-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/90 text-white font-semibold text-sm shadow-lg shadow-[var(--theme-primary)]/20 transition-all rounded-md px-4 flex items-center justify-center gap-2 h-11 cursor-pointer"
                            >
                                <RiHome2Line className="w-4 h-4 shrink-0" />
                                Home Page
                            </Button>
                        </Link>
                    </div>

                    {/* Secondary Button: Native Go Back Router Hook */}
                    <div className="w-full tablet:flex-1">
                        <Button
                            variant="light"
                            onClick={() => router.back()}
                            className={`w-full border font-medium text-sm transition-all rounded-md px-4 flex items-center justify-center gap-2 h-11 cursor-pointer ${isDark
                                    ? 'border-text-primary/10 bg-transparent hover:bg-text-primary/5 text-text-primary/80 hover:text-text-primary'
                                    : 'border-black/10 bg-white hover:bg-gray-50 text-gray-700'
                                }`}
                        >
                            <GrFormPreviousLink className="w-5 h-5 shrink-0" />
                            Previous Page
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
