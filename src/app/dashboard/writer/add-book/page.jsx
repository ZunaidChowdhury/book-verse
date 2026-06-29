'use client'

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import AddBookForm from '@/components/dashboard/writer/AddBookForm';
import { createBook } from '../../../../lib/actions/books';

export default function AddBookPage() {
    const { isDark } = useSelector((state) => state.theme);
    const router = useRouter();

    const handleAddBook = async (bookData) => {
        try {

            const res = await createBook(bookData)
            // console.log('Book added successfully:', res);
            toast.success('Book added successfully!');
            router.push('/dashboard/writer/manage-books');
        } catch (error) {
            // console.error('Error adding book:', error);
            toast.error(error.message || 'Failed to add book');
        }
    };

    return (
        <div className={`min-h-screen bg-background transition-colors`}>
            <AddBookForm addBook={handleAddBook} />
        </div>
    );
}
