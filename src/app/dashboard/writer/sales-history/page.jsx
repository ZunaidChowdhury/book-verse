'use client'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { TrendingUp, Calendar } from 'lucide-react'
import { getSalesHistory } from '@/lib/api/books'

export default function SalesHistoryPage() {
    const { isDark } = useSelector((state) => state.theme)
    const [salesData, setSalesData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [sortBy, setSortBy] = useState('date')

    useEffect(() => {
        const fetchSalesHistory = async () => {
            try {
                setLoading(true)
                const data = await getSalesHistory()
                // console.log('Fetched sales history data:', data)
                setSalesData(data)
            } catch (err) {
                setError(err.message || 'Failed to fetch sales history')
                // console.error('Error fetching sales history:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchSalesHistory()
    }, [])

    const sortedData = [...salesData].sort((a, b) => {
        if (sortBy === 'date') {
            return new Date(b.purchaseDate) - new Date(a.purchaseDate)
        } else if (sortBy === 'amount') {
            return b.amount - a.amount
        } else if (sortBy === 'title') {
            return a.bookTitle?.localeCompare(b.bookTitle)
        }
        return 0
    })

    const totalSales = salesData.reduce((sum, sale) => sum + (sale.amountPaid || 0), 0)
    const totalTransactions = salesData.length

    const bgClass = 'bg-background'
    const cardBg = 'bg-foreground'
    const borderClass = isDark ? 'border-border-dark' : 'border-border-light'
    const textPrimary = 'text-text-primary'
    const textSecondary = 'text-text-secondary'
    const selectBg = isDark ? 'bg-foreground border-border-dark text-text-primary' : 'bg-foreground border-border-light text-text-primary'
    const buttonHover = isDark ? 'hover:bg-black/30' : 'hover:bg-gray-50'

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A'
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    return (
        <div className={`min-h-screen ${bgClass} transition-colors p-4 sm:p-6 lg:p-8`}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <TrendingUp size={32} className="text-theme-primary" />
                        <h1 className={`text-3xl sm:text-4xl font-bold ${textPrimary}`}>Sales History</h1>
                    </div>
                    <p className={`${textSecondary}`}>
                        Track all your book sales and transactions
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className={`${cardBg} rounded-lg p-6 border ${borderClass}`}>
                        <p className={`${textSecondary} text-sm mb-2`}>Total Sales</p>
                        <h3 className={`text-3xl sm:text-4xl font-bold ${textPrimary}`}>
                            ${totalSales.toFixed(2)}
                        </h3>
                        <p className={`${textSecondary} text-sm mt-2`}>From {totalTransactions} transaction{totalTransactions !== 1 ? 's' : ''}</p>
                    </div>
                    <div className={`${cardBg} rounded-lg p-6 border ${borderClass}`}>
                        <p className={`${textSecondary} text-sm mb-2`}>Total Transactions</p>
                        <h3 className={`text-3xl sm:text-4xl font-bold ${textPrimary}`}>
                            {totalTransactions}
                        </h3>
                        <p className={`${textSecondary} text-sm mt-2`}>Average per sale: ${totalTransactions > 0 ? (totalSales / totalTransactions).toFixed(2) : '0.00'}</p>
                    </div>
                </div>

                {/* Sort Options */}
                {!loading && salesData.length > 0 && (
                    <div className="mb-6 flex gap-2 flex-wrap items-center">
                        <span className={`${textSecondary} text-sm font-medium`}>Sort by:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className={`${selectBg} border rounded-lg px-3 py-2 text-sm text-text-primary cursor-pointer`}
                        >
                            <option value="date">Date (Newest)</option>
                            <option value="amount">Amount (Highest)</option>
                            <option value="title">Book Title (A-Z)</option>
                        </select>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Loading State */}
                {loading ? (
                    <div className={`${cardBg} rounded-lg p-8 border ${borderClass} text-center`}>
                        <p className={textSecondary}>Loading sales history...</p>
                    </div>
                ) : salesData.length === 0 ? (
                    <div className={`${cardBg} rounded-lg p-12 border ${borderClass} text-center`}>
                        <Calendar size={48} className={`${textSecondary} mx-auto mb-4`} />
                        <p className={`${textSecondary} mb-2 text-lg`}>No sales yet.</p>
                        <p className={textSecondary}>Your sales will appear here once readers purchase your books.</p>
                    </div>
                ) : (
                    /* Desktop Table View */
                    <div className={`hidden md:block overflow-x-auto rounded-lg border ${borderClass}`}>
                        <table className="w-full text-sm bg-foreground">
                            <thead>
                                <tr className={`border-b ${isDark ? 'border-border-dark bg-black/50' : 'border-border-light bg-gray-50'}`}>
                                    <th className={`px-6 py-4 text-left font-semibold text-text-primary`}>Book Title</th>
                                    <th className={`px-6 py-4 text-left font-semibold text-text-primary`}>Reader Name</th>
                                    <th className={`px-6 py-4 text-left font-semibold text-text-primary`}>Purchase Date</th>
                                    <th className={`px-6 py-4 text-right font-semibold text-text-primary`}>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedData.map((sale, index) => (
                                    <tr key={index} className={`border-b ${borderClass} hover:${buttonHover} transition-colors`}>
                                        <td className={`px-6 py-4 text-text-primary font-medium line-clamp-1`}>
                                            {sale.bookTitle || 'N/A'}
                                        </td>
                                        <td className={`px-6 py-4 text-text-primary`}>
                                            {sale.userName || 'Anonymous'}
                                        </td>
                                        <td className={`px-6 py-4 text-text-secondary`}>
                                            {formatDate(sale.purchasedAt)}
                                        </td>
                                        <td className={`px-6 py-4 text-right font-semibold text-theme-primary`}>
                                            ${parseFloat(sale.amountPaid || 0).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4">
                    {!loading && !error && sortedData.map((sale, index) => (
                        <div key={index} className={`${cardBg} rounded-lg p-4 border ${borderClass}`}>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className={`text-xs font-semibold ${textSecondary} mb-1`}>BOOK TITLE</p>
                                    <p className={`${textPrimary} font-medium line-clamp-2`}>{sale.bookTitle || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className={`text-xs font-semibold ${textSecondary} mb-1`}>BUYER</p>
                                    <p className={`${textPrimary} font-medium line-clamp-2`}>{sale.buyerName || 'Anonymous'}</p>
                                </div>
                                <div>
                                    <p className={`text-xs font-semibold ${textSecondary} mb-1`}>DATE</p>
                                    <p className={`${textSecondary}`}>{formatDate(sale.purchaseDate)}</p>
                                </div>
                                <div>
                                    <p className={`text-xs font-semibold ${textSecondary} mb-1`}>AMOUNT</p>
                                    <p className={`text-lg font-bold text-theme-primary`}>${parseFloat(sale.amount || 0).toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
