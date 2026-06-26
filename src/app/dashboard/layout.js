'use client'


import { useSelector } from "react-redux";
import { authClient } from "@/lib/auth-client";
import { DashboardSidebarContent } from "@/components/dashboard/DashboardSidebarContent";

const DashboardLayout = ({ children }) => {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const { isDark } = useSelector((state) => state.theme);

    return (
        <div className={`flex min-h-screen bg-background`}>
            {/* Desktop Sidebar */}
            <aside
                className={`hidden xl:flex flex-col w-64 shrink-0 border-r transition-all duration-200 p-6 ${isDark
                    ? 'bg-foreground border-border-dark'
                    : 'bg-white border-border-light'
                    }`}
            >
                <DashboardSidebarContent />
            </aside>
            <div className={`flex-1 bg-background`}>{children}</div>
        </div>
    );
};

export default DashboardLayout;