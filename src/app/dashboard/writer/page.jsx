'use client'

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BookOpen, Plus, TrendingUp, BookMarked } from 'lucide-react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { getWriterDashboard } from '@/lib/api/writers';

export default function WriterDashboardPage() {
    const { isDark } = useSelector((state) => state.theme);
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [stats, setStats] = useState({
        totalBooks: 0,
        publishedBooks: 0,
        totalSales: 0,
        totalRevenue: '0.00',
        avgPrice: '0.00',
    });
    const [loadingStats, setLoadingStats] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoadingStats(true);
                const data = await getWriterDashboard();
                if (data) {
                    setStats({
                        totalBooks: data.totalBooks || 0,
                        publishedBooks: data.publishedBooks || 0,
                        totalSales: data.totalSales || 0,
                        totalRevenue: data.totalRevenue || '0.00',
                        avgPrice: data.avgPrice || '0.00',
                    });
                }
            } catch (err) {
                console.error('Failed to load writer dashboard stats:', err);
            } finally {
                setLoadingStats(false);
            }
        };
        fetchStats();
    }, []);

    const quickActions = [
        {
            icon: Plus,
            label: 'Add New Ebook',
            href: '/dashboard/writer/add-book',
            color: 'from-green-500 to-green-600',
            bgColor: 'bg-green-100/20 text-green-600'
        },
        {
            icon: BookOpen,
            label: 'Manage Ebooks',
            href: '/dashboard/writer/manage-books',
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-100/20 text-blue-600'
        },
        {
            icon: TrendingUp,
            label: 'Sales History',
            href: '/dashboard/writer/sales-history',
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-100/20 text-purple-600'
        },
        {
            icon: BookMarked,
            label: 'Bookmarks',
            href: '/dashboard/writer/bookmarks',
            color: 'from-orange-500 to-orange-600',
            bgColor: 'bg-orange-100/20 text-orange-600'
        }
    ];

    return (
        <div className={`min-h-screen bg-background transition-colors`}>
            <div className="p-4 sm:p-6 lg:p-8">
                    {/* Welcome Section */}
                    <div className="mb-12">
                        <h1 className={`text-4xl sm:text-5xl font-bold mb-3 text-text-primary`}>
                            <span className='text-xl mb-3'>Welcome back,</span> <br />
                            <span>{user?.name || 'Writer'}</span>
                        </h1>
                        <p className={`text-lg text-text-secondary`}>
                            Manage your ebooks and track your sales
                        </p>
                    </div>

                    {/* Quick Actions Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {quickActions.map((action) => {
                            const Icon = action.icon;
                            return (
                                <Link
                                    key={action.label}
                                    href={action.href}
                                    className={`group relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:scale-105 ${
                                        isDark
                                            ? 'bg-foreground border border-border-dark hover:border-theme-primary'
                                            : 'bg-foreground border border-border-light hover:border-theme-primary'
                                    }`}
                                >
                                    {/* Background gradient effect */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                                    
                                    {/* Content */}
                                    <div className="relative z-10">
                                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${action.bgColor}`}>
                                            <Icon size={28} />
                                        </div>
                                        <h3 className={`text-lg font-semibold text-text-primary`}>
                                            {action.label}
                                        </h3>
                                        <p className={`text-sm mt-2 text-text-secondary`}>
                                            Manage your {action.label.toLowerCase()}
                                        </p>
                                    </div>

                                    {/* Arrow indicator */}
                                    <div className={`absolute bottom-4 right-4 transition-transform group-hover:translate-x-1 text-text-secondary`}>
                                        →
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Info Cards Section */}
                    <div className="mt-12">
                        <h2 className={`text-2xl font-bold mb-6 text-text-primary`}>
                            Publishing Stats
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className={`p-6 rounded-lg border ${
                                isDark
                                    ? 'bg-foreground border-border-dark'
                                    : 'bg-foreground border-border-light'
                            }`}>
                                <p className={`text-sm font-medium text-text-secondary mb-2`}>
                                    Published Ebooks
                                </p>
                                <p className={`text-3xl font-bold text-text-primary`}>
                                    {loadingStats ? '...' : stats.publishedBooks}
                                </p>
                            </div>
                            <div className={`p-6 rounded-lg border ${
                                isDark
                                    ? 'bg-foreground border-border-dark'
                                    : 'bg-foreground border-border-light'
                            }`}>
                                <p className={`text-sm font-medium text-text-secondary mb-2`}>
                                    Total Sales
                                </p>
                                <p className={`text-3xl font-bold text-text-primary`}>
                                    {loadingStats ? '...' : stats.totalSales}
                                </p>
                            </div>
                            <div className={`p-6 rounded-lg border ${
                                isDark
                                    ? 'bg-foreground border-border-dark'
                                    : 'bg-foreground border-border-light'
                            }`}>
                                <p className={`text-sm font-medium text-text-secondary mb-2`}>
                                    Total Revenue
                                </p>
                                <p className={`text-3xl font-bold text-text-primary`}>
                                    {loadingStats ? '...' : `$${stats.totalRevenue}`}
                                </p>
                            </div>
                            <div className={`p-6 rounded-lg border ${
                                isDark
                                    ? 'bg-foreground border-border-dark'
                                    : 'bg-foreground border-border-light'
                            }`}>
                                <p className={`text-sm font-medium text-text-secondary mb-2`}>
                                    Avg Price
                                </p>
                                <p className={`text-3xl font-bold text-text-primary`}>
                                    {loadingStats ? '...' : `$${stats.avgPrice}`}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="mt-12">
                        <h2 className={`text-2xl font-bold mb-6 text-text-primary`}>
                            Quick Tips
                        </h2>
                        <div className={`p-6 rounded-lg border ${
                            isDark
                                ? 'bg-foreground border-border-dark'
                                : 'bg-foreground border-border-light'
                        }`}>
                            <ul className={`space-y-3 text-text-secondary`}>
                                <li className="flex items-start gap-3">
                                    <span className="text-theme-primary mt-1">✓</span>
                                    <span>Write engaging book descriptions to attract more readers</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-theme-primary mt-1">✓</span>
                                    <span>Use high-quality cover images for better visibility</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-theme-primary mt-1">✓</span>
                                    <span>Keep track of your sales trends and adjust pricing accordingly</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-theme-primary mt-1">✓</span>
                                    <span>Check your bookmarks to save inspiring works for reference</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>            
        </div>
    );
}
