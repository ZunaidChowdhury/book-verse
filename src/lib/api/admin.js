import { serverFetch } from "../core/server";
import { serverMutation } from "../core/server";

// Get all users
export const getAllUsers = async () => {
    return serverFetch('/admin/users');
}

// Update user role
export const updateUserRole = async (userId, newRole) => {
    return serverMutation(`/admin/users/${userId}/role`, { role: newRole }, 'PATCH');
}

// Delete user
export const deleteUser = async (userId) => {
    return serverMutation(`/admin/users/${userId}`, {}, 'DELETE');
}

// Get all books (admin view)
export const getAllBooks = async () => {
    return serverFetch('/admin/books');
}

// Update book visibility (publish/unpublish)
export const updateBookVisibility = async (bookId, visibility) => {
    return serverMutation(`/admin/books/${bookId}/status`, { visibility }, 'PATCH');
}

// Delete book (admin)
export const deleteBookAdmin = async (bookId) => {
    return serverMutation(`/admin/books/${bookId}`, {}, 'DELETE');
}

// Get all transactions
export const getAllTransactions = async () => {
    return serverFetch('/admin/transactions');
}

// Get dashboard analytics
export const getDashboardAnalytics = async () => {
    return serverFetch('/admin/analytics');
}

// Get monthly sales data
export const getMonthlySalesData = async () => {
    return serverFetch('/admin/analytics/monthly-sales');
}

// Get books by genre
export const getBooksByGenre = async () => {
    return serverFetch('/admin/analytics/books-by-genre');
}
