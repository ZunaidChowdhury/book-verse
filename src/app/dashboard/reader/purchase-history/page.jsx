'use client'

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Eye, EyeOff, Trash2, Edit2 } from 'lucide-react';
import { getPurchaseHistory } from '@/lib/api/readers';
import Link from 'next/link';

export default function PurchaseHistoryPage() {
    const { mode } = useSelector((state) => state.theme);
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
            <div className={`min-h-screen ${mode === 'dark' ? 'bg-black' : 'bg-white'} p-4 sm:p-6 lg:p-8`}>
                <div className="text-center py-12">
                    <p className={`text-lg ${mode === 'dark' ? 'text-text-secondary' : 'text-text-secondary'}`}>
                        Loading purchase history...
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
                        Purchase History
                    </h1>
                    <p className={`text-sm sm:text-base ${mode === 'dark' ? 'text-text-secondary' : 'text-text-secondary'}`}>
                        Track all your ebook purchases
                    </p>
                </div>

                {/* Sort Dropdown */}
                <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                    <div className="text-sm sm:text-base">
                        <span className={mode === 'dark' ? 'text-text-secondary' : 'text-text-secondary'}>
                            Total: {purchases.length} purchase{purchases.length !== 1 ? 's' : ''}
                        </span>
                    </div>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className={`px-4 py-2 rounded-lg border transition-all text-sm sm:text-base ${
                            mode === 'dark'
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

                {purchases.length === 0 ? (
                    <div className={`text-center py-16 rounded-lg ${mode === 'dark' ? 'bg-foreground' : 'bg-background'}`}>
                        <p className={`text-lg mb-4 ${mode === 'dark' ? 'text-text-secondary' : 'text-text-secondary'}`}>
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
                        <div className="hidden md:block overflow-x-auto rounded-lg border border-border-dark">
                            <table className={`w-full text-sm ${mode === 'dark' ? 'bg-foreground' : 'bg-background'}`}>
                                <thead>
                                    <tr className={`border-b ${mode === 'dark' ? 'border-border-dark bg-black/50' : 'border-border-light bg-gray-50'}`}>
                                        <th className={`px-4 py-3 text-left font-semibold ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                                            Title
                                        </th>
                                        <th className={`px-4 py-3 text-left font-semibold ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                                            Author
                                        </th>
                                        <th className={`px-4 py-3 text-left font-semibold ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                                            Price
                                        </th>
                                        <th className={`px-4 py-3 text-left font-semibold ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                                            Date
                                        </th>
                                        <th className={`px-4 py-3 text-left font-semibold ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedPurchases.map((purchase) => (
                                        <tr key={purchase._id} className={`border-b ${mode === 'dark' ? 'border-border-dark hover:bg-black/30' : 'border-border-light hover:bg-gray-50'} transition-colors`}>
                                            <td className={`px-4 py-3 font-medium ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                                                {purchase.title}
                                            </td>
                                            <td className={`px-4 py-3 ${mode === 'dark' ? 'text-text-secondary' : 'text-text-secondary'}`}>
                                                {purchase.author || 'N/A'}
                                            </td>
                                            <td className={`px-4 py-3 font-semibold ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                                                ${purchase.price?.toFixed(2) || '0.00'}
                                            </td>
                                            <td className={`px-4 py-3 ${mode === 'dark' ? 'text-text-secondary' : 'text-text-secondary'}`}>
                                                {formatDate(purchase.purchaseDate)}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                    purchase.isPublished 
                                                        ? 'bg-green-100/20 text-green-600' 
                                                        : 'bg-yellow-100/20 text-yellow-600'
                                                }`}>
                                                    {purchase.isPublished ? 'Published' : 'Unpublished'}
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
                                    className={`p-4 rounded-lg border transition-all ${
                                        mode === 'dark' 
                                            ? 'bg-foreground border-border-dark hover:border-theme-primary' 
                                            : 'bg-background border-border-light hover:border-theme-primary'
                                    }`}
                                >
                                    <h3 className={`font-semibold mb-2 text-sm sm:text-base ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                                        {purchase.title}
                                    </h3>
                                    <p className={`text-xs sm:text-sm mb-3 ${mode === 'dark' ? 'text-text-secondary' : 'text-text-secondary'}`}>
                                        By {purchase.author || 'N/A'}
                                    </p>
                                    <div className="flex justify-between items-center mb-3">
                                        <span className={`font-semibold ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                                            ${purchase.price?.toFixed(2) || '0.00'}
                                        </span>
                                        <span className={`text-xs px-2 py-1 rounded ${
                                            purchase.isPublished 
                                                ? 'bg-green-100/20 text-green-600' 
                                                : 'bg-yellow-100/20 text-yellow-600'
                                        }`}>
                                            {purchase.isPublished ? 'Published' : 'Unpublished'}
                                        </span>
                                    </div>
                                    <p className={`text-xs ${mode === 'dark' ? 'text-text-secondary' : 'text-text-secondary'}`}>
                                        {formatDate(purchase.purchaseDate)}
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
