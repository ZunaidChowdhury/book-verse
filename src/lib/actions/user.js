'use server'

import { revalidatePath } from "next/cache";
import { authHeader, serverMutation } from "../core/server";
import { redirect } from "next/navigation";
import { getUser } from "../core/session";
import { toast } from "react-toastify";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export const updateUserRole = async (updateData) => {
    const user = await getUser();
    if (!user) {
        redirect('/unauthorized');
    }
    const result = serverMutation(`/user/preference`, updateData, 'PATCH');

    await result;
    if (result.modifiedCount > 0) {
        revalidatePath(`/dashboard/${user.role}`);
    }

    return result;
}

// Next.js (Client Component or Action layer)
export const handlePurchase = async (bookId) => {
    let redirectUrl = null;
    try {
        const response = await fetch(`${baseUrl}/api/checkout/create-session`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ... await authHeader() },
            body: JSON.stringify({ bookId }),
        });

        const data = await response.json();
        console.log('handle purchase: ', data)

        if (data.url) {
            // Safely forward the reader straight to Stripe's secure payment portal
            redirectUrl = data.url;
            // window.location.href = data.url;
        } else {
            console.error("Pricing initialization failed.");
        }
    } catch (error) {
        console.error("Checkout redirection failed:", error);
    }
    if (redirectUrl) {
        redirect(redirectUrl);
    }
};
