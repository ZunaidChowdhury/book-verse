'use client'

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Trash2, Eye, EyeOff } from 'lucide-react';
import { getAllBooks, deleteBookAdmin } from '@/lib/api/admin';
import { updateBook } from '@/lib/actions/books';
import Image from 'next/image';
import Link from 'next/link';

export default function ManageBooksPage() {
    const { mode } = useSelector((state) => state.theme);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState('date-desc');
    const [togglingId, setTogglingId] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const data = await getAllBooks();
                const booksArray = Array.isArray(data) ? data : [];
                setBooks(booksArray);
            } catch (err) {
                setError('Failed to load books');
                toast.error('Failed to load books');
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const toggleVisibility = async (book) => {
        try {
            setTogglingId(book._id);
            const newStatus = book.visibility === 'visible' ? 'private' : 'visible';
            console.log('Toggling visibility for book:', book.title, 'to:', newStatus);
            await updateBook(book._id, { visibility: newStatus });

            // Update local state
            setBooks(books.map(b =>
                b._id === book._id ? { ...b, visibility: newStatus } : b
            ));
            toast.success(`Book ${newStatus === 'visible' ? 'published' : 'unpublished'} successfully`);
        } catch (err) {
            console.error('Error toggling visibility:', err);
            toast.error('Failed to toggle visibility');
        } finally {
            setTogglingId(null);
        }
    };

    const handleDeleteBook = async (bookId) => {
        if (!confirm('Are you sure you want to delete this book?')) return;

        try {
            await deleteBookAdmin(bookId);
            setBooks(books.filter(b => b._id !== bookId));
            toast.success('Book deleted successfully');
        } catch (err) {
            toast.error('Failed to delete book');
        }
    };

    const getSortedBooks = () => {
        const sorted = [...books];
        if (sortBy === 'date-desc') {
            sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sortBy === 'date-asc') {
            sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        } else if (sortBy === 'price-high') {
            sorted.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'price-low') {
            sorted.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'title-az') {
            sorted.sort((a, b) => a.title.localeCompare(b.title));
        }
        return sorted;
    };

    const sortedBooks = getSortedBooks();

    if (loading) {
        return (
            <div className={`min-h-screen ${mode === 'dark' ? 'bg-black' : 'bg-white'} p-4 sm:p-6 lg:p-8`}>
                <div className="text-center py-12">
                    <p className={`text-lg ${mode === 'dark' ? 'text-text-secondary' : 'text-text-secondary'}`}>
                        Loading books...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`min-h-screen ${mode === 'dark' ? 'bg-black' : 'bg-white'} p-4 sm:p-6 lg:p-8`}>
                <div className="text-center py-12">
                    <p className="text-lg text-red-500">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${mode === 'dark' ? 'bg-black' : 'bg-white'} transition-colors`}>
            <div className="p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className={`text-3xl sm:text-4xl font-bold mb-2 ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                        Manage Books
                    </h1>
                    <p className={`text-sm sm:text-base ${mode === 'dark' ? 'text-text-secondary' : 'text-text-secondary'}`}>
                        View and manage all ebooks in the system
                    </p>
                </div>

                {/* Sort Dropdown */}
                <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                    <div className="text-sm sm:text-base">
                        <span className={mode === 'dark' ? 'text-text-secondary' : 'text-text-secondary'}>
                            Total: {books.length} book{books.length !== 1 ? 's' : ''}
                        </span>
                    </div>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className={`px-4 py-2 rounded-lg border transition-all text-sm sm:text-base ${mode === 'dark'
                                ? 'bg-foreground border-border-dark text-text-primary'
                                : 'bg-background border-border-light text-text-primary'
                            }`}
                    >
                        <option value="date-desc">Latest First</option>
                        <option value="date-asc">Oldest First</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="title-az">Title: A-Z</option>
                    </select>
                </div>

                {books.length === 0 ? (
                    <div className={`text-center py-16 rounded-lg ${mode === 'dark' ? 'bg-foreground' : 'bg-background'}`}>
                        <p className={`text-lg ${mode === 'dark' ? 'text-text-secondary' : 'text-text-secondary'}`}>
                            No books found
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Desktop Table View */}
                        <div className="hidden md:block overflow-x-auto rounded-lg border border-border-dark">
                            <table className={`w-full text-sm ${mode === 'dark' ? 'bg-foreground' : 'bg-background'}`}>
                                <thead>
                                    <tr className={`border-b ${mode === 'dark' ? 'border-border-dark bg-black/50' : 'border-border-light bg-gray-50'}`}>
                                        <th className={`px-4 py-3 text-left font-semibold ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                                            Book
                                        </th>
                                        <th className={`px-4 py-3 text-left font-semibold ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                                            Writer
                                        </th>
                                        <th className={`px-4 py-3 text-left font-semibold ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                                            Price
                                        </th>
                                        <th className={`px-4 py-3 text-left font-semibold ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                                            Status
                                        </th>
                                        <th className={`px-4 py-3 text-left font-semibold ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedBooks.map((book) => (
                                        <tr key={book._id} className={`border-b ${mode === 'dark' ? 'border-border-dark hover:bg-black/30' : 'border-border-light hover:bg-gray-50'} transition-colors`}>
                                            <td className={`px-4 py-3`}>
                                                <div className="flex gap-3 items-center">
                                                    {book.image ? (
                                                        <Link href={`/books/${book._id}`} >
                                                        <Image
                                                            src={book.image}
                                                            alt={book.title}
                                                            width={40}
                                                            height={50}
                                                            className="rounded object-cover"
                                                        />
                                                        </Link>
                                                    ) : (
                                                        <div className={`w-10 h-12 rounded flex items-center justify-center text-lg ${mode === 'dark' ? 'bg-black/50' : 'bg-gray-200'
                                                            }`}>
                                                            📚
                                                        </div>
                                                    )}
                                                    <Link href={`/books/${book._id}`} className={`underline font-medium max-w-xs truncate ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                                                        {book.title}
                                                    </Link  >
                                                </div>
                                            </td>
                                            <td className={`px-4 py-3 ${mode === 'dark' ? 'text-text-secondary' : 'text-text-secondary'}`}>
                                                {book.writerName || 'N/A'}
                                            </td>
                                            <td className={`px-4 py-3 font-semibold ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                                                ${book.price?.toFixed(2) || '0.00'}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${book.visibility === 'visible'
                                                        ? 'bg-green-100/60 text-green-600'
                                                        : 'bg-yellow-100/60 text-yellow-600'
                                                    }`}>
                                                    {book.visibility === 'visible' ? 'Published' : 'Unpublished'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 flex gap-2">
                                                <button
                                                    onClick={() => toggleVisibility(book)}
                                                    disabled={togglingId === book._id}
                                                    className="cursor-pointer p-2 hover:bg-theme-primary/20 rounded transition-colors disabled:opacity-50"
                                                    title={book.visibility === 'visible' ? 'Unpublish' : 'Publish'}
                                                >
                                                    {book.visibility === 'visible' ? (
                                                        <Eye size={16} />
                                                    ) : (
                                                        <EyeOff size={16} />
                                                    )}
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteBook(book._id)}
                                                    className="cursor-pointer p-2 hover:bg-red-500/20 rounded transition-colors text-red-500"
                                                    title="Delete book"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Card View */}
                        <div className="md:hidden grid grid-cols-1 gap-4">
                            {sortedBooks.map((book) => (
                                <div
                                    key={book._id}
                                    className={`p-4 rounded-lg border transition-all ${mode === 'dark'
                                            ? 'bg-foreground border-border-dark'
                                            : 'bg-background border-border-light'
                                        }`}
                                >
                                    <div className="flex gap-3 mb-4">
                                        {book.image ? (
                                            <Link href={`/books/${book._id}`} >
                                            <Image
                                                // 1. Checks if image exists and starts with http or a leading slash
                                                src={book?.image}
                                                alt={book?.title || "Book cover"}
                                                width={40}
                                                height={50}
                                                className="rounded object-cover"
                                            /> </Link>
                                        ) : (
                                            <div className={`w-10 h-12 rounded flex items-center justify-center text-lg ${mode === 'dark' ? 'bg-black/50' : 'bg-gray-200'
                                                }`}>
                                                📚
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <Link href={`/books/${book._id}`} className="block">
                                                <h3 className={`underline font-semibold text-sm ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                                                    {book.title}
                                                </h3>
                                            </Link>
                                            <p className={`text-xs ${mode === 'dark' ? 'text-text-secondary' : 'text-text-secondary'}`}>
                                                By {book.writerName || 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mb-3 pb-3 border-b border-border-dark">
                                        <span className={`font-semibold text-sm ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                                            ${book.price?.toFixed(2) || '0.00'}
                                        </span>
                                        <span className={`text-xs px-2 py-1 rounded ${book.visibility === 'visible'
                                                ? 'bg-green-100/60 text-green-600'
                                                : 'bg-yellow-100/60 text-yellow-600'
                                            }`}>
                                            {book.visibility === 'visible' ? 'Published' : 'Unpublished'}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => toggleVisibility(book)}
                                            disabled={togglingId === book._id}
                                            className="cursor-pointer flex-1 px-3 py-2 hover:bg-theme-primary/20 rounded transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            {book.visibility === 'visible' ? (
                                                <>
                                                    <Eye size={14} />
                                                    <span>Unpublish</span>
                                                </>
                                            ) : (
                                                <>
                                                    <EyeOff size={14} />
                                                    <span>Publish</span>
                                                </>
                                            )}
                                        </button>
                                        <button
                                            onClick={() => handleDeleteBook(book._id)}
                                            className="cursor-pointer px-3 py-2 hover:bg-red-500/20 rounded transition-colors text-red-500"
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
        </div>
    );
}
