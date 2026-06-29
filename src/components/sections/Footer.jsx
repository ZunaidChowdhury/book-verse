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
                { label: "Home", href: "#" },
                { label: "All Ebooks", href: "#" },
                { label: "About Us", href: "#" },
            ],
        },
        support: {
            title: "Support",
            items: [
                { label: "Help Center", href: "#" },
                { label: "How It Works", href: "#" },
                { label: "FAQs", href: "#" },
                { label: "Refund Policy", href: "#" },
            ],
        },
        legal: {
            title: "Legal",
            items: [
                { label: "Terms & Conditions", href: "#" },
                { label: "Privacy Policy", href: "#" },
            ],
        },
    };

    return (
        <footer className="w-full bg-[#050811] text-white border-t border-white/5">

            {/* ── Top Links Section ─────────────────────────────────────────────── */}
            <div className="mx-auto max-w-[1400px] py-12 tablet:py-16 px-4 tablet:px-6 desktop:px-8">
                <div className="grid grid-cols-2 tablet:grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-10 lg:gap-6">

                    {/* ── COL 1: Branding & Socials ── spans full width on mobile, 2 cols on tablet, 4 on desktop */}
                    <div className="col-span-2 tablet:col-span-2 lg:col-span-4 flex flex-col items-start gap-4">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
                                <Image
                                    src="/book-verse-logo.png"
                                    alt="BookVerse Logo"
                                    width={32}
                                    height={32}
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            <span className="text-xl font-bold tracking-tight">BookVerse</span>
                        </div>

                        {/* Tagline */}
                        <p className="text-sm text-slate-400 font-light leading-relaxed max-w-xs">
                            A global digital library platform built for sharing, reading, publishing,
                            and securely listing independent eBooks.
                        </p>

                        {/* Social icons */}
                        <div className="flex items-center gap-3 mt-1">
                            <a
                                href="https://x.com"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Follow us on X Twitter"
                                className="w-9 h-9 rounded-full bg-white flex items-center justify-center
                                       text-[#050811] hover:bg-slate-200 transition-colors duration-200"
                            >
                                <FaXTwitter className="w-4 h-4" />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Follow us on Instagram"
                                className="w-9 h-9 rounded-full bg-white flex items-center justify-center
                                       text-[#050811] hover:bg-slate-200 transition-colors duration-200"
                            >
                                <FaInstagram className="w-4 h-4" />
                            </a>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Follow us on Facebook"
                                className="w-9 h-9 rounded-full bg-white flex items-center justify-center
                                       text-[#050811] hover:bg-slate-200 transition-colors duration-200"
                            >
                                <FaFacebookF className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    </div>

                    {/* ── COL 2: Contact Info ── full-width on mobile, left-half on tablet, 3 cols on desktop */}
                    <div className="col-span-2 tablet:col-span-1 lg:col-span-3 flex flex-col items-start gap-4">
                        <h4 className="text-sm font-bold text-white tracking-wide">
                            Contact Info
                        </h4>
                        <div className="flex flex-col gap-3.5 text-sm text-slate-400 font-light mt-1 w-full">
                            <a
                                href="mailto:support@bookverse.com"
                                className="flex items-center gap-3 hover:text-white transition-colors duration-200 min-w-0"
                            >
                                <FiMail className="w-4 h-4 text-slate-400 shrink-0" />
                                <span className="truncate">support@bookverse.com</span>
                            </a>
                            <a
                                href="tel:+8801234567890"
                                className="flex items-center gap-3 hover:text-white transition-colors duration-200"
                            >
                                <FiPhone className="w-4 h-4 text-slate-400 shrink-0" />
                                <span>+880 1234-567890</span>
                            </a>
                            <div className="flex items-start gap-3">
                                <FiMapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                                <span className="leading-tight">45 Library Lane, Shahbagh, Dhaka</span>
                            </div>
                        </div>
                    </div>

                    {/* ── COL 3: Quick Links ── left half on mobile, right-half on tablet, 2 cols on desktop */}
                    <div className="col-span-1 tablet:col-span-1 lg:col-span-2 flex flex-col items-start gap-4">
                        <h4 className="text-sm font-bold text-white tracking-wide">
                            {footerLinks.quickLinks.title}
                        </h4>
                        <nav
                            aria-label="Quick Links Navigation"
                            className="flex flex-col gap-3 text-sm text-slate-400 font-light mt-1"
                        >
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

                    {/* ── COL 4: Support ── right half on mobile, left-half on next tablet row, 2 cols on desktop */}
                    <div className="col-span-1 tablet:col-span-1 lg:col-span-2 flex flex-col items-start gap-4">
                        <h4 className="text-sm font-bold text-white tracking-wide">
                            {footerLinks.support.title}
                        </h4>
                        <nav
                            aria-label="Support Navigation"
                            className="flex flex-col gap-3 text-sm text-slate-400 font-light mt-1"
                        >
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

                    {/* ── COL 5: Legal ── spans right half on mobile, right-half on tablet, 1 col on desktop */}
                    <div className="col-span-1 tablet:col-span-1 lg:col-span-1 flex flex-col items-start gap-4">
                        <h4 className="text-sm font-bold text-white tracking-wide">
                            {footerLinks.legal.title}
                        </h4>
                        <nav
                            aria-label="Legal Navigation"
                            className="flex flex-col gap-3 text-sm text-slate-400 font-light mt-1"
                        >
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

            {/* ── Bottom Copyright Bar ──────────────────────────────────────────── */}
            <div className="w-full bg-[#03050a] border-t border-white/[0.03] py-4 px-4">
                <p className="text-sm text-slate-500 font-light tracking-wide text-center">
                    © {currentYear} BookVerse. All rights reserved.
                </p>
            </div>

        </footer>
    );
}