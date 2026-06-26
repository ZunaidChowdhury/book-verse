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

// 

export function DashboardSidebarContent({usingNavSidebar=false}) {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { isDark } = useSelector((state) => state.theme);
    const pathname = usePathname();

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
                        onClick={() => {!usingNavSidebar && setSidebarOpen(false)}}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium ${active
                            ? isDark
                                ? 'bg-theme-primary text-white'
                                : 'bg-theme-primary text-white'
                            : isDark
                                ? 'text-text-primary hover:bg-theme-primary/30 hover:text-white'
                                : 'text-text-primary hover:bg-theme-primary hover:text-white'
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

                <div className="mb-8">
                    <h2 className={`text-lg font-bold ${isDark ? 'text-text-primary' : 'text-text-primary'}`}>
                        Dashboard
                    </h2>
                </div>
                {navContent}
        </>
    );
}