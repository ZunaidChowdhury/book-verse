'use server'

import { serverMutation } from "../core/server";



export const createBook = async (newBookData) => {
    return serverMutation('/books', newBookData);
}
