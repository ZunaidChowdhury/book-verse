'use client'

import { formatDate } from "@/lib/utils";
import Image from "next/image";
import {
    FiMail,
    FiShield,
    FiBookOpen,
    FiEdit3,
    FiCalendar,
    FiMapPin,
    FiAward,
    FiSettings,
    FiLogOut
} from "react-icons/fi";
import { useSelector } from "react-redux";




const UserProfileCard = ({user}) => {

    const { isDark } = useSelector((state) => state.theme);

    // Fake static data structured for BookVerse ecosystem
    const fakeUser = {
        fullName: "Eleanor Vance",
        email: "eleanor.vance@bookverse.com",
        role: "writer", // Options: reader | writer | admin
        joinDate: "Joined October 2024",
        location: "Edinburgh, UK",
        bio: "Historical fiction enthusiast, tea drinker, and author of 'The Whispering Shadows'. Always looking for beta readers and literary discussions.",
        stats: [
            { label: "Books read", count: "142" },
            { label: "Reviews", count: "48" },
            { label: "Followers", count: "1.2k" },
        ],
        badges: ["Top Reviewer", "NaNoWriMo 2025", "Verified Author"]
    };

    // Dynamic configuration based on role definition
    const roleConfig = {
        reader: {
            label: "Reader",
            bg: "bg-blue-500",
            text: "text-text-primary",
            border: "border-blue-500",
            icon: FiBookOpen,
        },
        writer: {
            label: "Writer",
            bg: "bg-amber-500",
            text: "text-text-primary",
            border: "border-amber-500",
            icon: FiEdit3,
        },
        admin: {
            label: "Admin",
            bg: "bg-green-500",
            text: "text-text-primary",
            border: "border-green-500",
            icon: FiShield,
        },
    };

    const currentRole = roleConfig[user.role] || roleConfig.reader;
    const RoleIcon = currentRole.icon;


    return (
        <section className="flex flex-col items-center justify-center min-h-screen py-10 px-4 sm:px-6 lg:px-8">

        
        <div className={`w-full max-w-[440px] rounded-2xl border px-6 py-8 shadow-xl transition-all duration-300 ${isDark
            ? 'bg-gradient-to-b from-[#111836] to-[#0b0f24] border-white/5 border-white/5'
            : 'bg-white border-black/5'
            }`}>

            {/* Settings / Actions Anchor Row */}
            <div className="flex items-center justify-between mb-6">
                <span className={`text-xs font-semibold uppercase tracking-widest text-text-primary/40`}>
                    User Profile
                </span>
                <button
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-text-primary/10 bg-text-primary/5 text-text-primary/70 transition-all hover:bg-text-primary/10 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-[var(--theme-primary)] cursor-pointer"
                    aria-label="Profile Settings"
                >
                    <FiSettings size={16} />
                </button>
            </div>

            {/* Main Identity Vertical Stack */}
            <div className="flex flex-col items-center text-center border-b border-text-primary/5 pb-6">
                {/* Avatar Ring Structure */}
                <div className="relative mb-4 p-1 rounded-full border border-text-primary/10 bg-text-primary/5 shadow-inner">
                    <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-[var(--theme-primary)]">
                        <Image
                            src={user?.image || '/default-avatar.png'} // Substitute with profile mockup asset image path
                            alt={`${user?.fullName} Profile Avatar`}
                            fill
                            priority
                            className="object-cover"
                            sizes="96px"
                        />
                    </div>
                    {/* Floating Role Indicator Dot Hook */}
                    <div className={`absolute bottom-1 right-1 flex h-6 w-6 items-center justify-center rounded-full border border-text-primary/10 shadow ${currentRole.bg} ${currentRole.text}`}>
                        <RoleIcon size={12} />
                    </div>
                </div>

                {/* Identity Texts */}
                <h2 className="text-xl font-bold tracking-tight text-text-primary">
                    {user?.name}
                </h2>

                <div className="flex items-center gap-1.5 mt-1 text-sm text-text-primary/70">
                    <FiMail className="text-text-primary/40 shrink-0" size={14} />
                    <span className="truncate max-w-[240px]">{user?.email}</span>
                </div>

                {/* Dynamic Role Badge */}
                <div className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold tracking-wide ${currentRole.bg} ${currentRole.text} ${currentRole.border}`}>
                    <RoleIcon size={12} />
                    {user?.role === 'admin' ? 'Admin' : 'Reader'}
                </div>
            </div>

            {/* Meta Location / Date Info Grid */}
            <div className="grid grid-cols-2 gap-3 py-4 border-b border-text-primary/5 text-xs text-text-primary/60">
                <div className="flex items-center gap-2">
                    <FiMapPin className="text-text-primary/40 shrink-0" size={14} />
                    <span>NYC, USA</span>
                </div>
                <div className="flex items-center gap-2 justify-end">
                    <FiCalendar className="text-text-primary/40 shrink-0" size={14} />
                    <span>{formatDate(user?.createdAt)}</span>
                </div>
            </div>

            {/* Narrative Bio Block */}
            <div className="py-5 border-b border-text-primary/5">
                <p className="text-sm leading-relaxed text-text-primary/70 text-left">
                    {fakeUser?.bio}
                </p>
            </div>

            {/* Metric Counters Segment */}
            <div className="grid grid-cols-3 gap-2 py-5 text-center bg-text-primary/[0.02] rounded-xl border border-text-primary/5 my-5">
                {fakeUser?.stats.map((stat, idx) => (
                    <div key={idx} className={`${idx !== fakeUser?.stats.length - 1 ? 'border-r border-text-primary/5' : ''}`}>
                        <div className="text-lg font-bold tracking-tight text-text-primary">
                            {stat.count}
                        </div>
                        <div className="text-[10px] uppercase tracking-wider font-semibold text-text-primary/40 mt-0.5">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* Gamified Badges Flow */}
            <div className="flex flex-wrap gap-2 mb-6">
                {fakeUser.badges.map((badge, idx) => (
                    <div
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-text-primary/5 bg-text-primary/5 text-[11px] font-medium text-text-primary/80"
                    >
                        <FiAward className="text-[var(--theme-primary)]" size={12} />
                        <span>{badge}</span>
                    </div>
                ))}
            </div>

            {/* Primary Context Card Utilities */}
            <div className="flex items-center gap-3">
                <button
                    className="flex-1 h-10 flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--theme-secondary-purple)] to-[var(--theme-primary)] hover:opacity-90 text-white font-bold text-xs tracking-wide uppercase shadow-lg shadow-[var(--theme-primary)]/20 transition-all duration-300 cursor-pointer rounded-lg focus-visible:outline-2 focus-visible:outline-[var(--theme-primary)]"
                >
                    View Book Shelf
                </button>
                <button
                    className="h-10 px-4 flex items-center justify-center gap-2 border border-rose-500/20 bg-rose-500/5 text-rose-400 hover:bg-rose-500/10 font-bold text-xs tracking-wide uppercase rounded-lg transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-rose-500"
                    aria-label="Log out account"
                >
                    <FiLogOut size={14} />
                </button>
            </div>

        </div>

        </section>
    )
}

export default UserProfileCard