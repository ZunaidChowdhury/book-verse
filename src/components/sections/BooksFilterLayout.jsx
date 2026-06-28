'use client';

import React, { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchBar from './SearchBar';
import FiltersSidebar from './FiltersSidebar';
import Pagination from './Pagination';

export default function BooksFilterLayout({ children, pagination }) {
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
    const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1);

    // Handle search
    const handleSearch = () => {
        setCurrentPage(1);
        applyFilters(1);
    };

    // Build URL with all params including pagination
    const buildUrl = (page = 1) => {
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

        // Add pagination
        if (page > 1) {
            params.set('page', page.toString());
        }
        params.set('limit', '9');

        return `/books?${params.toString()}`;
    };

    // Build and apply filters
    const applyFilters = (pageNum = 1) => {
        startTransition(() => {
            router.push(buildUrl(pageNum));
        });
    };

    // Handle page change
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= (pagination?.totalPages || 1)) {
            setCurrentPage(newPage);
            startTransition(() => {
                router.push(buildUrl(newPage));
            });
        }
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
            setCurrentPage(1);
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
            <div className="grid grid-cols-1 md:grid-cols-[288px_1fr]  gap-8">
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
                    onApplyFilters={() => applyFilters(1)}
                    onClearFilters={clearFilters}
                    hasActiveFilters={hasActiveFilters}
                    isPending={isPending}
                />

                {/* Books Grid */}
                <div >
                    {children}

                    {/* Pagination */}
                    {pagination && (
                        <Pagination
                            currentPage={pagination.currentPage}
                            totalPages={pagination.totalPages}
                            totalBooks={pagination.totalBooks}
                            limit={pagination.limit}
                            onPageChange={handlePageChange}
                            isPending={isPending}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
