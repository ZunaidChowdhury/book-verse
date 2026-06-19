import { headers } from "next/headers";
import { auth } from "../auth";


export const getUser = async () => {
    const session = await auth.api.getSession({
        headers: await headers() // some endpoints might require headers
    })

    return session?.user || null;
}

export const getUserToken = async () => {
    const { token } = await auth.api.getToken({
        headers: await headers()
    })

    return token || null;
}