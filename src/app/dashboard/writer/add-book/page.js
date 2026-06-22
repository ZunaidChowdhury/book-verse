'use client'

import AddBookForm from '@/components/dashboard/writer/AddBookForm'
import { createBook } from '@/lib/actions/books'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'


const AddBookPage = () => {
    const router = useRouter()
    const handleAddBook = async (bookData) => {
        try {
            // TODO: Implement API call to save book
            const res = await createBook(bookData)
            toast.success('Book added successfully');
            router.push('/dashboard/writer/manage-books')

        } catch (error) {
            console.error('Error adding book:', error)
            toast.error('Error adding book');
            throw error
        }
    }

    const handleUpdateBook = async (bookId, bookData) => {
        try {
            // TODO: Implement API call to update book
            console.log('Updating book:', bookId, bookData)
        } catch (error) {
            console.error('Error updating book:', error)
            throw error
        }
    }

    return (
        <AddBookForm 
            addBook={handleAddBook}
            updateBook={handleUpdateBook}
        />
    )
}

export default AddBookPage