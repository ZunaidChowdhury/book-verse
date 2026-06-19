'use server'

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";
import { redirect } from "next/navigation";
import { getUser } from "../core/session";

export const updateUserRole = async (data) => {
    const user = await getUser();
    if (!user) {
        redirect('/unauthorized');
    }
    const result = serverMutation(`/user/preference`, data, 'PATCH');

    await result;
    if (result.modifiedCount > 0) {
    revalidatePath(`/dashboard/${user.role}`);
    }

    return result;
}