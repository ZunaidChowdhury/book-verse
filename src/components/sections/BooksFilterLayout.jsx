'use client';

import React, { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchBar from './SearchBar';
import FiltersSidebar from './FiltersSidebar';

export default function BooksFilterLayout({ children }) {
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

    // Handle search
    const handleSearch = () => {
        applyFilters();
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
        <div className="space-y-8">
            {/* Search Bar */}
            <SearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onSearch={handleSearch}
                isPending={isPending}
                onClear={() => setSearchQuery('')}
            />

            {/* Filters and Books Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filters Sidebar */}
                <FiltersSidebar
                    selectedGenres={selectedGenres}
                    onGenreChange={setSelectedGenres}
                    selectedAvailability={selectedAvailability}
                    onAvailabilityChange={setSelectedAvailability}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    onMinPriceChange={setMinPrice}
                    onMaxPriceChange={setMaxPrice}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                    onApplyFilters={applyFilters}
                    onClearFilters={clearFilters}
                    hasActiveFilters={hasActiveFilters}
                    isPending={isPending}
                />

                {/* Books Grid */}
                <div className="lg:col-span-3">
                    {children}
                </div>
            </div>
        </div>
    );
}
