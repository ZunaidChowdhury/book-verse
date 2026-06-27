'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';
import { Button } from '@heroui/react';
import { useSelector } from 'react-redux';

export default function Forbidden() {
    const router = useRouter();
    // Access global theme configuration state safely
    const { isDark } = useSelector((state) => state.theme);

    return (
        <div className={`min-h-screen flex flex-col items-center justify-center p-6 text-center transition-all duration-300 ${isDark ? 'bg-theme-background' : 'bg-background'
            }`}>
            {/* Glassmorphism central card panel */}
            <div className={`max-w-md w-full space-y-8 p-8 rounded-2xl shadow-xl border backdrop-blur-xl ${isDark
                    ? 'bg-gradient-to-b from-[#111836] to-[#0b0f24] border-white/5 shadow-black/40'
                    : 'bg-foreground border-black/5 shadow-slate-200/50'
                }`}>

                {/* Icon Container Matrix */}
                <div className="relative flex justify-center">
                    {/* Decorative glowing background mesh */}
                    <div className="absolute inset-0 bg-red-500/10 blur-2xl rounded-full w-24 h-24 mx-auto animate-pulse" />

                    <div className="relative text-red-500 p-5 rounded-full border bg-red-500/10 border-red-500/20">
                        <Lock width={48} height={48} strokeWidth={1.5} />
                    </div>
                </div>

                {/* Text Payload Block */}
                <div className="space-y-3">
                    <h1 className={`text-5xl font-extrabold tracking-tight ${isDark ? 'text-text-primary' : 'text-text-primary'}`}>
                        403
                    </h1>
                    <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-text-primary' : 'text-text-primary'}`}>
                        Access Forbidden
                    </h2>
                    <p className="text-base text-text-secondary max-w-sm mx-auto leading-relaxed">
                        Hold on there! You do not have the required permissions to access this directory. If you think this is an error, please contact your platform administrator.
                    </p>
                </div>

                {/* Action Controls Grouping */}
                <div className="flex flex-col tablet:flex-row gap-3 justify-center pt-4">
                    {/* Primary Action Route: Safe Return to Dashboard */}
                    <Link href="/" className="w-full tablet:w-auto">
                        <Button
                            className="w-full bg-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/90 text-white font-semibold text-sm shadow-lg shadow-[var(--theme-primary)]/20 transition-all rounded-md px-6 flex items-center justify-center h-11 cursor-pointer"
                        >
                            Go to Dashboard
                        </Button>
                    </Link>

                    {/* Secondary Action Control: Browser Back Navigation */}
                    <Button
                        variant="light"
                        onClick={() => router.back()}
                        className={`w-full border font-medium text-sm transition-all rounded-md px-6 flex items-center justify-center h-11 cursor-pointer ${isDark
                                ? 'border-text-primary/10 bg-transparent hover:bg-text-primary/5 text-text-primary/80 hover:text-text-primary'
                                : 'border-black/10 bg-white hover:bg-gray-50 text-gray-700'
                            }`}
                    >
                        Go Back
                    </Button>
                </div>

            </div>
        </div>
    );
}
