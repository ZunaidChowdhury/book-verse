'use client';

import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function Pagination({
    currentPage,
    totalPages,
    totalBooks,
    limit,
    onPageChange,
    isPending,
}) {
    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;
        const halfWindow = Math.floor(maxPagesToShow / 2);

        let startPage = Math.max(1, currentPage - halfWindow);
        let endPage = Math.min(totalPages, currentPage + halfWindow);

        // Adjust if we're near the start or end
        if (startPage === 1) {
            endPage = Math.min(totalPages, maxPagesToShow);
        }
        if (endPage === totalPages) {
            startPage = Math.max(1, totalPages - maxPagesToShow + 1);
        }

        // Add first page if not visible
        if (startPage > 1) {
            pages.push(1);
            if (startPage > 2) pages.push('...');
        }

        // Add page numbers
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        // Add last page if not visible
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) pages.push('...');
            pages.push(totalPages);
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();
    const startItem = (currentPage - 1) * limit + 1;
    const endItem = Math.min(currentPage * limit, totalBooks);

    if (totalPages <= 1) return null;

    return (
        <div className="w-full flex flex-col items-center gap-6 mt-12">
            {/* Info Text */}
            <div className="text-slate-400 text-sm">
                Showing <span className="font-semibold text-slate-300">{startItem}</span> to{' '}
                <span className="font-semibold text-slate-300">{endItem}</span> of{' '}
                <span className="font-semibold text-slate-300">{totalBooks}</span> books
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
                {/* Previous Button */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1 || isPending}
                    className="p-2 rounded-lg bg-slate-800/50 border border-slate-600/50 text-slate-300 hover:border-blue-500/50 hover:text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    title="Previous page"
                >
                    <FiChevronLeft size={20} />
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                    {pageNumbers.map((page, index) => (
                        <React.Fragment key={index}>
                            {page === '...' ? (
                                <span className="px-3 py-2 text-slate-400 text-sm">...</span>
                            ) : (
                                <button
                                    onClick={() => onPageChange(page)}
                                    disabled={isPending}
                                    className={`
                                        min-w-10 h-10 px-3 rounded-lg font-semibold transition-all
                                        ${
                                            currentPage === page
                                                ? 'bg-theme-primary text-white shadow-lg hover:shadow-blue-500/50'
                                                : 'bg-slate-800/50 border border-slate-600/50 text-slate-300 hover:border-blue-500/50 hover:text-blue-400'
                                        }
                                        disabled:opacity-50 disabled:cursor-not-allowed
                                    `}
                                >
                                    {page}
                                </button>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Next Button */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || isPending}
                    className="p-2 rounded-lg bg-slate-800/50 border border-slate-600/50 text-slate-300 hover:border-blue-500/50 hover:text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    title="Next page"
                >
                    <FiChevronRight size={20} />
                </button>
            </div>

            {/* Mobile View - Page Info */}
            <div className="lg:hidden text-slate-400 text-sm">
                Page <span className="font-semibold text-slate-300">{currentPage}</span> of{' '}
                <span className="font-semibold text-slate-300">{totalPages}</span>
            </div>
        </div>
    );
}
