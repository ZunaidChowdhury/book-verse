'use client'

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Search } from 'lucide-react';
import { getPurchasedBooks } from '@/lib/api/readers';
import Image from 'next/image';
import Link from 'next/link';

export default function PurchasedBooksPage() {
    const { mode } = useSelector((state) => state.theme);
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const data = await getPurchasedBooks();
                const booksArray = Array.isArray(data) ? data : [];
                setBooks(booksArray);
                setFilteredBooks(booksArray);
            } catch (err) {
                setError('Failed to load purchased books');
                toast.error('Failed to load purchased books');
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    useEffect(() => {
        const filtered = books.filter(book => 
            book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBooks(filtered);
    }, [searchTerm, books]);

    if (loading) {
        return (
            <div className={`min-h-screen ${mode === 'dark' ? 'bg-black' : 'bg-white'} p-4 sm:p-6 lg:p-8`}>
                <div className="text-center py-12">
                    <p className={`text-lg ${mode === 'dark' ? 'text-text-secondary' : 'text-text-secondary'}`}>
                        Loading your library...
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
                        My Library
                    </h1>
                    <p className={`text-sm sm:text-base ${mode === 'dark' ? 'text-text-secondary' : 'text-text-secondary'}`}>
                        Access all your purchased ebooks
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-8">
                    <div className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-all ${
                        mode === 'dark' 
                            ? 'bg-foreground border-border-dark' 
                            : 'bg-background border-border-light'
                    }`}>
                        <Search size={20} className={mode === 'dark' ? 'text-text-secondary' : 'text-text-secondary'} />
                        <input
                            type="text"
                            placeholder="Search by title or author..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={`flex-1 outline-none text-sm sm:text-base ${
                                mode === 'dark'
                                    ? 'bg-foreground text-text-primary placeholder-text-secondary'
                                    : 'bg-background text-text-primary placeholder-text-secondary'
                            }`}
                        />
                    </div>
                </div>

                {/* Books Count */}
                <div className="mb-6">
                    <p className={`text-sm ${mode === 'dark' ? 'text-text-secondary' : 'text-text-secondary'}`}>
                        Showing {filteredBooks.length} of {books.length} book{books.length !== 1 ? 's' : ''}
                    </p>
                </div>

                {filteredBooks.length === 0 ? (
                    <div className={`text-center py-16 rounded-lg ${mode === 'dark' ? 'bg-foreground' : 'bg-background'}`}>
                        <p className={`text-lg mb-4 ${mode === 'dark' ? 'text-text-secondary' : 'text-text-secondary'}`}>
                            {books.length === 0 ? 'No books purchased yet' : 'No books match your search'}
                        </p>
                        {books.length === 0 && (
                            <Link 
                                href="/explore"
                                className="inline-block px-6 py-2 bg-theme-primary text-white rounded-lg hover:opacity-90 transition-opacity"
                            >
                                Explore Books
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                        {filteredBooks.map((book) => (
                            <Link 
                                key={book._id}
                                href={`/books/${book._id}`}
                                className={`group rounded-lg overflow-hidden transition-all transform hover:scale-105 ${
                                    mode === 'dark' ? 'bg-foreground' : 'bg-background'
                                }`}
                            >
                                {/* Book Cover */}
                                <div className={`relative aspect-[3/4] overflow-hidden rounded-lg mb-3 border ${
                                    mode === 'dark' ? 'border-border-dark' : 'border-border-light'
                                }`}>
                                    {book.coverImage ? (
                                        <Image
                                            src={book.coverImage}
                                            alt={book.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className={`w-full h-full flex items-center justify-center ${
                                            mode === 'dark' ? 'bg-black/50' : 'bg-gray-200'
                                        }`}>
                                            <span className={`text-2xl ${mode === 'dark' ? 'text-text-secondary' : 'text-text-secondary'}`}>
                                                📚
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Book Info */}
                                <div className="px-2">
                                    <h3 className={`font-semibold text-xs sm:text-sm line-clamp-2 ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                                        {book.title}
                                    </h3>
                                    <p className={`text-xs line-clamp-1 mt-1 ${mode === 'dark' ? 'text-text-secondary' : 'text-text-secondary'}`}>
                                        {book.author}
                                    </p>
                                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-border-dark">
                                        <span className={`font-semibold text-xs sm:text-sm ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                                            ${book.price?.toFixed(2) || '0.00'}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
