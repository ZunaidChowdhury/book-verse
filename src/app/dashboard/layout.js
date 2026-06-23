'use client'

import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { useSelector } from "react-redux";
import { authClient } from "@/lib/auth-client";

const DashboardLayout = ({ children }) => {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const { mode } = useSelector((state) => state.theme);

    return (
        <div className={`flex min-h-screen ${mode === 'dark' ? 'bg-black' : 'bg-white'}`}>
            <DashboardSidebar userRole={user?.role || 'reader'} userName={user?.name} />
            <div className={`flex-1 ${mode === 'dark' ? 'bg-black' : 'bg-white'}`}>{children}</div>
        </div>
    );
};

export default DashboardLayout;