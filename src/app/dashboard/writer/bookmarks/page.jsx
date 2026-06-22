'use client'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Bookmark, Search } from 'lucide-react'
import { getWishlist } from '@/lib/api/books'
import Link from 'next/link'

export default function BookmarksPage() {
    const { mode } = useSelector((state) => state.theme)
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
        book.author?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const bgClass = mode === 'dark' ? 'bg-background' : 'bg-background'
    const cardBg = mode === 'dark' ? 'bg-foreground' : 'bg-white'
    const borderClass = mode === 'dark' ? 'border-gray-700' : 'border-gray-200'
    const textPrimary = 'text-text-primary'
    const textSecondary = 'text-text-secondary'
    const inputBg = mode === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'

    return (
        <div className={`min-h-screen ${bgClass} p-4 sm:p-6 lg:p-8`}>
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
                    <div className={`${cardBg} rounded-lg p-8 text-center`}>
                        <p className={textSecondary}>Loading your bookmarks...</p>
                    </div>
                ) : wishlistBooks.length === 0 ? (
                    <div className={`${cardBg} rounded-lg p-12 text-center`}>
                        <Bookmark size={48} className={`${textSecondary} mx-auto mb-4`} />
                        <p className={`${textSecondary} mb-4 text-lg`}>You haven't bookmarked any books yet.</p>
                        <Link href="/books">
                            <button className="bg-theme-primary hover:bg-theme-primary/90 text-white font-semibold px-6 py-3 rounded-lg transition-colors inline-block">
                                Explore Books
                            </button>
                        </Link>
                    </div>
                ) : filteredBooks.length === 0 ? (
                    <div className={`${cardBg} rounded-lg p-12 text-center`}>
                        <Search size={48} className={`${textSecondary} mx-auto mb-4`} />
                        <p className={`${textSecondary} text-lg`}>No books match your search.</p>
                    </div>
                ) : (
                    /* Gallery Grid */
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                        {filteredBooks.map((book) => (
                            <Link href={`/books/${book._id}`} key={book._id}>
                                <div className={`${cardBg} rounded-lg overflow-hidden border ${borderClass} hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full flex flex-col group`}>
                                    {/* Book Cover */}
                                    <div className="relative overflow-hidden bg-gray-200 flex-shrink-0 h-32 sm:h-40 md:h-48">
                                        {book.image ? (
                                            <img
                                                src={book.image}
                                                alt={book.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className={`w-full h-full flex items-center justify-center ${mode === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`}>
                                                <span className={textSecondary}>No Image</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Book Info */}
                                    <div className="p-3 flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className={`font-semibold ${textPrimary} line-clamp-2 text-sm sm:text-base mb-1`}>
                                                {book.title}
                                            </h3>
                                            <p className={`text-xs sm:text-sm ${textSecondary} line-clamp-1 mb-2`}>
                                                {book.author}
                                            </p>
                                        </div>

                                        {/* Price and Status */}
                                        <div className="space-y-2">
                                            {book.price && (
                                                <p className={`text-sm sm:text-base font-bold text-theme-primary`}>
                                                    ${parseFloat(book.price).toFixed(2)}
                                                </p>
                                            )}
                                            <div className="flex items-center gap-2">
                                                <span className={`text-xs px-2 py-1 rounded-full ${
                                                    book.availabilityStatus === 'available'
                                                        ? 'bg-green-100 text-green-800'
                                                        : book.availabilityStatus === 'coming-soon'
                                                        ? 'bg-blue-100 text-blue-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {book.availabilityStatus === 'available'
                                                        ? 'Available'
                                                        : book.availabilityStatus === 'coming-soon'
                                                        ? 'Coming Soon'
                                                        : 'Out of Stock'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
