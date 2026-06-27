'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, LogIn, ArrowLeft } from 'lucide-react';
import { Button } from '@heroui/react';
import { useSelector } from 'react-redux';

export default function Unauthorized() {
    // Access global theme configuration state safely
    const { isDark } = useSelector((state) => state.theme);

    return (
        <div className={`min-h-screen flex flex-col items-center justify-center px-4 text-center transition-all duration-300 ${
            isDark ? 'bg-theme-background' : 'bg-background'
        }`}>
            <div className="max-w-md w-full space-y-6">
                {/* Icon & Error Code Section */}
                <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="rounded-full bg-red-500/10 p-4 text-red-500 animate-pulse">
                        <ShieldAlert className="h-12 w-12" />
                    </div>
                    <h1 className={`text-6xl font-extrabold tracking-tight ${isDark ? 'text-text-primary' : 'text-text-primary'}`}>
                        401
                    </h1>
                    <h2 className={`text-2xl font-bold tracking-tight ${isDark ? 'text-text-primary' : 'text-text-primary'}`}>
                        Unauthorized Access
                    </h2>
                </div>

                {/* Description Body Text */}
                <p className="text-base text-text-secondary max-w-sm mx-auto leading-relaxed">
                    Oops! You don&apos;t have permission to access this page. Please sign in with an authorized account or head back to the platform homepage.
                </p>

                {/* Action Buttons Matrix */}
                <div className="flex flex-col tablet:flex-row gap-3 justify-center pt-4">
                    {/* Primary HeroUI Action Button for Logging In */}
                    <Link href="/auth/log-in" className="w-full tablet:w-auto">
                        <Button
                            className="w-full bg-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/90 text-white font-semibold text-sm shadow-lg shadow-[var(--theme-primary)]/20 transition-all rounded-md px-6 flex items-center justify-center gap-2 cursor-pointer h-11"
                        >
                            <LogIn className="h-4 w-4" />
                            Log In
                        </Button>
                    </Link>

                    {/* Secondary HeroUI Action Button for Returning Home */}
                    <Link href="/" className="w-full tablet:w-auto">
                        <Button
                            variant="light"
                            className={`w-full border font-medium text-sm transition-all rounded-md px-6 flex items-center justify-center gap-2 cursor-pointer h-11 ${
                                isDark 
                                    ? 'border-text-primary/10 bg-transparent hover:bg-text-primary/5 text-text-primary/80 hover:text-text-primary' 
                                    : 'border-black/10 bg-white hover:bg-gray-50 text-gray-700'
                            }`}
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Go Back Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
