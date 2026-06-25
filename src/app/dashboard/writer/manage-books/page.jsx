'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { Pencil, Trash2, Eye, EyeOff, Plus } from 'lucide-react'
import { getWriterBooks } from '@/lib/api/books'
import { deleteBook, updateBook } from '@/lib/actions/books'
import Link from 'next/link'
import { toast } from 'react-toastify'

export default function ManageBooksPage() {
    const { mode } = useSelector((state) => state.theme)
    const router = useRouter()
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [deletingId, setDeletingId] = useState(null)
    const [togglingId, setTogglingId] = useState(null)

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true)
                const data = await getWriterBooks()
                console.log('/manage-books/fetch: ', data)
                // Ensure data is an array
                const booksArray = Array.isArray(data) ? data : []
                setBooks(booksArray)
            } catch (err) {
                setError(err.message || 'Failed to fetch books')
                console.error('Error fetching books:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchBooks()
    }, [])

    const handleDelete = async (bookId) => {
        if (!confirm('Are you sure you want to delete this book?')) return

        try {
            setDeletingId(bookId)
            await deleteBook(bookId)
            setBooks(books.filter(b => b._id !== bookId))
            toast.success('Book deleted successfully')
        } catch (err) {
            setError(err.message || 'Failed to delete book')
            console.error('Error deleting book:', err)
            toast.error('Failed to delete book')
        } finally {
            setDeletingId(null)
        }
    }

    const toggleVisibility = async (book) => {
        try {
            setTogglingId(book._id)
            const newStatus = book.visibility === 'publish' ? 'private' : 'publish'
            await updateBook(book._id, { visibility: newStatus })

            // Update local state
            setBooks(books.map(b =>
                b._id === book._id ? { ...b, visibility: newStatus } : b
            ))
            toast.success(`Book ${newStatus === 'publish' ? 'Published' : 'Unpublished'} successfully`)
        } catch (err) {
            console.error('Error toggling visibility:', err)
            toast.error('Failed to toggle visibility')
        } finally {
            setTogglingId(null)
        }
    }

    const bgClass = mode === 'dark' ? 'bg-background' : 'bg-background'
    const cardBg = mode === 'dark' ? 'bg-foreground' : 'bg-white'
    const borderClass = mode === 'dark' ? 'border-gray-700' : 'border-gray-200'
    const textPrimary = 'text-text-primary'
    const textSecondary = 'text-text-secondary'
    const buttonHover = mode === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'

    return (
        <div className={`min-h-screen ${bgClass} p-4 sm:p-6 lg:p-8`}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className={`text-3xl sm:text-4xl font-bold ${textPrimary} mb-2`}>Manage Books</h1>
                        <p className={`${textSecondary}`}>
                            {books.length} ebook{books.length !== 1 ? 's' : ''} published
                        </p>
                    </div>
                    <Link href="/dashboard/writer/add-book">
                        <button className="bg-theme-primary hover:bg-theme-primary/90 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg flex items-center gap-2 transition-colors">
                            <Plus size={20} />
                            <span className="hidden sm:inline">Add Book</span>
                        </button>
                    </Link>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Loading State */}
                {loading ? (
                    <div className={`${cardBg} rounded-lg p-8 text-center`}>
                        <p className={textSecondary}>Loading your books...</p>
                    </div>
                ) : books.length === 0 ? (
                    <div className={`${cardBg} rounded-lg p-8 text-center`}>
                        <p className={`${textSecondary} mb-4`}>You haven't published any books yet.</p>
                        <Link href="/dashboard/writer/add-book">
                            <button className="bg-theme-primary hover:bg-theme-primary/90 text-white font-semibold px-6 py-2 rounded-lg transition-colors">
                                Create Your First Book
                            </button>
                        </Link>
                    </div>
                ) : (
                    /* Desktop Table View */
                    <div className="hidden md:block overflow-x-auto">
                        <table className={`w-full border-collapse ${cardBg} rounded-lg overflow-hidden`}>
                            <thead>
                                <tr className={`border-b ${borderClass} ${mode === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
                                    <th className={`px-6 py-4 text-left text-sm font-semibold ${textPrimary}`}>Title</th>
                                    <th className={`px-6 py-4 text-left text-sm font-semibold ${textPrimary}`}>Price</th>
                                    <th className={`px-6 py-4 text-left text-sm font-semibold ${textPrimary}`}>Status</th>
                                    <th className={`px-6 py-4 text-left text-sm font-semibold ${textPrimary}`}>Stock</th>
                                    <th className={`px-6 py-4 text-center text-sm font-semibold ${textPrimary}`}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.map((book) => (
                                    <tr key={book._id} className={`border-b ${borderClass} hover:${buttonHover} transition-colors`}>
                                        <td className={`px-6 py-4 ${textPrimary}`}>
                                            <div className="flex items-center gap-3">
                                                {book.image && (
                                                    <img src={book.image} alt={book.title} className="w-10 h-14 object-cover rounded" />
                                                )}
                                                <div>
                                                    <p className="font-medium line-clamp-1">{book.title}</p>
                                                    <p className={`text-sm ${textSecondary}`}>{book.author}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={`px-6 py-4 ${textPrimary}`}>
                                            ${parseFloat(book.price).toFixed(2)}
                                        </td>
                                        <td className={`px-6 py-4`}>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${book.visibility === 'publish'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {book.visibility === 'publish' ? 'Published' : 'Private'}
                                            </span>
                                        </td>
                                        <td className={`px-6 py-4 ${textPrimary}`}>
                                            {book.stock || 'N/A'}
                                        </td>
                                        <td className={`px-6 py-4`}>
                                            <div className="flex justify-center items-center gap-2">
                                                <button
                                                    onClick={() => toggleVisibility(book)}
                                                    disabled={togglingId === book._id}
                                                    className={`p-2 rounded transition-colors ${buttonHover} ${togglingId === book._id ? 'opacity-50' : ''}`}
                                                    title={book.visibility === 'publish' ? 'Private' : 'Publish'}
                                                >
                                                    {book.visibility === 'publish' ? (
                                                        <Eye size={18} className="text-theme-primary" />
                                                    ) : (
                                                        <EyeOff size={18} className={textSecondary} />
                                                    )}
                                                </button>
                                                <Link href={`/dashboard/writer/manage-books/edit/${book._id}`}>
                                                    <button className={`p-2 rounded transition-colors ${buttonHover}`} title="Edit">
                                                        <Pencil size={18} className="text-theme-secondary-purple" />
                                                    </button>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(book._id)}
                                                    disabled={deletingId === book._id}
                                                    className={`p-2 rounded transition-colors ${buttonHover} ${deletingId === book._id ? 'opacity-50' : ''}`}
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} className="text-red-500" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4">
                    {!loading && !error && books.map((book) => (
                        <div key={book._id} className={`${cardBg} rounded-lg p-4 border ${borderClass}`}>
                            <div className="flex gap-3 mb-3">
                                {book.image && (
                                    <img src={book.image} alt={book.title} className="w-12 h-16 object-cover rounded" />
                                )}
                                <div className="flex-1">
                                    <h3 className={`font-semibold ${textPrimary} line-clamp-1`}>{book.title}</h3>
                                    <p className={`text-sm ${textSecondary}`}>{book.author}</p>
                                    <p className={`text-sm ${textPrimary} font-medium mt-1`}>${parseFloat(book.price).toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="flex gap-2 justify-between items-center mb-3">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${book.visibility === 'publish'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {book.visibility === 'publish' ? 'Published' : 'Private'}
                                </span>
                                <span className={`text-sm ${textSecondary}`}>Stock: {book.stock || 'N/A'}</span>
                            </div>
                            <div className="flex gap-2 justify-between">
                                <button
                                    onClick={() => toggleVisibility(book)}
                                    disabled={togglingId === book._id}
                                    className={`flex-1 p-2 rounded flex items-center justify-center gap-1 transition-colors ${buttonHover} text-sm ${togglingId === book._id ? 'opacity-50' : ''}`}
                                >
                                    {book.visibility === 'publish' ? (
                                        <>
                                            <Eye size={16} />
                                            <span>Hide</span>
                                        </>
                                    ) : (
                                        <>
                                            <EyeOff size={16} />
                                            <span>Show</span>
                                        </>
                                    )}
                                </button>
                                <Link href={`/dashboard/writer/manage-books/edit/${book._id}`} className="flex-1">
                                    <button className={`w-full p-2 rounded flex items-center justify-center gap-1 transition-colors ${buttonHover} text-sm`}>
                                        <Pencil size={16} />
                                        <span>Edit</span>
                                    </button>
                                </Link>
                                <button
                                    onClick={() => handleDelete(book._id)}
                                    disabled={deletingId === book._id}
                                    className={`flex-1 p-2 rounded flex items-center justify-center gap-1 transition-colors ${buttonHover} text-sm text-red-500 ${deletingId === book._id ? 'opacity-50' : ''}`}
                                >
                                    <Trash2 size={16} />
                                    <span>Delete</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
