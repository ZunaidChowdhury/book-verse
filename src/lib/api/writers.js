import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export const getTopWriters = async () =>{
    return serverFetch(`/top-writers`);
}