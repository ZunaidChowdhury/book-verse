import { serverFetch } from "../core/server";

// Get reader dashboard data
export const getReaderDashboard = async () => {
    return serverFetch('/reader/dashboard');
}

// Get reader's purchase history
export const getPurchaseHistory = async () => {
    return serverFetch('/reader/purchase-history');
}

// Get reader's purchased books
export const getPurchasedBooks = async () => {
    return serverFetch('/reader/purchased-books');
}

// Get reader's wishlist
export const getReaderWishlist = async () => {
    return serverFetch('/reader/wishlist');
}

// Get reader profile
export const getReaderProfile = async () => {
    return serverFetch('/reader/profile');
}

// Update reader profile
export const updateReaderProfile = async (data) => {
    return fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/reader/profile`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            ...(await (await import("../core/server")).authHeader())
        },
        body: JSON.stringify(data),
    }).then(res => res.json());
}
