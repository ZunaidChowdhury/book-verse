"use client";

import React from "react";
import Link from "next/link";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaXTwitter, FaInstagram, FaFacebookF } from "react-icons/fa6";
import Image from "next/image";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        quickLinks: {
            title: "Quick Links",
            items: [
                { label: "Home", href: "/" },
                { label: "All Ebooks", href: "/browse" },
                { label: "About Us", href: "/about" },
            ],
        },
        support: {
            title: "Support",
            items: [
                { label: "Help Center", href: "/help" },
                { label: "How It Works", href: "/how-it-works" },
                { label: "FAQs", href: "/faqs" },
                { label: "Refund Policy", href: "/refund-policy" },
            ],
        },
        legal: {
            title: "Legal",
            items: [
                { label: "Terms & Conditions", href: "/terms" },
                { label: "Privacy Policy", href: "/privacy" },
            ],
        },
    };

    return (
        <footer className="w-full bg-[#050811] text-white border-t border-white/5">
            {/* Top Links Section */}
            <div className="mx-auto max-w-[1400px] py-12 tablet:py-16 px-4 tablet:px-6 desktop:px-8">
                {/* 
                  - Mobile: 1 Column grid (stacked)
                  - Tablet: 2 Column grid 
                  - Desktop: Clean 12-Column grid system
                */}
                <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-12 gap-y-10 gap-x-6 tablet:gap-x-8">

                    {/* COLUMN 1: BRANDING & SOCIAL MEDIA MATRIX */}
                    <div className="tablet:col-span-2 desktop:col-span-4 flex flex-col items-start gap-4">
                        <div className="flex items-center gap-3">
                            <div className="relative w-8 h-8 flex items-center justify-center">
                                <Image
                                    src="/book-verse-logo.png"
                                    alt="BookVerse Logo"
                                    width={32}
                                    height={32}
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            <span className="text-xl font-bold tracking-tight">
                                BookVerse
                            </span>
                        </div>

                        <p className="text-sm text-slate-400 font-light leading-relaxed max-w-sm desktop:max-w-xs">
                            A global digital library platform built for sharing, reading, publishing, and securely listing independent eBooks.
                        </p>

                        <div className="flex items-center gap-3 mt-2">
                            <a
                                href="https://x.com"
                                target="_blank"
                                rel="noreferrer"
                                className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#050811] hover:bg-slate-200 transition-colors duration-200"
                                aria-label="Follow us on X Twitter"
                            >
                                <FaXTwitter className="w-4 h-4" />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noreferrer"
                                className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#050811] hover:bg-slate-200 transition-colors duration-200"
                                aria-label="Follow us on Instagram"
                            >
                                <FaInstagram className="w-4 h-4" />
                            </a>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noreferrer"
                                className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#050811] hover:bg-slate-200 transition-colors duration-200"
                                aria-label="Follow us on Facebook"
                            >
                                <FaFacebookF className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    </div>

                    {/* COLUMN 2: CONTACT INFORMATION */}
                    <div className="tablet:col-span-1 desktop:col-span-3 flex flex-col items-start gap-4">
                        <h4 className="text-sm font-bold text-white tracking-wide">
                            Contact Info
                        </h4>
                        <div className="flex flex-col gap-3.5 text-sm text-slate-400 font-light mt-1 w-full">
                            <a
                                href="mailto:support@bookverse.com"
                                className="flex items-center gap-3 hover:text-white transition-colors duration-200 w-full min-w-0"
                            >
                                <FiMail className="w-4 h-4 text-slate-400 shrink-0" />
                                <span className="truncate">support@bookverse.com</span>
                            </a>
                            <a
                                href="tel:+8801234567890"
                                className="flex items-center gap-3 hover:text-white transition-colors duration-200 w-full min-w-0"
                            >
                                <FiPhone className="w-4 h-4 text-slate-400 shrink-0" />
                                <span className="truncate">+880 1234-567890</span>
                            </a>
                            <div className="flex items-start gap-3 w-full min-w-0">
                                <FiMapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                                <span className="leading-tight text-slate-400 font-light">45 Library Lane, Shahbagh, Dhaka</span>
                            </div>
                        </div>
                    </div>

                    {/* COLUMN 3: QUICK LINKS */}
                    <div className="tablet:col-span-1 desktop:col-span-2 flex flex-col items-start gap-4">
                        <h4 className="text-sm font-bold text-white tracking-wide">
                            {footerLinks.quickLinks.title}
                        </h4>
                        <nav className="flex flex-col gap-3 text-sm text-slate-400 font-light mt-1" aria-label="Quick Links Navigation">
                            {footerLinks.quickLinks.items.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="hover:text-white transition-colors duration-200"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* COLUMN 4: PLATFORM SUPPORT */}
                    <div className="tablet:col-span-1 desktop:col-span-2 flex flex-col items-start gap-4">
                        <h4 className="text-sm font-bold text-white tracking-wide">
                            {footerLinks.support.title}
                        </h4>
                        <nav className="flex flex-col gap-3 text-sm text-slate-400 font-light mt-1" aria-label="Support Navigation">
                            {footerLinks.support.items.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="hover:text-white transition-colors duration-200"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* COLUMN 5: LEGAL COMPLIANCE */}
                    <div className="tablet:col-span-1 desktop:col-span-1 flex flex-col items-start gap-4 min-w-[120px]">
                        <h4 className="text-sm font-bold text-white tracking-wide">
                            {footerLinks.legal.title}
                        </h4>
                        <nav className="flex flex-col gap-3 text-sm text-slate-400 font-light mt-1" aria-label="Legal Navigation">
                            {footerLinks.legal.items.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="hover:text-white transition-colors duration-200"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                </div>
            </div>

            {/* Bottom Copyright Sub-bar */}
            <div className="w-full bg-[#03050a] border-t border-white/[0.03] py-5 px-4">
                <div className="mx-auto max-w-[1400px] flex flex-col tablet:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-light">
                    <p>© {new Date().getFullYear()} BookVerse. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>

    );
}
