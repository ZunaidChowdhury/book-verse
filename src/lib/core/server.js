import { redirect } from "next/navigation";
import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export const authHeader = async () => {
    const token = await getUserToken();

    const header = token ? {
        authorization: `Bearer ${token}`
    } : {};

    return header;
}

export const serverFetch = async (path) => {
    // console.log('client/serverFetch/ path: ', path)
    const res = await fetch(`${baseUrl}/api${path}`, {
        headers: {
            ... await authHeader()
        },
    });
    
    return handleStatusCode(res);
}

export const serverMutation = async (path, data, method = 'POST') => {
    // console.log(`client/serverMutation/path: ${path}, data: ${data}, method: ${method}`)
    const res = await fetch(`${baseUrl}/api${path}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            ... await authHeader()
        },
        body: JSON.stringify(data),
    });
    // console.log('serverMutation 2, res: ', res)

    return handleStatusCode(res);
}


// handle 401, 403
const handleStatusCode = res => {
    if (res.status === 401) {
        redirect('/unauthorized')
    }
    else if (res.status === 403) {
        redirect('/forbidden');
    }

    return res.json()
}