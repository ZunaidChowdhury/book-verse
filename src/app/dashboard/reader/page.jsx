'use client'

import { useSelector } from 'react-redux';
import { ShoppingBag, BookOpen, Bookmark, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';

export default function ReaderDashboardPage() {
    const { isDark } = useSelector((state) => state.theme);
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const quickActions = [
        {
            icon: ShoppingBag,
            label: 'Purchase History',
            href: '/dashboard/reader/purchase-history',
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-100/20 text-blue-600'
        },
        {
            icon: BookOpen,
            label: 'My Library',
            href: '/dashboard/reader/purchased-books',
            color: 'from-green-500 to-green-600',
            bgColor: 'bg-green-100/20 text-green-600'
        },
        {
            icon: Bookmark,
            label: 'Wishlist',
            href: '/dashboard/reader/wishlist',
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-100/20 text-purple-600'
        },
        {
            icon: TrendingUp,
            label: 'Profile',
            href: '/dashboard/reader/profile-management',
            color: 'from-orange-500 to-orange-600',
            bgColor: 'bg-orange-100/20 text-orange-600'
        }
    ];

    return (
        <div className={`bg-background`}>
            <div className="p-4 sm:p-6 lg:p-8">
                    {/* Welcome Section */}
                    <div className="mb-12">
                        <h1 className={`text-4xl sm:text-5xl font-bold mb-3 text-text-primary`}>
                            <span className='text-base '>Welcome back, </span> <br />
                            <span className="text-theme-primary">{user?.name || 'Reader'}</span>
                        </h1>
                        <p className={`text-lg ${isDark ? 'text-text-secondary' : 'text-text-secondary'}`}>
                            Explore your library and discover new ebooks
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
                                            : 'bg-background border border-border-light hover:border-theme-primary'
                                    }`}
                                >
                                    {/* Background gradient effect */}
                                    {/* <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div> */}
                                    
                                    {/* Content */}
                                    <div className="relative z-10">
                                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${action.bgColor}`}>
                                            <Icon size={28} />
                                        </div>
                                        <h3 className={`text-lg font-semibold ${isDark ? 'text-text-primary' : 'text-text-primary'}`}>
                                            {action.label}
                                        </h3>
                                        <p className={`text-sm mt-2 ${isDark ? 'text-text-secondary' : 'text-text-secondary'}`}>
                                            View and manage your {action.label.toLowerCase()}
                                        </p>
                                    </div>

                                    {/* Arrow indicator */}
                                    <div className={`absolute bottom-4 right-4 text-text-secondary transition-transform group-hover:translate-x-1 `}>
                                        →
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Info Cards Section */}
                    <div className="mt-12">
                        <h2 className={`text-2xl font-bold mb-6 text-text-primary`}>
                            Quick Stats
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className={`p-6 rounded-lg border ${
                                isDark
                                    ? 'bg-foreground border-border-dark'
                                    : 'bg-background border-border-light'
                            }`}>
                                <p className={`text-sm font-medium text-text-primary mb-2`}>
                                    Books Purchased
                                </p>
                                <p className={`text-3xl font-bold text-text-primary`}>
                                    0
                                </p>
                            </div>
                            <div className={`p-6 rounded-lg border ${
                               isDark
                                    ? 'bg-foreground border-border-dark'
                                    : 'bg-background border-border-light'
                            }`}>
                                <p className={`text-sm font-medium text-text-primary mb-2`}>
                                    Wishlist Items
                                </p>
                                <p className={`text-3xl font-bold text-text-primary`}>
                                    0
                                </p>
                            </div>
                            <div className={`p-6 rounded-lg border ${
                                isDark
                                    ? 'bg-foreground border-border-dark'
                                    : 'bg-background border-border-light'
                            }`}>
                                <p className={`text-sm font-medium text-text-primary mb-2`}>
                                    Total Spent
                                </p>
                                <p className={`text-3xl font-bold text-text-primary`}>
                                    $0.00
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}
