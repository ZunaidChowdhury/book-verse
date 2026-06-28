'use client';

import React from 'react';
import { TbReload } from "react-icons/tb";
import { Button } from '@heroui/react';
import { useSelector } from 'react-redux';

export default function DataLoadFailed({ 
    title = "Oops! Couldn't load the data.", 
    description = "Try reloading the page.",
    onReload 
}) {
    // Access global theme configuration state safely
    const { isDark } = useSelector((state) => state.theme);

    // Fallback automated action helper if no custom method injector is applied
    const handleReload = () => {
        if (typeof onReload === 'function') {
            onReload();
        } else {
            window.location.reload();
        }
    };

    return (
        <div className="w-full py-30 flex items-center justify-center p-6 text-center">
            <div className={`w-full max-w-[400px] p-8 rounded-xl border shadow-md transition-all duration-300 ${
                isDark 
                    ? 'bg-gradient-to-b from-[#111836] to-[#0b0f24] border-white/5' 
                    : 'bg-foreground border-black/5'
            }`}>
                {/* Clear, bold heading */}
                <h4 className={`text-xl font-bold tracking-tight mb-2 ${isDark ? 'text-text-primary' : 'text-text-primary'}`}>
                    {title}
                </h4>

                {/* Simple, helpful subtext */}
                <p className="text-sm text-text-secondary max-w-xs mx-auto leading-relaxed mb-6">
                    {description}
                </p>

                {/* Interactive Action Control using HeroUI */}
                <Button
                    onClick={handleReload}
                    className="bg-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/90 text-white font-semibold text-sm shadow-lg shadow-[var(--theme-primary)]/20 transition-all rounded-md px-6 flex items-center justify-center gap-2 mx-auto cursor-pointer h-11"
                >
                    <TbReload className="w-4 h-4" />
                    Reload
                </Button>
            </div>
        </div>
    );
}
