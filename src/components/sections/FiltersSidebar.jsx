'use client';

import React from 'react';
import { MdClose } from 'react-icons/md';

const GENRES = [
    'Fantasy',
    'Science Fiction',
    'Mystery',
    'Romance',
    'Thriller',
    'Biography',
    'Self-Help',
    'History',
    'Fiction',
    'Non-Fiction',
];

const AVAILABILITY_OPTIONS = [
    { key: 'all', label: 'All' },
    { key: 'in-stock', label: 'In Stock' },
    { key: 'sold', label: 'Sold Out' },
];

const SORT_OPTIONS = [
    { key: 'newest', label: 'Newest First' },
    { key: 'price-low', label: 'Price: Low to High' },
    { key: 'price-high', label: 'Price: High to Low' },
    { key: 'rating', label: 'Highest Rated' },
];

export default function FiltersSidebar({
    selectedGenres,
    onGenreChange,
    selectedAvailability,
    onAvailabilityChange,
    minPrice,
    maxPrice,
    onMinPriceChange,
    onMaxPriceChange,
    sortBy,
    onSortChange,
    onApplyFilters,
    onClearFilters,
    hasActiveFilters,
    isPending,
}) {
    const handleGenreChange = (genre) => {
        const updated = new Set(selectedGenres);
        if (updated.has(genre)) {
            updated.delete(genre);
        } else {
            updated.add(genre);
        }
        onGenreChange(updated);
    };

    return (
        <div className="w-full lg:w-72">
            {/* Filters Container */}
            <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/40 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-lg">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-400 rounded"></span>
                    Filters
                </h3>

                {/* Genre Filter */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-slate-300 mb-3">Genre</label>
                    <select
                        value=""
                        onChange={(e) => {
                            if (e.target.value) {
                                handleGenreChange(e.target.value);
                            }
                        }}
                        disabled={isPending}
                        className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50 appearance-none cursor-pointer"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%239CA3AF' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                            backgroundPosition: 'right 0.5rem center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '1.5em 1.5em',
                            paddingRight: '2.5rem',
                        }}
                    >
                        <option value="">+ Add Genre</option>
                        {GENRES.map((genre) => (
                            <option key={genre} value={genre} disabled={selectedGenres.has(genre)}>
                                {genre}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Availability Filter */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-slate-300 mb-3">Availability</label>
                    <select
                        value={selectedAvailability}
                        onChange={(e) => onAvailabilityChange(e.target.value)}
                        disabled={isPending}
                        className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50 appearance-none cursor-pointer"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%239CA3AF' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                            backgroundPosition: 'right 0.5rem center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '1.5em 1.5em',
                            paddingRight: '2.5rem',
                        }}
                    >
                        {AVAILABILITY_OPTIONS.map((option) => (
                            <option key={option.key} value={option.key}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sort Filter */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-slate-300 mb-3">Sort By</label>
                    <select
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value)}
                        disabled={isPending}
                        className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50 appearance-none cursor-pointer"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%239CA3AF' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                            backgroundPosition: 'right 0.5rem center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '1.5em 1.5em',
                            paddingRight: '2.5rem',
                        }}
                    >
                        {SORT_OPTIONS.map((option) => (
                            <option key={option.key} value={option.key}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-slate-300 mb-3">Price Range</label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            value={minPrice}
                            onChange={(e) => {
                                const val = e.target.value;
                                const num = parseInt(val) || 0;
                                if (num <= parseInt(maxPrice)) {
                                    onMinPriceChange(val);
                                }
                            }}
                            disabled={isPending}
                            min="0"
                            max="1000"
                            placeholder="Min"
                            className="flex-1 px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50"
                        />
                        <input
                            type="number"
                            value={maxPrice}
                            onChange={(e) => {
                                const val = e.target.value;
                                const num = parseInt(val) || 1000;
                                if (num >= parseInt(minPrice)) {
                                    onMaxPriceChange(val);
                                }
                            }}
                            disabled={isPending}
                            min="0"
                            max="1000"
                            placeholder="Max"
                            className="flex-1 px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50"
                        />
                    </div>
                </div>

                {/* Selected Genres Display */}
                {selectedGenres.size > 0 && (
                    <div className="mb-6 pb-6 border-b border-slate-700/50">
                        <label className="block text-sm font-semibold text-slate-300 mb-3">Selected Genres</label>
                        <div className="flex flex-wrap gap-2">
                            {Array.from(selectedGenres).map((genre) => (
                                <div
                                    key={genre}
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-purple-500/10 border border-purple-500/50 text-purple-200 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-purple-600/30 transition-colors group"
                                >
                                    <span>{genre}</span>
                                    <button
                                        onClick={() => {
                                            const updated = new Set(selectedGenres);
                                            updated.delete(genre);
                                            onGenreChange(updated);
                                        }}
                                        className="opacity-60 group-hover:opacity-100 transition-opacity"
                                    >
                                        <MdClose size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 flex-col">
                    <button
                        onClick={onApplyFilters}
                        disabled={isPending}
                        className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:from-slate-700 disabled:to-slate-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-blue-500/50 disabled:opacity-50"
                    >
                        {isPending ? '⏳ Applying...' : 'Apply Filters'}
                    </button>

                    {hasActiveFilters && (
                        <button
                            onClick={onClearFilters}
                            disabled={isPending}
                            className="w-full px-4 py-3 bg-slate-700/50 hover:bg-red-600/20 border border-slate-600/50 hover:border-red-600/50 text-white font-semibold rounded-lg transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                            title="Clear all filters"
                        >
                            <MdClose size={18} />
                            Clear Filters
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
