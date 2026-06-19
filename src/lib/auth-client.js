import { jwtClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,

    plugins: [
        jwtClient()
    ]

})


export const { signIn, signUp, signOut, useSession } = createAuthClient()


export const googleSignIn = async () => {
    await authClient.signIn.social({
        provider: "google",
        // Where returning users go right after authorization
        // callbackURL: `/auth/user/preference`,

        // NEW: Where brand new Google accounts are redirected
        // newUserCallbackURL: `/auth/user/preference`,
    });
};

