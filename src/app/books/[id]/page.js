import React from 'react';
import Image from 'next/image';
import { Button } from '@heroui/react';
import {
    FaBookOpen,
    FaShoppingBag,
    FaStar,
    FaCloudDownloadAlt,
    FaChevronLeft,
    FaCalendarAlt,
    FaHistory
} from 'react-icons/fa';
import { getBookById, getBookContent, checkIfPurchased } from '@/lib/api/books';
import PurchaseButton from '@/components/PurchaseButton';
import BookDetailsActions from '@/components/BookDetailsActions';
import { getUser } from '@/lib/core/session';


const BookDetailsPage = async ({ params }) => {
    const { id } = await params;
    const book = await getBookById(id);
    const user = await getUser();
    
    let bookContent = null;
    let isPurchased = false;

    // Try to fetch content if user is logged in and purchased the book
    if (user && user.role === 'reader') {
        try {
            const purchaseCheck = await checkIfPurchased(id);
            isPurchased = !!purchaseCheck?.isPurchased;
            if (isPurchased) {
                const contentData = await getBookContent(id);
                bookContent = contentData?.content;
                console.log('bookContent: ', bookContent)
            }
        } catch (error) {
            isPurchased = false;
        }
    }

    console.log('Book Details Page: ', book)

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-[#0a0f1d] text-slate-100 font-sans selection:bg-purple-500/30">
            {/* Background Decorative Cosmic Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Top Navigation Bar */}
            <header className="border-b border-slate-800/60 bg-[#0c1324]/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <a href="/books" className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors group">
                        <FaChevronLeft className="group-hover:-translate-x-0.5 transition-transform" />
                        Back to All Books
                    </a>
                    <div className="text-xs text-slate-500 font-mono">ID: {book._id}</div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-12 relative z-10">
                {/* Responsive Desktop Two-Column Layout Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">

                    {/* LEFT COLUMN: Sticky Book Preview Wrapper */}
                    <div className="md:col-span-4 flex flex-col gap-4 md:sticky md:top-24">
                        <div className="relative group rounded-2xl overflow-hidden border border-slate-700/40 bg-slate-900 shadow-[0_0_50px_rgba(0,0,0,0.5)] aspect-[2/3] w-full">
                            <Image
                                src={book.image}
                                alt={book.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                priority
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {/* Overlay Status Chips */}
                            <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none">
                                <span className="bg-emerald-500/90 text-white text-xs px-2.5 py-1 rounded-md font-semibold backdrop-blur-sm shadow-md">
                                    {book.availabilityStatus}
                                </span>
                                <span className="bg-amber-500/90 text-slate-950 text-xs px-2 py-0.5 rounded-md font-bold flex items-center gap-1 backdrop-blur-sm shadow-md">
                                    <FaStar className="inline text-[10px]" /> {book.rating}
                                </span>
                            </div>
                        </div>

                        <Button
                            variant="flat"
                            className="w-full py-6 bg-slate-800/40 hover:bg-slate-800 border border-slate-700/50 text-slate-300 font-medium rounded-xl transition-all"
                            startContent={<FaBookOpen className="text-lg text-purple-400" />}
                        >
                            Read Free Preview
                        </Button>
                    </div>

                    {/* RIGHT COLUMN: Extensive Book Meta Information */}
                    <div className="md:col-span-8 flex flex-col gap-8">
                        {/* Titles & Genres */}
                        <div>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {book.genres.map((genre) => (
                                    <span
                                        key={genre}
                                        className="bg-purple-950/40 text-purple-300 border border-purple-800/50 text-xs px-3 py-1 rounded-full font-medium"
                                    >
                                        {genre}
                                    </span>
                                ))}
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-none mb-2">
                                {book.title}
                            </h1>
                            <p className="text-lg text-slate-400 font-medium">
                                by <span className="text-purple-400 hover:underline cursor-pointer">{book.writerName}</span>
                            </p>
                        </div>

                        {/* Price Box & Primary Payment Call-to-Action */}
                        <div className="bg-gradient-to-r from-[#0f1930] to-[#13203d] p-6 rounded-2xl border border-slate-800/80 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                            <div>
                                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Instant Access Price</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-black text-white">${book.price.toFixed(2)}</span>
                                    <span className="text-xs text-slate-500 line-through">${(book.price * 5).toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                {/* <form action="/api/checkout_sessions" method="POST">
                                    <section>
                                        <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold px-8 py-6 rounded-xl shadow-lg shadow-purple-900/30 border border-purple-500/30 transition-all transform active:scale-98" type="submit" role="link">
                                            <FaShoppingBag className="text-lg" /> Purchase for ${book.price}
                                        </button>
                                    </section>
                                </form>  */}
                                <PurchaseButton book={book} />
                                <BookDetailsActions bookId={book._id} />
                            </div>
                        </div>

                        {/* Summary Block */}
                        <div className="space-y-3">
                            <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold">Logline Description</h3>
                            <p className="text-slate-300 leading-relaxed text-base italic border-l-2 border-purple-500/40 pl-4">
                                "{book.description}"
                            </p>
                        </div>

                        {/* Detailed Content Segment */}
                        {isPurchased && (
                            <div className="bg-[#0c1426] border border-slate-800/80 rounded-2xl p-6 space-y-3">
                                <h3 className="text-xs uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-2">
                                    <FaBookOpen className="text-emerald-400" /> Book Content
                                </h3>
                                {bookContent ? (
                                    <div className="text-slate-300 text-sm leading-relaxed font-normal prose prose-invert max-w-none">
                                        <p className="whitespace-pre-wrap">{bookContent}</p>
                                    </div>
                                ) : (
                                    <div className="text-slate-400 text-sm">
                                        <p>No content available</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Detailed Metadata Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-900/40 border border-slate-800/50 p-4 rounded-xl text-center">
                            <div>
                                <span className="block text-xs text-slate-500 font-medium mb-1">Downloads</span>
                                <span className="text-sm font-bold text-slate-200 flex items-center justify-center gap-1.5">
                                    <FaCloudDownloadAlt className="text-blue-400" /> {book.soldQuantity?.toLocaleString()}+
                                </span>
                            </div>
                            <div>
                                <span className="block text-xs text-slate-500 font-medium mb-1">Status</span>
                                <span className="text-sm font-bold text-emerald-400 animate-pulse">
                                    {book.visibility === 'publish' ? 'Live' : 'Draft'}
                                </span>
                            </div>
                            <div>
                                <span className="block text-xs text-slate-500 font-medium mb-1">Released</span>
                                <span className="text-sm font-bold text-slate-300 flex items-center justify-center gap-1.5">
                                    <FaCalendarAlt className="text-slate-500 text-xs" /> {formatDate(book.createdAt)}
                                </span>
                            </div>
                            <div>
                                <span className="block text-xs text-slate-500 font-medium mb-1">Last Updated</span>
                                <span className="text-sm font-bold text-slate-300 flex items-center justify-center gap-1.5">
                                    <FaHistory className="text-slate-500 text-xs" /> {formatDate(book.updatedAt)}
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default BookDetailsPage;
