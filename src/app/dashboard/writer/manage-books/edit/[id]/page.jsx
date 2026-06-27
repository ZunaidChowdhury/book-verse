'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import AddBookForm from '@/components/dashboard/writer/AddBookForm'
import { getBookById, getBookContent } from '@/lib/api/books'
import { updateBook } from '@/lib/actions/books'
import { toast } from 'react-toastify'

export default function EditBookPage() {
    const { isDark } = useSelector((state) => state.theme)
    const router = useRouter()
    const params = useParams()
    const bookId = params.id

    const [book, setBook] = useState(null)
    const [bookContent, setBookContent] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchBook = async () => {
            try {
                setLoading(true)
                const data = await getBookById(bookId)
                setBook(data)

                try {
                    const contentData = await getBookContent(bookId)
                    // getBookContent may return an object like { content: '...' }
                    setBookContent(contentData?.content ?? null)
                } catch (contentErr) {
                    // If content isn't available or user isn't authorized, just log and continue
                    console.warn('Could not fetch book content:', contentErr)
                    setBookContent(null)
                }
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
            toast.error(error.message || 'Error updating book')
            throw error
        }
    }

    if (loading) {
        return (
            <div className={`min-h-screen bg-background transition-colors flex items-center justify-center p-4`}>
                <p className="text-text-secondary">Loading book details...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className={`min-h-screen bg-background transition-colors flex items-center justify-center p-4`}>
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
            <div className={`min-h-screen bg-background transition-colors flex items-center justify-center p-4`}>
                <p className="text-text-secondary">Book not found</p>
            </div>
        )
    }

    return (
        <div className={`min-h-screen bg-background transition-colors`}>
            <AddBookForm
                book={book}
                bookContent={bookContent}
                updateBook={handleUpdateBook}
            />
        </div>
    )
}
