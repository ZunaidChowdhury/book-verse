'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { Pencil, Trash2, Eye, EyeOff, Plus } from 'lucide-react'
import { getWriterBooks } from '@/lib/api/books'
import { deleteBook, updateBook } from '@/lib/actions/books'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { Button, Modal } from "@heroui/react";
import MyCustomSpinner from '@/components/spinner/MyCustomSpinner'

export default function ManageBooksPage() {
    const { isDark } = useSelector((state) => state.theme)
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [deletingId, setDeletingId] = useState(null)
    const [togglingId, setTogglingId] = useState(null)
    const [bookToDelete, setBookToDelete] = useState(null)

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true)
                const data = await getWriterBooks()
                // console.log('/manage-books/fetch: ', data)
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

    const handleDeleteBook = async (bookId) => {
        try {
            setDeletingId(bookId)
            await deleteBook(bookId)
            setBooks(books.filter(b => b._id !== bookId))
            toast.success('Book deleted successfully')
            setBookToDelete(null)
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

    if (loading) {
        return (
            <div className={`my-30`}>
                <MyCustomSpinner />
            </div>
        )
    }

    return (
        <div className={`min-h-screen bg-background transition-colors `}>
            <div className="p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className={`text-3xl sm:text-4xl font-bold text-text-primary mb-2`}>Manage Books</h1>
                        <p className={`text-text-secondary`}>
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

                {books.length === 0 ? (
                    <div className={`text-center py-16 rounded-lg bg-foreground border ${isDark ? 'border-border-dark' : 'border-border-light'}`}>
                        <p className={`text-lg text-text-secondary mb-4`}>You haven't published any books yet.</p>
                        <Link href="/dashboard/writer/add-book">
                            <button className="bg-theme-primary hover:bg-theme-primary/90 text-white font-semibold px-6 py-2 rounded-lg transition-colors">
                                Create Your First Book
                            </button>
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Desktop Table View */}
                        <div className="hidden md:block overflow-x-auto rounded-lg border border-border-dark">
                            <table className={`w-full text-sm bg-foreground`}>
                                <thead>
                                    <tr className={`border-b ${isDark ? 'border-border-dark bg-black/50' : 'border-border-light bg-gray-50'}`}>
                                        <th className={`px-6 py-4 text-left font-semibold text-text-primary`}>Title</th>
                                        <th className={`px-6 py-4 text-left font-semibold text-text-primary`}>Price</th>
                                        <th className={`px-6 py-4 text-left font-semibold text-text-primary`}>Status</th>
                                        <th className={`px-6 py-4 text-left font-semibold text-text-primary`}>Stock</th>
                                        <th className={`px-6 py-4 text-center font-semibold text-text-primary`}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {books.map((book) => (
                                        <tr key={book._id} className={`border-b ${isDark ? 'border-border-dark hover:bg-black/30' : 'border-border-light hover:bg-gray-50'} transition-colors`}>
                                            <td className={`px-6 py-4 text-text-primary`}>
                                                <div className="flex items-center gap-3">
                                                    {book.image && (
                                                        <Link href={`/books/${book._id}`}>
                                                            <img src={book.image} alt={book.title} className="w-10 h-14 object-cover rounded" />
                                                        </Link>
                                                    )}
                                                    <Link href={`/books/${book._id}`}>
                                                        <p className="font-medium line-clamp-1 underline text-text-primary">{book.title}</p>
                                                    </Link>
                                                </div>
                                            </td>
                                            <td className={`px-6 py-4 text-text-primary font-semibold`}>
                                                ${parseFloat(book.price || 0).toFixed(2)}
                                            </td>
                                            <td className={`px-6 py-4`}>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${book.visibility === 'publish'
                                                    ? 'bg-green-500 text-text-primary'
                                                    : 'bg-yellow-500 text-text-primary'
                                                    }`}>
                                                    {book.visibility === 'publish' ? 'Published' : 'Private'}
                                                </span>
                                            </td>
                                            <td className={`px-6 py-4 text-text-primary`}>
                                                {book.stock || 'N/A'}
                                            </td>
                                            <td className={`px-6 py-4`}>
                                                <div className="flex justify-center items-center gap-2">
                                                    <button
                                                        onClick={() => toggleVisibility(book)}
                                                        disabled={togglingId === book._id}
                                                        className="cursor-pointer p-2 text-text-primary hover:bg-theme-primary/20 rounded transition-colors disabled:opacity-50"
                                                        title={book.visibility === 'publish' ? 'Private' : 'Publish'}
                                                    >
                                                        {book.visibility === 'publish' ? (
                                                            <Eye size={18} />
                                                        ) : (
                                                            <EyeOff size={18} />
                                                        )}
                                                    </button>
                                                    <Link href={`/dashboard/writer/manage-books/edit/${book._id}`}>
                                                        <button className="cursor-pointer p-2 hover:bg-theme-primary/20 rounded transition-colors text-text-primary" title="Edit">
                                                            <Pencil size={18} />
                                                        </button>
                                                    </Link>
                                                    <button
                                                        onClick={() => setBookToDelete(book)}
                                                        disabled={deletingId === book._id}
                                                        className="cursor-pointer p-2 hover:bg-red-500/20 rounded transition-colors text-red-500 disabled:opacity-50"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Card View */}
                        <div className="md:hidden space-y-4">
                            {books.map((book) => (
                                <div
                                    key={book._id}
                                    className={`p-4 rounded-lg border transition-all ${isDark
                                        ? 'bg-foreground border-border-dark'
                                        : 'bg-foreground border-border-light'
                                        }`}
                                >
                                    <div className="flex gap-3 mb-3">
                                        {book.image && (
                                            <Link href={`/books/${book._id}`}>
                                                <img src={book.image} alt={book.title} className="w-12 h-16 object-cover rounded" />
                                            </Link>
                                        )}
                                        <div className="flex-1">
                                            <Link href={`/books/${book._id}`}>
                                                <h3 className={`font-semibold text-text-primary line-clamp-1 underline`}>{book.title}</h3>
                                            </Link>
                                            <p className={`text-sm text-text-primary font-semibold mt-1`}>${parseFloat(book.price || 0).toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 justify-between items-center mb-3">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${book.visibility === 'publish'
                                            ? 'bg-green-500 text-white'
                                            : 'bg-yellow-500 text-black'
                                            }`}>
                                            {book.visibility === 'publish' ? 'Published' : 'Private'}
                                        </span>
                                        <span className={`text-sm text-text-secondary`}>Stock: {book.stock || 'N/A'}</span>
                                    </div>
                                    <div className="flex gap-2 justify-between">
                                        <button
                                            onClick={() => toggleVisibility(book)}
                                            disabled={togglingId === book._id}
                                            className="cursor-pointer flex-1 px-3 py-2 bg-yellow-500/30 hover:bg-yellow-500 rounded transition-colors text-sm text-text-primary flex items-center justify-center gap-2 disabled:opacity-50"
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
                                            <button className="cursor-pointer w-full py-2 hover:bg-theme-primary/20 rounded transition-colors text-text-primary text-sm flex items-center justify-center gap-1 border border-border-light dark:border-border-dark">
                                                <Pencil size={16} />
                                                <span>Edit</span>
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => setBookToDelete(book)}
                                            disabled={deletingId === book._id}
                                            className="cursor-pointer px-3 py-2 hover:bg-red-500/20 rounded transition-colors text-red-500 flex items-center justify-center gap-1"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Controlled Delete Confirmation Modal */}
            <Modal isOpen={!!bookToDelete} onClose={() => setBookToDelete(null)}>
                <Modal.Backdrop className="backdrop-blur-sm bg-black/40">
                    <Modal.Container>
                        <Modal.Dialog className={`sm:max-w-[400px] bg-foreground border ${isDark ? 'border-theme-primary/30' : 'border-black/30'}`}>
                            <Modal.CloseTrigger onClick={() => setBookToDelete(null)} />
                            <Modal.Header>
                                <Modal.Icon className="bg-red-500/10 text-red-500">
                                    <Trash2 className="size-5" />
                                </Modal.Icon>
                                <Modal.Heading className='text-text-primary'>Confirm Deletion</Modal.Heading>
                            </Modal.Header>
                            <Modal.Body>
                                <p className="text-sm text-text-primary">
                                    Are you sure you want to permanently delete <strong className="text-text-primary">"{bookToDelete?.title}"</strong>? This action cannot be undone.
                                </p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => setBookToDelete(null)}>
                                    Cancel
                                </Button>
                                <Button
                                    className="bg-red-500 text-white hover:bg-red-600"
                                    onClick={() => handleDeleteBook(bookToDelete?._id)}
                                >
                                    Delete
                                </Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </div>
    )
}
