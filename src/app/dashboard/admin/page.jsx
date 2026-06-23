'use client'

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getDashboardAnalytics, getMonthlySalesData, getBooksByGenre } from '@/lib/api/admin';
import { Users, BookOpen, TrendingUp, DollarSign } from 'lucide-react';
import { authClient } from '@/lib/auth-client';

export default function AdminDashboardPage() {
    const { mode } = useSelector((state) => state.theme);
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const [analytics, setAnalytics] = useState(null);
    const [monthlySales, setMonthlySales] = useState([]);
    const [booksByGenre, setBooksByGenre] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                
                const [analyticsData, salesData, genreData] = await Promise.all([
                    getDashboardAnalytics(),
                    getMonthlySalesData(),
                    getBooksByGenre()
                ]);

                setAnalytics(analyticsData);
                setMonthlySales(Array.isArray(salesData) ? salesData : []);
                setBooksByGenre(Array.isArray(genreData) ? genreData : []);
            } catch (err) {
                setError('Failed to load analytics');
                toast.error('Failed to load analytics');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className={`${mode === 'dark' ? 'bg-black' : 'bg-white'} p-4 sm:p-6 lg:p-8`}>
                <div className="text-center py-12">
                    <p className={`text-lg ${mode === 'dark' ? 'text-text-secondary' : 'text-text-secondary'}`}>
                        Loading analytics...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`${mode === 'dark' ? 'bg-black' : 'bg-white'} p-4 sm:p-6 lg:p-8`}>
                <div className="text-center py-12">
                    <p className="text-lg text-red-500">{error}</p>
                </div>
            </div>
        );
    }

    const stats = [
        {
            label: 'Total Users',
            value: analytics?.totalUsers || 0,
            icon: Users,
            color: 'bg-blue-100/20 text-blue-600'
        },
        {
            label: 'Total Writers',
            value: analytics?.totalWriters || 0,
            icon: BookOpen,
            color: 'bg-green-100/20 text-green-600'
        },
        {
            label: 'Total Books Sold',
            value: analytics?.totalBooksSold || 0,
            icon: TrendingUp,
            color: 'bg-purple-100/20 text-purple-600'
        },
        {
            label: 'Total Revenue',
            value: `$${(analytics?.totalRevenue || 0).toFixed(2)}`,
            icon: DollarSign,
            color: 'bg-orange-100/20 text-orange-600'
        }
    ];

    const maxSalesValue = Math.max(...monthlySales.map(m => m.sales || 0), 1);
    const maxGenreValue = Math.max(...booksByGenre.map(g => g.count || 0), 1);

    return (
        <div className={`${mode === 'dark' ? 'bg-black' : 'bg-white'}`}>
            <div className="p-4 sm:p-6 lg:p-8">
                <div>
                {/* Welcome Section */}
                <div className="mb-12">
                    <h1 className={`text-4xl sm:text-5xl font-bold mb-3 ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                        Welcome back, {user?.name || 'Admin'}
                    </h1>
                    <p className={`text-lg ${mode === 'dark' ? 'text-text-secondary' : 'text-text-secondary'}`}>
                        Platform overview and management dashboard
                    </p>
                </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {stats.map((stat, idx) => {
                            const Icon = stat.icon;
                            return (
                                <div
                                    key={idx}
                                    className={`p-6 rounded-lg border transition-all ${
                                        mode === 'dark' 
                                            ? 'bg-foreground border-border-dark hover:border-theme-primary' 
                                            : 'bg-background border-border-light hover:border-theme-primary'
                                    }`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className={`text-sm font-medium ${mode === 'dark' ? 'text-text-secondary' : 'text-text-secondary'} mb-2`}>
                                                {stat.label}
                                            </p>
                                            <p className={`text-2xl sm:text-3xl font-bold ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                                                {stat.value}
                                            </p>
                                        </div>
                                        <div className={`p-3 rounded-lg ${stat.color}`}>
                                            <Icon size={20} />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Monthly Sales Chart */}
                        <div className={`p-6 rounded-lg border ${
                            mode === 'dark' 
                                ? 'bg-foreground border-border-dark' 
                                : 'bg-background border-border-light'
                        }`}>
                            <h2 className={`text-lg sm:text-xl font-bold mb-6 ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                                Monthly Sales
                            </h2>

                            {monthlySales.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className={mode === 'dark' ? 'text-text-secondary' : 'text-text-secondary'}>
                                        No sales data available
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {monthlySales.slice(0, 6).map((item, idx) => {
                                        const percentage = (item.sales / maxSalesValue) * 100;
                                        return (
                                            <div key={idx}>
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className={`text-xs sm:text-sm font-medium ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                                                        {item.month}
                                                    </span>
                                                    <span className={`text-xs sm:text-sm font-semibold ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                                                        ${item.sales?.toFixed(2) || '0.00'}
                                                    </span>
                                                </div>
                                                <div className={`w-full h-2 rounded-full overflow-hidden ${
                                                    mode === 'dark' ? 'bg-black/50' : 'bg-gray-200'
                                                }`}>
                                                    <div
                                                        className="h-full bg-gradient-to-r from-theme-primary to-theme-secondary-purple rounded-full transition-all"
                                                        style={{ width: `${percentage}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Books by Genre */}
                        <div className={`p-6 rounded-lg border ${
                            mode === 'dark' 
                                ? 'bg-foreground border-border-dark' 
                                : 'bg-background border-border-light'
                        }`}>
                            <h2 className={`text-lg sm:text-xl font-bold mb-6 ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                                Ebooks by Genre
                            </h2>

                            {booksByGenre.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className={mode === 'dark' ? 'text-text-secondary' : 'text-text-secondary'}>
                                        No genre data available
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {booksByGenre.slice(0, 6).map((item, idx) => {
                                        const percentage = (item.count / maxGenreValue) * 100;
                                        const colors = [
                                            'from-blue-500 to-blue-600',
                                            'from-green-500 to-green-600',
                                            'from-purple-500 to-purple-600',
                                            'from-pink-500 to-pink-600',
                                            'from-yellow-500 to-yellow-600',
                                            'from-red-500 to-red-600'
                                        ];
                                        return (
                                            <div key={idx}>
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className={`text-xs sm:text-sm font-medium ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                                                        {item.genre}
                                                    </span>
                                                    <span className={`text-xs sm:text-sm font-semibold ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                                                        {item.count} books
                                                    </span>
                                                </div>
                                                <div className={`w-full h-2 rounded-full overflow-hidden ${
                                                    mode === 'dark' ? 'bg-black/50' : 'bg-gray-200'
                                                }`}>
                                                    <div
                                                        className={`h-full bg-gradient-to-r ${colors[idx % colors.length]} rounded-full transition-all`}
                                                        style={{ width: `${percentage}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Summary Section */}
                    <div className={`mt-6 p-6 rounded-lg border ${
                        mode === 'dark' 
                            ? 'bg-foreground border-border-dark' 
                            : 'bg-background border-border-light'
                    }`}>
                        <h2 className={`text-lg sm:text-xl font-bold mb-4 ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                            Summary
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <p className={`text-sm ${mode === 'dark' ? 'text-text-secondary' : 'text-text-secondary'} mb-1`}>
                                    Platform Status
                                </p>
                                <p className={`text-lg font-semibold ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                                    ✓ Active
                                </p>
                            </div>
                            <div>
                                <p className={`text-sm ${mode === 'dark' ? 'text-text-secondary' : 'text-text-secondary'} mb-1`}>
                                    Last Updated
                                </p>
                                <p className={`text-lg font-semibold ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                                    Just now
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
)
}
