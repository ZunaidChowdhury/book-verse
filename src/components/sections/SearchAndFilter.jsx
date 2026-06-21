'use client';

import React, { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiSearch } from 'react-icons/fi';
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

export default function SearchAndFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    // Initialize state from URL params
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
    const [selectedGenres, setSelectedGenres] = useState(
        new Set(searchParams.get('genres')?.split(',').filter(Boolean) || [])
    );
    const [selectedAvailability, setSelectedAvailability] = useState(
        searchParams.get('availability') || 'all'
    );
    const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '0');
    const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '1000');
    const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');

    // Handle genre toggle
    const handleGenreChange = (e) => {
        const genre = e.target.value;
        const updated = new Set(selectedGenres);
        if (updated.has(genre)) {
            updated.delete(genre);
        } else {
            updated.add(genre);
        }
        setSelectedGenres(updated);
    };

    // Build and apply filters
    const applyFilters = () => {
        startTransition(() => {
            const params = new URLSearchParams();

            // Add search param
            if (searchQuery.trim()) {
                params.set('search', searchQuery.trim());
            }

            // Add genres param
            if (selectedGenres.size > 0) {
                params.set('genres', Array.from(selectedGenres).join(','));
            }

            // Add availability param
            if (selectedAvailability && selectedAvailability !== 'all') {
                params.set('availability', selectedAvailability);
            }

            // Add price range params
            const min = parseInt(minPrice) || 0;
            const max = parseInt(maxPrice) || 1000;
            if (min > 0) params.set('minPrice', min.toString());
            if (max < 1000) params.set('maxPrice', max.toString());

            // Add sort param
            if (sortBy && sortBy !== 'newest') {
                params.set('sort', sortBy);
            }

            router.push(`/books?${params.toString()}`);
        });
    };

    // Clear all filters
    const clearFilters = () => {
        startTransition(() => {
            setSearchQuery('');
            setSelectedGenres(new Set());
            setSelectedAvailability('all');
            setMinPrice('0');
            setMaxPrice('1000');
            setSortBy('newest');
            router.push('/books');
        });
    };

    // Check if any filters are active
    const hasActiveFilters =
        searchQuery.trim() ||
        selectedGenres.size > 0 ||
        selectedAvailability !== 'all' ||
        parseInt(minPrice) > 0 ||
        parseInt(maxPrice) < 1000 ||
        sortBy !== 'newest';

    return (
        <div className="w-full space-y-6">
            {/* Main Filter Container */}
            <div className="relative">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/10 to-pink-600/20 rounded-xl blur-xl -z-10"></div>
                
                <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-800/60 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-lg shadow-2xl">
                    {/* Title */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Discover Your Next Read
                        </h2>
                        <p className="text-slate-400 text-sm mt-2">Filter and search through our collection of amazing books</p>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-8">
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 group-focus-within:text-blue-300 transition-colors">
                                <FiSearch size={20} />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
                                disabled={isPending}
                                placeholder="Search by title or author..."
                                className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:bg-slate-800 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-400 transition-colors"
                                    disabled={isPending}
                                >
                                    <MdClose size={20} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Filters Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                        {/* Genre Filter - Dropdown */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-3">Genre</label>
                            <select
                                value=""
                                onChange={(e) => {
                                    if (e.target.value) {
                                        handleGenreChange({ target: { value: e.target.value } });
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
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-3">Availability</label>
                            <select
                                value={selectedAvailability}
                                onChange={(e) => setSelectedAvailability(e.target.value)}
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
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-3">Sort By</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
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
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-3">Price Range</label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    value={minPrice}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        const num = parseInt(val) || 0;
                                        if (num <= parseInt(maxPrice)) {
                                            setMinPrice(val);
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
                                            setMaxPrice(val);
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
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={applyFilters}
                            disabled={isPending}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:from-slate-700 disabled:to-slate-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-blue-500/50 disabled:opacity-50"
                        >
                            {isPending ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="animate-spin">⏳</span> Searching...
                                </span>
                            ) : (
                                'Search & Filter'
                            )}
                        </button>

                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                disabled={isPending}
                                className="px-6 py-3 bg-slate-700/50 hover:bg-red-600/20 border border-slate-600/50 hover:border-red-600/50 text-white font-semibold rounded-lg transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 flex items-center gap-2"
                                title="Clear all filters"
                            >
                                <MdClose size={20} />
                                Clear
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Selected Genres Display */}
            {selectedGenres.size > 0 && (
                <div className="flex flex-wrap gap-2 px-2">
                    {Array.from(selectedGenres).map((genre) => (
                        <div
                            key={genre}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-purple-500/10 border border-purple-500/50 text-purple-200 px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-600/30 transition-colors group"
                        >
                            <span>{genre}</span>
                            <button
                                onClick={() => {
                                    const updated = new Set(selectedGenres);
                                    updated.delete(genre);
                                    setSelectedGenres(updated);
                                }}
                                className="opacity-60 group-hover:opacity-100 transition-opacity"
                            >
                                <MdClose size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Active Filters Summary */}
            {hasActiveFilters && (
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 text-sm text-slate-300">
                    <span className="font-semibold text-slate-200">Active filters: </span>
                    {searchQuery && <span className="text-blue-300">Search "{searchQuery}" • </span>}
                    {parseInt(minPrice) > 0 && <span className="text-green-300">${minPrice} - ${maxPrice} • </span>}
                    {selectedAvailability !== 'all' && (
                        <span className="text-orange-300">
                            {AVAILABILITY_OPTIONS.find((opt) => opt.key === selectedAvailability)?.label} •{' '}
                        </span>
                    )}
                    {sortBy !== 'newest' && (
                        <span className="text-pink-300">
                            {SORT_OPTIONS.find((opt) => opt.key === sortBy)?.label}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}
