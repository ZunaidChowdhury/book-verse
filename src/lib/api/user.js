import { serverFetch } from "../core/server";

// Get all users
export const getUserById = async (id) => {
    return serverFetch(`/user/${id}`);
}