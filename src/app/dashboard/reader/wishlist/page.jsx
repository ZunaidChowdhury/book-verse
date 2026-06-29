'use client'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Bookmark, Search } from 'lucide-react'
import { getWishlist } from '@/lib/api/books'
import BookCard from '@/components/cards/BookCard'
import Link from 'next/link'
import { motion } from 'framer-motion';
import MyCustomSpinner from '@/components/spinner/MyCustomSpinner'

export default function WishlistPage() {
    const { isDark } = useSelector((state) => state.theme)
    const [wishlistBooks, setWishlistBooks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                setLoading(true)
                const data = await getWishlist()
                setWishlistBooks(data)
            } catch (err) {
                setError(err.message || 'Failed to fetch wishlist')
                console.error('Error fetching wishlist:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchWishlist()
    }, [])

    const filteredBooks = wishlistBooks.filter(book =>
        book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.writerName?.toLowerCase().includes(searchTerm.toLowerCase())
    )

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
        <div className="min-h-screen bg-background  transition-colors">
            <div className="p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <Bookmark size={32} className="text-theme-primary" />
                        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary">My Wishlist</h1>
                    </div>
                    <p className="text-text-secondary">
                        {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''} saved for later
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-8">
                    <div className={`relative flex items-center border rounded-lg px-4 py-2 transition-all ${isDark
                            ? 'bg-foreground border-border-dark'
                            : 'bg-foreground border-border-light'
                        }`}>
                        <Search size={20} className="text-text-secondary" />
                        <input
                            type="text"
                            placeholder="Search by title or author..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1 ml-3 bg-transparent outline-none text-text-primary placeholder:text-text-secondary"
                        />
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="text-center mb-6 p-4 bg-red-100/20 border border-red-400/40 text-red-500 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Loading State */}
                {loading ? (
                    <div className={`rounded-lg border p-8 text-center ${isDark ? 'bg-foreground border-border-dark' : 'bg-foreground border-border-light'
                        }`}>
                        {/* <p className="text-text-secondary">Loading your wishlist...</p> */}
                        <MyCustomSpinner />
                    </div>
                ) : wishlistBooks.length === 0 ? (
                    <div className={`rounded-lg border p-12 text-center ${isDark ? 'bg-foreground border-border-dark' : 'bg-foreground border-border-light'
                        }`}>
                        <Bookmark size={48} className="text-text-secondary mx-auto mb-4" />
                        <p className="text-text-secondary mb-4 text-lg">You haven&apos;t added any books to your wishlist yet.</p>
                        <Link href="/books">
                            <button className="bg-theme-primary hover:opacity-90 text-white font-semibold px-6 py-3 rounded-lg transition-opacity inline-block">
                                Explore Books
                            </button>
                        </Link>
                    </div>
                ) : filteredBooks.length === 0 ? (
                    <div className={`rounded-lg border p-12 text-center ${isDark ? 'bg-foreground border-border-dark' : 'bg-foreground border-border-light'
                        }`}>
                        <Search size={48} className="text-text-secondary mx-auto mb-4" />
                        <p className="text-text-secondary text-lg">No books match your search.</p>
                    </div>
                ) : (
                    /* Gallery Grid using BookCard Component */
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
                    >
                        {filteredBooks.map((book) => (
                            <BookCard key={book._id} book={book} />
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    )
}
