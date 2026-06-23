'use client'

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllTransactions } from '@/lib/api/admin';

export default function MonitorTransactionsPage() {
    const { mode } = useSelector((state) => state.theme);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState('date-desc');
    const [filterType, setFilterType] = useState('all');

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setLoading(true);
                const data = await getAllTransactions();
                const transArray = Array.isArray(data) ? data : [];
                setTransactions(transArray);
            } catch (err) {
                setError('Failed to load transactions');
                toast.error('Failed to load transactions');
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    const getSortedAndFilteredTransactions = () => {
        let filtered = [...transactions];
        
        if (filterType !== 'all') {
            filtered = filtered.filter(t => t.type === filterType);
        }

        if (sortBy === 'date-desc') {
            filtered.sort((a, b) => new Date(b.paymentDate) - new Date(a.paymentDate));
        } else if (sortBy === 'date-asc') {
            filtered.sort((a, b) => new Date(a.paymentDate) - new Date(b.paymentDate));
        } else if (sortBy === 'amount-high') {
            filtered.sort((a, b) => b.amount - a.amount);
        } else if (sortBy === 'amount-low') {
            filtered.sort((a, b) => a.amount - b.amount);
        }
        
        return filtered;
    };

    const processedTransactions = getSortedAndFilteredTransactions();

    const totalRevenue = transactions.reduce((sum, t) => sum + (t.amount || 0), 0);
    const totalTransactions = transactions.length;
    const avgTransaction = totalTransactions > 0 ? totalRevenue / totalTransactions : 0;

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getTypeColor = (type) => {
        if (type === 'purchase') return 'bg-green-100/20 text-green-600';
        if (type === 'publishing-fee') return 'bg-blue-100/20 text-blue-600';
        if (type === 'refund') return 'bg-red-100/20 text-red-600';
        return 'bg-gray-100/20 text-gray-600';
    };

    if (loading) {
        return (
            <div className={`min-h-screen ${mode === 'dark' ? 'bg-black' : 'bg-white'} p-4 sm:p-6 lg:p-8`}>
                <div className="text-center py-12">
                    <p className={`text-lg ${mode === 'dark' ? 'text-text-secondary' : 'text-text-secondary'}`}>
                        Loading transactions...
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
                        Monitor Transactions
                    </h1>
                    <p className={`text-sm sm:text-base ${mode === 'dark' ? 'text-text-secondary' : 'text-text-secondary'}`}>
                        View all system transactions and revenue
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className={`p-6 rounded-lg border ${
                        mode === 'dark' 
                            ? 'bg-foreground border-border-dark' 
                            : 'bg-background border-border-light'
                    }`}>
                        <p className={`text-sm ${mode === 'dark' ? 'text-text-secondary' : 'text-text-secondary'} mb-2`}>
                            Total Transactions
                        </p>
                        <p className={`text-3xl font-bold ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                            {totalTransactions}
                        </p>
                    </div>
                    <div className={`p-6 rounded-lg border ${
                        mode === 'dark' 
                            ? 'bg-foreground border-border-dark' 
                            : 'bg-background border-border-light'
                    }`}>
                        <p className={`text-sm ${mode === 'dark' ? 'text-text-secondary' : 'text-text-secondary'} mb-2`}>
                            Total Revenue
                        </p>
                        <p className={`text-3xl font-bold ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                            ${totalRevenue.toFixed(2)}
                        </p>
                    </div>
                    <div className={`p-6 rounded-lg border ${
                        mode === 'dark' 
                            ? 'bg-foreground border-border-dark' 
                            : 'bg-background border-border-light'
                    }`}>
                        <p className={`text-sm ${mode === 'dark' ? 'text-text-secondary' : 'text-text-secondary'} mb-2`}>
                            Avg Transaction
                        </p>
                        <p className={`text-3xl font-bold ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                            ${avgTransaction.toFixed(2)}
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <div className="mb-6 flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <label className={`block text-sm font-medium mb-2 ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                            Filter by Type
                        </label>
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className={`w-full px-4 py-2 rounded-lg border transition-all text-sm ${
                                mode === 'dark'
                                    ? 'bg-foreground border-border-dark text-text-primary'
                                    : 'bg-background border-border-light text-text-primary'
                            }`}
                        >
                            <option value="all">All Types</option>
                            <option value="purchase">Purchase</option>
                            <option value="publishing-fee">Publishing Fee</option>
                            <option value="refund">Refund</option>
                        </select>
                    </div>
                    <div className="flex-1">
                        <label className={`block text-sm font-medium mb-2 ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                            Sort by
                        </label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className={`w-full px-4 py-2 rounded-lg border transition-all text-sm ${
                                mode === 'dark'
                                    ? 'bg-foreground border-border-dark text-text-primary'
                                    : 'bg-background border-border-light text-text-primary'
                            }`}
                        >
                            <option value="date-desc">Latest First</option>
                            <option value="date-asc">Oldest First</option>
                            <option value="amount-high">Amount: High to Low</option>
                            <option value="amount-low">Amount: Low to High</option>
                        </select>
                    </div>
                </div>

                {processedTransactions.length === 0 ? (
                    <div className={`text-center py-16 rounded-lg ${mode === 'dark' ? 'bg-foreground' : 'bg-background'}`}>
                        <p className={`text-lg ${mode === 'dark' ? 'text-text-secondary' : 'text-text-secondary'}`}>
                            No transactions found
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
                                            Transaction ID
                                        </th>
                                        <th className={`px-4 py-3 text-left font-semibold ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                                            Type
                                        </th>
                                        <th className={`px-4 py-3 text-left font-semibold ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                                            Email
                                        </th>
                                        <th className={`px-4 py-3 text-left font-semibold ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                                            Amount
                                        </th>
                                        <th className={`px-4 py-3 text-left font-semibold ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                                            Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {processedTransactions.map((transaction) => (
                                        <tr key={transaction._id} className={`border-b ${mode === 'dark' ? 'border-border-dark hover:bg-black/30' : 'border-border-light hover:bg-gray-50'} transition-colors`}>
                                            <td className={`px-4 py-3 text-xs sm:text-sm font-mono ${mode === 'dark' ? 'text-text-secondary' : 'text-text-secondary'}`}>
                                                {transaction._id?.toString().slice(0, 8)}...
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(transaction.type)}`}>
                                                    {transaction.type === 'publishing-fee' ? 'Publishing Fee' : transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                                                </span>
                                            </td>
                                            <td className={`px-4 py-3 text-xs sm:text-sm ${mode === 'dark' ? 'text-text-secondary' : 'text-text-secondary'}`}>
                                                {transaction.buyerEmail || transaction.writerEmail || 'N/A'}
                                            </td>
                                            <td className={`px-4 py-3 font-semibold ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                                                ${transaction.amount?.toFixed(2) || '0.00'}
                                            </td>
                                            <td className={`px-4 py-3 text-xs sm:text-sm ${mode === 'dark' ? 'text-text-secondary' : 'text-text-secondary'}`}>
                                                {formatDate(transaction.paymentDate)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Card View */}
                        <div className="md:hidden grid grid-cols-1 gap-4">
                            {processedTransactions.map((transaction) => (
                                <div 
                                    key={transaction._id}
                                    className={`p-4 rounded-lg border transition-all ${
                                        mode === 'dark' 
                                            ? 'bg-foreground border-border-dark' 
                                            : 'bg-background border-border-light'
                                    }`}
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <p className={`text-xs font-mono ${mode === 'dark' ? 'text-text-secondary' : 'text-text-secondary'}`}>
                                                ID: {transaction._id?.toString().slice(0, 12)}...
                                            </p>
                                            <p className={`text-xs ${mode === 'dark' ? 'text-text-secondary' : 'text-text-secondary'} mt-1`}>
                                                {transaction.buyerEmail || transaction.writerEmail || 'N/A'}
                                            </p>
                                        </div>
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(transaction.type)}`}>
                                            {transaction.type === 'publishing-fee' ? 'Fee' : transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-end pt-3 border-t border-border-dark">
                                        <p className={`text-xs ${mode === 'dark' ? 'text-text-secondary' : 'text-text-secondary'}`}>
                                            {formatDate(transaction.paymentDate)}
                                        </p>
                                        <p className={`text-lg font-semibold ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                                            ${transaction.amount?.toFixed(2) || '0.00'}
                                        </p>
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
