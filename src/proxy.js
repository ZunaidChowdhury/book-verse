import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'

export async function proxy (request) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if(session){
        return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/auth/log-in', request.url))
}


export const config = {
    // requires sign in for listed pages.
    matcher: ['/dashboard', '/auth/social-login'],
}