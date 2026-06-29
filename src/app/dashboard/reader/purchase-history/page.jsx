'use client'

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getPurchaseHistory } from '@/lib/api/readers';
import Link from 'next/link';
import Image from 'next/image';
import MyCustomSpinner from '@/components/spinner/MyCustomSpinner'

export default function PurchaseHistoryPage() {
    const { isDark } = useSelector((state) => state.theme);
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState('date-desc');

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                setLoading(true);
                const data = await getPurchaseHistory();
                const purchaseArray = Array.isArray(data) ? data : [];
                console.log('Fetched purchase history data:', data);
                setPurchases(purchaseArray);
            } catch (err) {
                setError('Failed to load purchase history');
                toast.error('Failed to load purchase history');
            } finally {
                setLoading(false);
            }
        };

        fetchPurchases();
    }, []);

    const getSortedPurchases = () => {
        const sorted = [...purchases];
        if (sortBy === 'date-desc') {
            sorted.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
        } else if (sortBy === 'date-asc') {
            sorted.sort((a, b) => new Date(a.purchaseDate) - new Date(b.purchaseDate));
        } else if (sortBy === 'price-high') {
            sorted.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'price-low') {
            sorted.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'title-az') {
            sorted.sort((a, b) => a.title.localeCompare(b.title));
        }
        return sorted;
    };

    const sortedPurchases = getSortedPurchases();

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className={`my-30`}>
                <MyCustomSpinner />
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

    return (
        <div className="min-h-screen bg-background transition-colors">
            <div className="p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-text-primary">
                        Purchase History
                    </h1>
                    <p className="text-sm sm:text-base text-text-secondary">
                        Track all your ebook purchases
                    </p>
                </div>

                {/* Sort Dropdown */}
                <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                    <div className="text-sm sm:text-base">
                        <span className="text-text-primary">
                            Total: {purchases.length} purchase{purchases.length !== 1 ? 's' : ''}
                        </span>
                    </div>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className={`px-4 py-2 rounded-lg border transition-all text-sm sm:text-base ${isDark
                            ? 'bg-foreground border-border-dark text-text-primary'
                            : 'bg-foreground border-border-light text-text-primary'
                            }`}
                    >
                        <option value="date-desc">Latest First</option>
                        <option value="date-asc">Oldest First</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="title-az">Title: A-Z</option>
                    </select>
                </div>

                {purchases.length === 0 ? (
                    <div className={`text-center py-16 rounded-lg border ${isDark ? 'bg-foreground border-border-dark' : 'bg-foreground border-border-light'
                        }`}>
                        <p className="text-lg mb-4 text-text-secondary">
                            No purchases yet
                        </p>
                        <Link
                            href="/explore"
                            className="inline-block px-6 py-2 bg-theme-primary text-white rounded-lg hover:opacity-90 transition-opacity"
                        >
                            Explore Books
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Desktop Table View */}
                        <div className={`hidden md:block overflow-x-auto rounded-lg border ${isDark ? 'border-border-dark' : 'border-border-light'
                            }`}>
                            <table className={`w-full text-sm ${isDark ? 'bg-foreground' : 'bg-foreground'
                                }`}>
                                <thead>
                                    <tr className={`border-b ${isDark ? 'border-border-dark bg-black/20' : 'border-border-light bg-black/5'
                                        }`}>
                                        <th className="px-4 py-3 text-left font-semibold text-text-primary">
                                            Title
                                        </th>
                                        <th className="px-4 py-3 text-left font-semibold text-text-primary">
                                            Writer
                                        </th>
                                        <th className="px-4 py-3 text-left font-semibold text-text-primary">
                                            Price
                                        </th>
                                        <th className="px-4 py-3 text-left font-semibold text-text-primary">
                                            Date
                                        </th>
                                        <th className="px-4 py-3 text-left font-semibold text-text-primary">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedPurchases.map((purchase) => (
                                        <tr key={purchase._id} className={`border-b transition-colors ${isDark
                                            ? 'border-border-dark hover:bg-black/20'
                                            : 'border-border-light hover:bg-black/5'
                                            }`}>
                                            <td className="px-4 py-3 font-medium text-text-primary">
                                                <div className="flex gap-3 items-center">
                                                    {
                                                        purchase?.image && (
                                                            <Link href={`/books/${purchase.bookId}`} >
                                                                <Image
                                                                    src={purchase.image}
                                                                    alt={purchase.bookTitle}
                                                                    width={40}
                                                                    height={50}
                                                                    className="rounded object-cover"
                                                                />
                                                            </Link>
                                                        )
                                                    }
                                                    <Link href={`/books/${purchase.bookId}`} className="hover:underline">
                                                        {purchase.bookTitle}
                                                    </Link>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-text-primary">
                                                {purchase.writerName || 'N/A'}
                                            </td>
                                            <td className="px-4 py-3 font-semibold text-text-primary">
                                                ${purchase.amountPaid?.toFixed(2) || '0.00'}
                                            </td>
                                            <td className="px-4 py-3 text-text-primary">
                                                {formatDate(purchase.purchasedAt)}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${purchase.visibility === 'publish'
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-yellow-500 text-white'
                                                    }`}>
                                                    {purchase.visibility === 'publish' ? 'Published' : 'Unpublished'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Card View */}
                        <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {sortedPurchases.map((purchase) => (
                                <div
                                    key={purchase._id}
                                    className={`p-4 rounded-lg border transition-all ${isDark
                                        ? 'bg-foreground border-border-dark hover:border-theme-primary'
                                        : 'bg-foreground border-border-light hover:border-theme-primary'
                                        }`}
                                >
                                    <h3 className="font-semibold mb-2 text-sm sm:text-base text-text-primary">
                                        {purchase.bookTitle}
                                    </h3>
                                    <p className="text-xs sm:text-sm mb-3 text-text-primary">
                                        By {purchase.writerName || 'N/A'}
                                    </p>
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="font-semibold text-text-primary">
                                            ${purchase.amountPaid?.toFixed(2) || '0.00'}
                                        </span>
                                        <span className={`text-xs px-2 py-1 rounded ${purchase.visibility === 'publish'
                                            ? 'bg-green-500 text-white'
                                            : 'bg-yellow-500 text-white'
                                            }`}>
                                            {purchase.visibility === 'publish' ? 'Published' : 'Unpublished'}
                                        </span>
                                    </div>
                                    <p className="text-xs text-text-primary">
                                        {formatDate(purchase.purchasedAt)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
