import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export const getFeaturedBooks = async () =>{
    return serverFetch(`/featured-books`);
}