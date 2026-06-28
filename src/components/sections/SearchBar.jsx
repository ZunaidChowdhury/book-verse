'use client';

import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import { useSelector } from 'react-redux';

export default function SearchBar({ searchQuery, onSearchChange, onSearch, isPending, onClear }) {
    const { isDark } = useSelector((state) => state.theme);

    // reuse the same input styling as LogInForm
    const inputClass = `w-full pl-12 pr-14 py-3 rounded-xl transition-all text-text-primary ${isDark ? 'bg-[#111836]' : 'bg-foreground'}  border border-foreground/10 hover:border-foreground/20 text-foreground placeholder:text-text-secondary focus:outline-none focus:border-[var(--theme-primary)] focus:ring-1 focus:ring-[var(--theme-primary)]/40 disabled:opacity-50`;

    return (
        <div className="w-full mb-8">
            <div className="relative group">
                <div className={`absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-text-primary transition-colors`}>
                    <FiSearch size={20} />
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                    disabled={isPending}
                    placeholder="Search by title or author..."
                    className={inputClass}
                />
                {searchQuery && (
                    <button
                        onClick={onClear}
                        className={`absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors`}
                        disabled={isPending}
                    >
                        <MdClose size={20} />
                    </button>
                )}
            </div>
        </div>
    );
}
