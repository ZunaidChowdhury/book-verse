'use client';

import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';

export default function SearchBar({ searchQuery, onSearchChange, onSearch, isPending, onClear }) {
    return (
        <div className="w-full mb-8">
            <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 group-focus-within:text-blue-300 transition-colors">
                    <FiSearch size={20} />
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                    disabled={isPending}
                    placeholder="Search by title or author..."
                    className="w-full pl-12 pr-14 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:bg-slate-800 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50"
                />
                {searchQuery && (
                    <button
                        onClick={onClear}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-400 transition-colors"
                        disabled={isPending}
                    >
                        <MdClose size={20} />
                    </button>
                )}
            </div>
        </div>
    );
}
