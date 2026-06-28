'use client';

import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@heroui/react';
import { useSelector } from "react-redux";
// import { useRouter } from 'next/navigation';

export default function ErrorFallback({ error, resetErrorBoundary }) {
    // const router = useRouter();
    const { isDark } = useSelector((state) => state.theme);

    const handleReload = () => {
        // window.location.reload();
        if (typeof resetErrorBoundary === 'function') {
            resetErrorBoundary();
        } else {
            window.location.reload();
        }
    };

    return (
        <div className={`min-h-screen w-full flex flex-col items-center justify-center p-6 text-center transition-all duration-300 ${isDark ? 'bg-theme-background' : 'bg-background'
            }`}>
            <div className={`max-w-md p-8 rounded-xl border flex flex-col items-center gap-5 shadow-xl ${isDark
                ? 'bg-gradient-to-b from-[#111836] to-[#0b0f24] border-white/5'
                : 'bg-foreground border-black/5'
                }`}>
                {/* Error Visual Anchor */}
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-red-500 animate-pulse">
                    <AlertCircle className="size-7" />
                </div>

                {/* Text Payload Block */}
                <div className="space-y-2">
                    <h3 className={`text-xl font-bold tracking-tight ${isDark ? 'text-text-primary' : 'text-text-primary'}`}>
                        Something went wrong.
                    </h3>
                    <p className="text-sm text-text-secondary max-w-xs mx-auto">
                        A runtime error occurred inside this view container. Click below to reload the page state.
                    </p>

                    {/* Optional: Error message printing for development environment staging loops */}
                    {process.env.NODE_ENV === 'development' && error && (
                        <div className="text-center mt-3 p-3 rounded-md bg-red-500/5 border border-red-500/10  overflow-x-auto max-w-full">
                            <code className="text-xs font-mono text-red-400 block whitespace-pre">
                                {error.message || String(error)}
                            </code>
                        </div>
                    )}
                </div>

                {/* Interactive Action Control */}
                <Button
                    onClick={handleReload}
                    className="bg-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/90 text-white font-semibold text-sm shadow-lg shadow-[var(--theme-primary)]/20 transition-all rounded-md px-6 flex items-center gap-2 cursor-pointer"
                >
                    <RefreshCw className="size-4" />
                    Reload
                </Button>
            </div>
        </div>
    );
}
