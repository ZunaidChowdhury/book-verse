"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Button, Avatar, Tooltip } from "@heroui/react";
import { Gear, ArrowRightFromSquare, Sun, Moon } from "@gravity-ui/icons";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "@/redux/slices/themeSlice";
import { DashboardSidebarContent } from "../dashboard/DashboardSidebarContent";
import { BookOpen, Home } from "lucide-react";
import { CgProfile } from "react-icons/cg";
import { toast } from "react-toastify";

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname();
  const { isDark } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  // Get session from better-auth
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;



  // State Management
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);


  // Refs for click-outside detection
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);




  // Navigation Links config
  const navLinks = [
    { icon: Home, name: "Home", href: "/" },
    { icon: BookOpen, name: "Browse Ebooks", href: "/books" },
    // { icon: Home, name: "Dashboard", href: "/dashboard" },
  ];

  const dashboardLinks = {
    admin: '/dashboard/admin',
    writer: '/dashboard/writer',
    reader: '/dashboard/reader',
  }

  if (user?.email) {
    navLinks.push(
      {
        icon: Home,
        name: 'Dashboard',
        href: dashboardLinks[user?.role || 'reader']
      }
    )
  }






  const handleLogOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/log-in");
          toast.success("Logged out successfully.");
        },
      },
    });
  }


  // Outside click and Escape key listeners
  useEffect(() => {
    const handleOutsideInteraction = (event) => {
      // Close dropdown if clicked outside
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
      // Close mobile menu if clicked outside
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest("#hamburger-trigger")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsUserDropdownOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideInteraction);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutsideInteraction);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className={`sticky top-0 z-50 w-full border-b  ${isDark ? 'bg-theme-background/8 border-white/5' : 'bg-foreground border-black/5'}  backdrop-blur-xl transition-all duration-300`}>
        <div className="mx-auto max-w-[1400px] px-4 tablet:px-6 desktop:px-8">
          <div className="flex h-20 items-center justify-between gap-4">

            {/* Left Section: Logo & Brand + Mobile Menu Button */}
            <div className="flex items-center gap-4">
              {/* Hamburger Button (Mobile/Tablet Only) */}
              <button
                id="hamburger-trigger"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="group flex h-10 w-10 flex-col items-center justify-center rounded-md border border-text-primary/5 bg-text-primary/5 text-text-primary/70 transition-all duration hover:bg-text-primary/10 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-[var(--theme-primary)] xl:hidden"
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle Navigation Menu"
              >
                <div className="relative w-5 h-3">
                  <span className={`absolute left-0 h-[2px] w-5 bg-text-primary rounded-md transition-all duration-300 ${isMobileMenuOpen ? "top-[5px] rotate-45" : "top-0"}`} />
                  <span className={`absolute left-0 h-[2px] w-5 bg-text-primary rounded-md transition-all duration-300 top-[5px] ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`} />
                  <span className={`absolute left-0 h-[2px] w-5 bg-text-primary rounded-md transition-all duration-300 ${isMobileMenuOpen ? "top-[5px] -rotate-45" : "top-[10px]"}`} />
                </div>
              </button>

              {/* Logo Identity */}
              <Link
                href="/"
                className="flex items-center gap-3 transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-[var(--theme-primary)]"
                aria-label="BookVerse Home"
              >
                {/* <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-[var(--theme-primary)] to-[var(--theme-secondary-purple)] shadow-md shadow-[var(--theme-primary)]/20">
                  <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div> */}

                <div className="relative flex h-10 w-10 items-center justify-center ">
                  <Image
                    src="/book-verse-logo.png" // Path to your logo asset in the public/ folder
                    alt="BookVerse Logo"
                    width={40}
                    height={40}
                    priority // Ensures high LCP performance for above-the-fold brand images
                    className="object-cover"
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>
                <span className="bg-gradient-to-r from-text-primary via-text-primary/90 to-text-primary/70 bg-clip-text text-xl font-bold tracking-tight text-transparent">
                  BookVerse
                </span>
              </Link>
            </div>

            {/* Center Section: Desktop Navigation Links */}
            <nav className="hidden items-center gap-1 desktop:flex" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-base font-medium tracking-wide transition-colors duration-200 rounded-md focus-visible:outline-2 focus-visible:outline-[var(--theme-primary)] ${isActive ? "text-[var(--theme-primary)] font-semibold" : "text-text-primary hover:text-theme-primary"
                      }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="desktopActiveIndicator"
                        className="absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-secondary-purple)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Section: Utilities & Authentication */}
            <div className="flex items-center gap-3">
              {/* Theme Switcher */}
              <div className='hidden tablet:inline'>
              <Tooltip  content={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}>
                <button
                  onClick={() => dispatch(toggleTheme())}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-text-primary/5 bg-text-primary/5 text-text-primary/70 transition-all hover:bg-text-primary/10 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-[var(--theme-primary)] "
                  aria-label="Toggle visual theme preference"
                >
                  <AnimatePresence mode="wait">
                    {isDark ? (
                      <motion.div
                        className="rounded-md"
                        key="sun"
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Sun className="h-5 w-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="moon"
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Moon className="h-5 w-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </Tooltip>
              </div>

              
              {/* Guest / Authenticated View */}
              {!user ? (
                <div className="flex items-center gap-2">
                  <Link href={`/auth/log-in`}>
                    <Button
                      variant="light"
                      className="hidden tablet:inline border border-text-primary/10 bg-transparent hover:bg-text-primary/5 text-text-primary/80 hover:text-text-primary font-medium text-sm transition-all rounded-md"
                    // onPress={() => setIsAuthenticated(true)}
                    >
                      Log In
                    </Button>
                  </Link>
                  <Link href={`/auth/register`}>
                    <Button
                      className="hidden tablet:inline bg-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/90 text-white font-semibold text-sm shadow-lg shadow-[var(--theme-primary)]/20 transition-all cursor-pointer rounded-md"
                    // onPress={() => setIsAuthenticated(true)}
                    >
                      Register
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="group relative flex items-center gap-2.5 rounded-md  p-1.5 pr-3 text-left transition-all focus-visible:outline-2 focus-visible:outline-[var(--theme-primary)] cursor-pointer"
                    aria-haspopup="true"
                    aria-expanded={isUserDropdownOpen}
                  >
                    {/* <Avatar
                      src={user.image}
                      name={user.name}
                      className="h-7 w-7 text-xs"
                      // isBordered
                      color="primary"
                      /> */}
                    {user && (
                      <>
                        <span className="hidden text-sm font-medium tracking-wide text-text-primary desktop:block">
                          {`Hi, ${user.name ? user.name.split(' ')[0] : ''}`}
                        </span>
                        <Avatar>
                          <Avatar.Image
                            src={user.image || ''}
                            alt={user.name || 'User avatar'}
                          />
                          <Avatar.Fallback>
                            {user.name?.charAt(0) || '?'}
                          </Avatar.Fallback>
                        </Avatar>
                      </>
                    )}



                    <svg
                      className={`absolute bottom-0 right-0 h-4 w-4 text-text-primary/60 group-hover:text-theme-primary transition-transform duration-300 ${isUserDropdownOpen ? "rotate-180" : ""
                        }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isUserDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className={`absolute right-0 mt-2 w-64 origin-top-right rounded-md border border-white/5 ${isDark ? 'bg-theme-background' : 'bg-foreground'}  transition-all duration-300 p-1.5 shadow-2xl ring-1 ring-black/5`}
                        role="menu"
                      >
                        {/* Dropdown Header */}
                        <div className="px-3 py-2.5 border-b border-white/5 mb-1">
                          <p className="text-xs text-text-primary/60">Signed in as</p>
                          <p className="text-sm font-semibold text-text-primary truncate">{user.email}</p>
                        </div>

                        {/* Dropdown Items */}
                                                <button
                          role="menuitem"
                          onClick={() => router.push(`/user/${user.id}`)}
                          className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm  transition-colors  text-text-primary hover:bg-theme-primary/30  cursor-pointer`}
                        >
                          <CgProfile  className="h-4 w-4 text-text-primary" />
                          <span>Profile</span>
                        </button>

                        <button
                          role="menuitem"
                          onClick={() => setIsUserDropdownOpen(false)}
                          className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm  transition-colors  text-text-primary hover:bg-theme-primary/30  cursor-pointer`}
                        >
                          <Gear className="h-4 w-4 text-text-primary" />
                          <span>Settings</span>
                        </button>

                        <button
                          role="menuitem"
                          onClick={() => {
                            handleLogOut();
                            setIsUserDropdownOpen(false);
                          }}
                          className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm text-rose-500 transition-colors hover:bg-rose-500/30 cursor-pointer"
                        >
                          <ArrowRightFromSquare className="h-4 w-4" />
                          <span className="font-medium">Log Out</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm desktop:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Drawer */}
            <motion.div
              ref={mobileMenuRef}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className={`fixed bottom-0 left-0 top-0 z-50 flex w-full max-w-xs flex-col border-r p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 xl:hidden ${isDark ? 'bg-theme-background/8 border-white/5' : 'bg-foreground border-black/5'
                }`}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation Drawer"
            >
              {/* Drawer Brand Header */}
              <div className="flex items-center justify-between mb-8">
                <Link
                  href="/"
                  className="flex items-center gap-3 transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-[var(--theme-primary)]"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="BookVerse Home"
                >
                  <div className="relative flex h-10 w-10 items-center justify-center">
                    <Image
                      src="/book-verse-logo.png"
                      alt="BookVerse Logo"
                      width={40}
                      height={40}
                      priority
                      className="object-cover"
                      style={{ width: "auto", height: "auto" }}
                    />
                  </div>
                  <span className="bg-gradient-to-r from-text-primary via-text-primary/90 to-text-primary/70 bg-clip-text text-xl font-bold tracking-tight text-transparent">
                    BookVerse
                  </span>
                </Link>

                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group flex h-10 w-10 items-center justify-center rounded-md border border-text-primary/5 bg-text-primary/5 text-text-primary transition-all hover:bg-theme-primary focus-visible:outline-2 focus-visible:outline-[var(--theme-primary)]"
                  aria-label="Close Mobile Menu"
                >
                  <svg className="h-5 w-5 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-1.5" aria-label="Mobile Navigation Links">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`relative flex gap-3 items-center rounded-md px-4 py-3 text-base font-medium tracking-wide transition-colors duration-200 text-text-primary hover:bg-theme-primary/30  focus-visible:outline-2  focus-visible:outline-[var(--theme-primary)] ${isActive ? "bg-theme-primary text-white] " : ""}`}
                    >
                      <Icon size={20} className="flex-shrink-0" />
                      <span>{link.name}</span>
                      {isActive && (
                        <motion.span
                          layoutId="mobileActiveIndicator"
                          className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-secondary-purple)]"
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>


              {
                user?.role && (
                  <div className='mt-8'>
                    <DashboardSidebarContent usingNavSidebar={true} />
                  </div>
                )
              }



              {/* Drawer Footer Actions */}
              <div className="mt-auto border-t border-text-primary/5 pt-6">
                {!user ? (
                  <div className="flex flex-col gap-3">
                    <Link href={`/auth/log-in`} onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                      <Button
                        variant="light"
                        className="w-full border border-text-primary/10 bg-transparent hover:bg-theme-primary/30 text-text-primary font-medium text-sm transition-all rounded-md"
                      >
                        Log In
                      </Button>
                    </Link>
                    <Link href={`/auth/register`} onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                      <Button
                        className="w-full bg-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/30 text-white font-semibold text-sm shadow-lg shadow-[var(--theme-primary)]/20 transition-all cursor-pointer rounded-md"
                      >
                        Register
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {/* User Profile Segment */}
                    <div className="flex items-center gap-3 px-2">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full border border-text-primary/10">
                        <Image
                          src={user?.image}
                          alt={`${user?.name || 'User'}'s profile picture`}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold tracking-wide text-text-primary truncate">
                          {user?.name}
                        </p>
                        <p className="text-xs text-text-primary/50 truncate">
                          {user?.email}
                        </p>
                      </div>
                    </div>

                    {/* Utility Actions */}
                    <div className="flex flex-col gap-1.5 mt-2">
                      <Link
                        href="/settings"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex w-full items-center gap-3 rounded-md px-4 py-3 text-base font-medium tracking-wide text-text-primary transition-colors hover:bg-theme-primary/30 focus-visible:outline-2 focus-visible:outline-[var(--theme-primary)]"
                      >
                        <Gear className="h-5 w-5 text-text-primary" />
                        <span>Settings</span>
                      </Link>

                      <button
                        onClick={() => {
                          handleLogOut();
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex w-full items-center gap-3 rounded-md px-4 py-3 text-base font-medium tracking-wide text-red-500 transition-colors hover:bg-red-500/10 focus-visible:outline-2 focus-visible:outline-[var(--theme-primary)] cursor-pointer"
                      >
                        <ArrowRightFromSquare className="h-5 w-5" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>


    </>
  );
}