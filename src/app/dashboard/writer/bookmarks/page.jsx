'use client'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Bookmark, Search } from 'lucide-react'
import { getWishlist } from '@/lib/api/books'
import BookCard from '@/components/cards/BookCard'
import Link from 'next/link'

export default function BookmarksPage() {
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

    const bgClass = 'bg-background'
    const cardBg = 'bg-foreground'
    const borderClass = isDark ? 'border-border-dark' : 'border-border-light'
    const textPrimary = 'text-text-primary'
    const textSecondary = 'text-text-secondary'
    const inputBg = isDark ? 'bg-foreground border-border-dark text-text-primary' : 'bg-foreground border-border-light text-text-primary'

    return (
        <div className={`min-h-screen ${bgClass} transition-colors p-4 sm:p-6 lg:p-8`}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <Bookmark size={32} className="text-theme-primary" />
                        <h1 className={`text-3xl sm:text-4xl font-bold ${textPrimary}`}>My Bookmarks</h1>
                    </div>
                    <p className={`${textSecondary}`}>
                        {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''} in your wishlist
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-8">
                    <div className={`relative flex items-center ${inputBg} border rounded-lg px-4 py-2`}>
                        <Search size={20} className={textSecondary} />
                        <input
                            type="text"
                            placeholder="Search by title or author..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={`flex-1 ml-3 bg-transparent outline-none ${textPrimary}`}
                        />
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Loading State */}
                {loading ? (
                    <div className={`${cardBg} rounded-lg p-8 border ${borderClass} text-center`}>
                        <p className={textSecondary}>Loading your bookmarks...</p>
                    </div>
                ) : wishlistBooks.length === 0 ? (
                    <div className={`${cardBg} rounded-lg p-12 border ${borderClass} text-center`}>
                        <Bookmark size={48} className={`${textSecondary} mx-auto mb-4`} />
                        <p className={`${textSecondary} mb-4 text-lg`}>You haven't bookmarked any books yet.</p>
                        <Link href="/books">
                            <button className="bg-theme-primary hover:bg-theme-primary/90 text-white font-semibold px-6 py-3 rounded-lg transition-colors inline-block">
                                Explore Books
                            </button>
                        </Link>
                    </div>
                ) : filteredBooks.length === 0 ? (
                    <div className={`${cardBg} rounded-lg p-12 border ${borderClass} text-center`}>
                        <Search size={48} className={`${textSecondary} mx-auto mb-4`} />
                        <p className={`${textSecondary} text-lg`}>No books match your search.</p>
                    </div>
                ) : (
                    /* Gallery Grid using BookCard Component */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredBooks.map((book) => (
                            <BookCard key={book._id} book={book} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
