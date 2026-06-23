'use client'

import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { useSelector } from 'react-redux';
import { authClient } from '@/lib/auth-client';

export default function DashboardLayout({ children, userRole = 'reader' }) {
    const { mode } = useSelector((state) => state.theme);
    const { data: session } = authClient.useSession();
    const user = session?.user;

    return (
        <div className={`flex min-h-screen ${mode === 'dark' ? 'bg-black' : 'bg-white'}`}>
            <DashboardSidebar userRole={userRole} userName={user?.name} />
            <main className={`flex-1 ${mode === 'dark' ? 'bg-black' : 'bg-white'} transition-colors`}>
                {children}
            </main>
        </div>
    );
}
