'use client'

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Home,
    ShoppingBag,
    User,
    Bookmark,
    TrendingUp,
    Plus,
    Edit,
    Users,
    BookOpen,
    DollarSign,
    Menu,
    X
} from 'lucide-react';

import { authClient } from "@/lib/auth-client";

export function DashboardSidebar({ userRole, userName }) {
      // Get session from better-auth
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
   
    const { mode } = useSelector((state) => state.theme);
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const readerNavLinks = [
        { icon: Home, href: "/dashboard/reader", label: "Dashboard" },
        { icon: ShoppingBag, href: "/dashboard/reader/purchase-history", label: "Purchase History" },
        { icon: BookOpen, href: "/dashboard/reader/purchased-books", label: "Purchased Ebooks" },
        { icon: User, href: "/dashboard/reader/profile-management", label: "Profile Management" },
        { icon: Bookmark, href: "/dashboard/reader/wishlist", label: "Wishlist" },
    ];

    const writerNavLinks = [
        { icon: Home, href: "/dashboard/writer", label: "Dashboard" },
        { icon: BookOpen, href: "/dashboard/writer/manage-books", label: "Manage Ebooks" },
        { icon: Plus, href: "/dashboard/writer/add-book", label: "Add Ebook" },
        { icon: Bookmark, href: "/dashboard/writer/bookmarks", label: "Bookmark" },
        { icon: TrendingUp, href: "/dashboard/writer/sales-history", label: "Sales History" },
    ];

    const adminNavLinks = [
        { icon: Home, href: "/dashboard/admin", label: "Dashboard" },
        { icon: Users, href: "/dashboard/admin/manage-users", label: "Manage Users" },
        { icon: BookOpen, href: "/dashboard/admin/manage-books", label: "Manage Ebooks" },
        { icon: DollarSign, href: "/dashboard/admin/monitor-transactions", label: "View Transactions" },
    ];

    const navLinksMap = {
        reader: readerNavLinks,
        writer: writerNavLinks,
        admin: adminNavLinks
    };

    const navItems = navLinksMap[user?.role || 'reader'];

    const isActive = (href) => pathname === href;

    const navContent = (
        <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                    <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium ${
                            active
                                ? mode === 'dark'
                                    ? 'bg-theme-primary text-white'
                                    : 'bg-theme-primary text-white'
                                : mode === 'dark'
                                    ? 'text-text-primary hover:bg-foreground hover:text-theme-primary'
                                    : 'text-text-primary hover:bg-background hover:text-theme-primary'
                        }`}
                    >
                        <Icon size={20} className="flex-shrink-0" />
                        <span className="truncate">{item.label}</span>
                    </Link>
                );
            })}
        </nav>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside
                className={`hidden lg:flex flex-col w-64 shrink-0 border-r transition-all duration-200 p-6 ${
                    mode === 'dark'
                        ? 'bg-black border-border-dark'
                        : 'bg-white border-border-light'
                }`}
            >
                <div className="mb-8">
                    <h2 className={`text-lg font-bold ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                        Dashboard
                    </h2>
                </div>
                {navContent}
            </aside>

            {/* Mobile Header with Menu Button */}
            <div
                className={`lg:hidden sticky top-0 z-40 flex items-center justify-between p-4 border-b ${
                    mode === 'dark'
                        ? 'bg-black border-border-dark'
                        : 'bg-white border-border-light'
                }`}
            >
                <h1 className={`text-lg font-bold ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                    Book Verse
                </h1>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className={`p-2 rounded-lg transition-colors ${
                        mode === 'dark'
                            ? 'hover:bg-foreground text-text-primary'
                            : 'hover:bg-background text-text-primary'
                    }`}
                >
                    {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Sidebar Drawer */}
            {sidebarOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-30 lg:hidden bg-black/50 transition-opacity"
                        onClick={() => setSidebarOpen(false)}
                    />

                    {/* Mobile Sidebar */}
                    <aside
                        className={`fixed inset-y-0 left-0 z-40 w-64 overflow-y-auto transition-all duration-200 p-6 border-r lg:hidden ${
                            mode === 'dark'
                                ? 'bg-black border-border-dark'
                                : 'bg-white border-border-light'
                        }`}
                    >
                        <div className="mb-8">
                            <h2 className={`text-lg font-bold ${mode === 'dark' ? 'text-text-primary' : 'text-text-primary'}`}>
                                Navigation
                            </h2>
                        </div>
                        {navContent}
                    </aside>
                </>
            )}
        </>
    );
}