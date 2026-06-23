"use client";

import React, { useEffect, useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import { addToWishlist, removeFromWishlist, checkIfWishlisted } from '@/lib/api/books';

const BookDetailsActions = ({ bookId }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isLoadingWishlist, setIsLoadingWishlist] = useState(false);
    const [isCheckingWishlist, setIsCheckingWishlist] = useState(true);

    // Check if book is wishlisted on mount
    useEffect(() => {
        const checkWishlist = async () => {
            try {
                setIsCheckingWishlist(true);
                const response = await checkIfWishlisted(bookId);
                setIsWishlisted(response?.isWishlisted || false);
            } catch (error) {
                console.error('Error checking wishlist:', error);
            } finally {
                setIsCheckingWishlist(false);
            }
        };

        checkWishlist();
    }, [bookId]);

    const handleWishlistToggle = async () => {
        try {
            setIsLoadingWishlist(true);
            
            if (isWishlisted) {
                await removeFromWishlist(bookId);
                setIsWishlisted(false);
            } else {
                await addToWishlist(bookId);
                setIsWishlisted(true);
            }
        } catch (error) {
            console.error('Error toggling wishlist:', error);
        } finally {
            setIsLoadingWishlist(false);
        }
    };

    return (
        <button
            onClick={handleWishlistToggle}
            disabled={isLoadingWishlist || isCheckingWishlist}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl border font-semibold transition-all duration-300 ${
                isWishlisted
                    ? 'bg-rose-500/20 border-rose-500/40 text-rose-400 hover:bg-rose-500/30'
                    : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800/60'
            } ${isLoadingWishlist || isCheckingWishlist ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
            <FiHeart
                className={`w-5 h-5 transition-all duration-300 ${isWishlisted ? 'fill-rose-400 stroke-rose-400' : 'stroke-2'}`}
            />
            <span>{isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}</span>
        </button>
    );
};

export default BookDetailsActions;
