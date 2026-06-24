import { serverFetch, serverMutation, authHeader } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export const getFeaturedBooks = async () => {
    return serverFetch(`/featured-books`);
}

export const getBooks = async (params = {}) => {
    // Build query string from params
    const queryParams = new URLSearchParams();

    if (params.search?.trim()) {
        queryParams.set('search', params.search.trim());
    }
    if (params.genres?.length > 0) {
        queryParams.set('genres', params.genres.join(','));
    }
    if (params.availability && params.availability !== 'all') {
        queryParams.set('availability', params.availability);
    }
    if (params.minPrice !== undefined) {
        queryParams.set('minPrice', params.minPrice);
    }
    if (params.maxPrice !== undefined) {
        queryParams.set('maxPrice', params.maxPrice);
    }
    if (params.sort) {
        queryParams.set('sort', params.sort);
    }
    // Add pagination params
    if (params.page) {
        queryParams.set('page', params.page);
    }
    if (params.limit) {
        queryParams.set('limit', params.limit);
    }

    const queryString = queryParams.toString();
    const path = queryString ? `/books?${queryString}` : '/books';

    const response = await serverFetch(path);
    
    // Return both books and pagination metadata
    return {
        books: response.books || response,
        pagination: response.pagination || {
            currentPage: 1,
            totalPages: 1,
            totalBooks: (response.books || response).length,
            limit: params.limit || 9,
            hasNextPage: false,
            hasPrevPage: false
        }
    };
}

export const getBookById = async (bookId) => {
    return serverFetch(`/books/${bookId}`);
}

// Writer Dashboard API Functions
export const getWriterBooks = async () => {
    return serverFetch(`/writer/my-books`);
}

export const getWishlist = async () => {
    return serverFetch(`/wishlist`);
}

// Check if book is in user's wishlist
export const checkIfWishlisted = async (bookId) => {
    return serverFetch(`/wishlist/check/${bookId}`);
}

// Add book to wishlist
export const addToWishlist = async (bookId) => {
    return serverMutation(`/wishlist`, { bookId }, 'POST');
}

// Remove book from wishlist
export const removeFromWishlist = async (bookId) => {
    return serverMutation(`/wishlist/${bookId}`, {}, 'DELETE');
}

export const getSalesHistory = async () => {
    return serverFetch(`/writer/sales-history`);
}

// Check if reader purchased a book
export const checkIfPurchased = async (bookId) => {
    return serverFetch(`/reader/purchased-check/${bookId}`);
}

// Get book content (after purchase)
export const getBookContent = async (bookId) => {
    return serverFetch(`/books/${bookId}/content`);
}

// Update/Save book content
export const updateBookContent = async (bookId, content) => {
    return serverMutation(`/books/${bookId}/content`, { content }, 'POST');
}