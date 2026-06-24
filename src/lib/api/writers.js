import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export const getTopWriters = async () =>{
    return serverFetch(`/top-writers`);
}

// Get writer dashboard data
export const getWriterDashboard = async () => {
    return serverFetch('/writer/dashboard');
}

// Get writer sales history
export const getWriterSalesHistory = async () => {
    return serverFetch('/writer/sales-history');
}