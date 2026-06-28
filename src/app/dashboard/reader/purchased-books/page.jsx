'use client'

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Search } from 'lucide-react';
import { getPurchasedBooks } from '@/lib/api/readers';
import { motion } from 'framer-motion';
import Link from 'next/link';
import BookCard from '@/components/cards/BookCard';
// import BookCard from '@/components/cards/BookCard';

export default function PurchasedBooksPage() {
    const { isDark } = useSelector((state) => state.theme);
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
            <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 transition-colors">
                <div className="text-center py-12">
                    <p className="text-lg text-text-secondary">
                        Loading your library...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 transition-colors">
                <div className="text-center py-12">
                    <p className="text-lg text-red-500">{error}</p>
                </div>
            </div>
        );
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1,
            },
        },
    };

    return (
        <div className="min-h-screen bg-background transition-colors">
            <div className="p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-text-primary">
                        My Library
                    </h1>
                    <p className="text-sm sm:text-base text-text-secondary">
                        Access all your purchased ebooks
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-8">
                    <div className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-all ${isDark
                            ? 'bg-foreground border-border-dark'
                            : 'bg-foreground border-border-light'
                        }`}>
                        <Search size={20} className="text-text-secondary" />
                        <input
                            type="text"
                            placeholder="Search by title or author..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={`flex-1 outline-none text-sm sm:text-base bg-transparent text-text-primary placeholder:text-text-secondary`}
                        />
                    </div>
                </div>

                {/* Books Count */}
                <div className="mb-6">
                    <p className="text-sm text-text-primary">
                        Showing {filteredBooks.length} of {books.length} book{books.length !== 1 ? 's' : ''}
                    </p>
                </div>

                {filteredBooks.length === 0 ? (
                    <div className={`text-center py-16 rounded-lg border ${isDark ? 'bg-foreground border-border-dark' : 'bg-foreground border-border-light'
                        }`}>
                        <p className="text-lg mb-4 text-text-secondary">
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
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'
                    >
                        {filteredBooks.map((book) => <BookCard key={book._id} book={book} />)}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
