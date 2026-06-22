'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import AddBookForm from '@/components/dashboard/writer/AddBookForm'
import { getBookById } from '@/lib/api/books'
import { updateBook } from '@/lib/actions/books'
import { toast } from 'react-toastify'

export default function EditBookPage() {
    const { mode } = useSelector((state) => state.theme)
    const router = useRouter()
    const params = useParams()
    const bookId = params.id

    const [book, setBook] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchBook = async () => {
            try {
                setLoading(true)
                const data = await getBookById(bookId)
                setBook(data)
            } catch (err) {
                setError(err.message || 'Failed to fetch book')
                console.error('Error fetching book:', err)
            } finally {
                setLoading(false)
            }
        }

        if (bookId) {
            fetchBook()
        }
    }, [bookId])

    const handleUpdateBook = async (bookId, bookData) => {
        try {
            await updateBook(bookId, bookData)
            toast.success('Book updated successfully')
            router.push('/dashboard/writer/manage-books')
        } catch (error) {
            console.error('Error updating book:', error)
            toast.error('Error updating book')
            throw error
        }
    }

    const bgClass = mode === 'dark' ? 'bg-background' : 'bg-background'
    const textPrimary = 'text-text-primary'
    const textSecondary = 'text-text-secondary'

    if (loading) {
        return (
            <div className={`min-h-screen ${bgClass} flex items-center justify-center p-4`}>
                <p className={textSecondary}>Loading book details...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className={`min-h-screen ${bgClass} flex items-center justify-center p-4`}>
                <div className="text-center">
                    <p className="text-red-500 mb-4">{error}</p>
                    <button
                        onClick={() => router.back()}
                        className="bg-theme-primary hover:bg-theme-primary/90 text-white px-4 py-2 rounded-lg"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        )
    }

    if (!book) {
        return (
            <div className={`min-h-screen ${bgClass} flex items-center justify-center p-4`}>
                <p className={textSecondary}>Book not found</p>
            </div>
        )
    }

    return (
        <div className={`min-h-screen ${bgClass} p-4 sm:p-6 lg:p-8`}>
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <button
                        onClick={() => router.back()}
                        className={`${textSecondary} hover:${textPrimary} transition-colors mb-4`}
                    >
                        ← Back
                    </button>
                    <h1 className={`text-3xl sm:text-4xl font-bold ${textPrimary}`}>Edit Book</h1>
                </div>
                
                <AddBookForm
                    book={book}
                    updateBook={handleUpdateBook}
                />
            </div>
        </div>
    )
}
