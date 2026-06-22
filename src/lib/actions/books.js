'use server'

import { serverMutation } from "../core/server";



export const createBook = async (newBookData) => {
    return serverMutation('/books', newBookData);
}

export const deleteBook = async (bookId) => {
    return serverMutation(`/writer/books/${bookId}`, {}, 'DELETE');
}

export const updateBook = async (bookId, data) => {
    return serverMutation(`/writer/books/${bookId}`, data, 'PATCH');
}
