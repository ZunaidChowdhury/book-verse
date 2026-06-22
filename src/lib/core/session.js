'use server'

import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";


export const getUser = async () => {
    const session = await auth.api.getSession({
        headers: await headers() // some endpoints might require headers
    })

    return session?.user || null;
}

export const getUserToken = async () => {
    try {
        const { token } = await auth.api.getToken({
            headers: await headers()
        })
        return token || null;
    } catch (error) {
        // User not authenticated, return null
        return null;
    }
}

export const requireRole = async (role) => {
    const user = await getUser()
    if (!user) {
        redirect('/auth/signin')
    }
    if (user?.role !== role) {
        console.log(`user role ${user.role} does not have access to this page, required role: ${role}`);
        redirect('/unauthorized')
    }
    return user;
}