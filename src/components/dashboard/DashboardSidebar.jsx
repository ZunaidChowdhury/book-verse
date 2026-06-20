import { getUser } from "@/lib/core/session";
import { LayoutSideContentLeft, Bell, Briefcase, Envelope, Gear, House, Magnifier, Person, Bookmark, FileText, CreditCard } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { Building, Users } from "lucide-react";
import Link from "next/link";

export async function DashboardSidebar() {

    const user = await getUser();

    const writerNavLinks = [
        { icon: House, href: "/dashboard/writer", label: "Home" },
        { icon: Envelope, href: "/messages", label: "Messages" },
        { icon: Person, href: "/profile", label: "Profile" },
        { icon: Gear, href: "/settings", label: "Settings" },
    ]

    const readerNavLinks = [
        { icon: House, href: "/dashboard/reader", label: "Dashboard" },
        { icon: Bookmark, href: "/dashboard/reader/saved-jobs", label: "Saved Jobs" },
        { icon: CreditCard, href: "/dashboard/reader/billing", label: "Billing" },
        { icon: Gear, href: "/settings", label: "Settings" },
    ];

    const adminNavLinks = [
        { icon: House, href: "/dashboard/admin", label: "Dashboard" },
        { icon: Users, href: "/dashboard/admin/users", label: "Users" },
        { icon: Building, href: "/dashboard/admin/companies", label: "Books" },
        { icon: CreditCard, href: "/dashboard/admin/payments", label: "Payments" },
        { icon: Gear, href: "/dashboard/admin/settings", label: "Settings" },
    ];

    const navLinksMap = {
        reader: readerNavLinks,
        writer: writerNavLinks,
        admin: adminNavLinks
    }

    const navItems = navLinksMap[user?.role || 'reader'];


    const navContent = <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
            <Link
                key={item.label}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                href={item.href}
            >
                <item.icon className="size-5 text-muted" />
                {item.label}
            </Link>
        ))}
    </nav>

    return (
        <>
            <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
                {navContent}
            </aside>
            <Drawer>
                <Button className="lg:hidden" variant="secondary">
                    <LayoutSideContentLeft />
                    Sidebar
                </Button>
                <Drawer.Backdrop>
                    <Drawer.Content placement="left">
                        <Drawer.Dialog>
                            <Drawer.CloseTrigger />
                            <Drawer.Header>
                                <Drawer.Heading>Navigation</Drawer.Heading>
                            </Drawer.Header>
                            <Drawer.Body>
                                {navContent}
                            </Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>
        </>
    );
}