import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request) {
    const { pathname } = request.nextUrl;

    // 1. Fetch current session context directly using the native request headers
    // (Avoid using 'await headers()' here since next/headers is unsafe in Middleware execution)
    const session = await auth.api.getSession({
        headers: request.headers,
    });

    // 2. Define global authentication route boundaries [public auth routes and API endpoints]
    const isAuthRoute = pathname.startsWith("/auth/log-in") ||
        pathname.startsWith("/auth/register") ||
        pathname.startsWith("/api/auth");

    // 3. Define the dynamically mapped onboarding role preference directory path
    // (This checks both standard string variations and regex numeric paths)
    const isOnboardingRoute = pathname.startsWith("/auth/social-login");

    // --- STRATEGY A: THE GUEST ROUTING GUARD ---
    // Target your protected routes (e.g., /all-facilities or deep nested panels)
    // private routes [only authenticated users]
    const isProtectedRoute = pathname.startsWith("/dashboard") ||
                             pathname.startsWith("/auth/social-login");
    // pathname.startsWith("/auth/register") ||

    if (isProtectedRoute && !session) {
        // Unauthenticated guest user attempting to view a locked panel -> Redirect to sign-in
        return NextResponse.redirect(new URL("/auth/log-in", request.url));
    }

    // --- STRATEGY B: THE ROLE ONBOARDING GUARD ---
    // If the authenticated user is missing their profile role parameter
    if (session?.user && !session.user.role) {
        // console.log('middleware/ session?.user: ', session?.user)
        // Enforce the check ONLY if they are not already sitting inside a safe auth or selection screen
        if (!isAuthRoute && !isOnboardingRoute) {
            return NextResponse.redirect(
                new URL(`/auth/social-login`, request.url)
            );
        }
    }

    // Pass verification tests safely down to core engine pipelines
    return NextResponse.next();
}

// 4. Global application layout matcher rule (protects application layout while ignoring static data drops)
export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};