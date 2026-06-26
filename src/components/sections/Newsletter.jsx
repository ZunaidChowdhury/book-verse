'use client'

const Newsletter = () => {
    return (
        <div className='py-12 tablet:py-24 overflow-hidden bg-background'>
            {/* Root Layout boundary container matching your exact 1400px specification */}
            <div className='mx-auto max-w-[1400px] px-4 tablet:px-6 desktop:px-8'>

                <div className="group relative w-full rounded-2xl bg-gradient-to-b from-[#111836] to-[#0b0f24] border border-white/5 p-8 tablet:p-16 text-center overflow-hidden shadow-xl">

                    {/* Subtle Glow Effect on Hover / Focus */}
                    <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,var(--theme-primary)_0%,transparent,70%)] pointer-events-none" />

                    {/* Left & Right Decorative Background Elements to match BookVerse visual density */}
                    <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-[var(--theme-primary)]/10 blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-[var(--theme-secondary-purple)]/10 blur-3xl pointer-events-none" />

                    <div className="relative max-w-2xl mx-auto flex flex-col items-center">

                        {/* News and Update Tagline Badge */}
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-[var(--theme-primary)]/10 to-[var(--theme-secondary-purple)]/10 text-theme-primary/90 border border-theme-primary/20 mb-4">
                            Stay Updated
                        </span>

                        {/* Heading & Context Lines */}
                        <h2 className="text-3xl tablet:text-4xl font-extrabold tracking-tight text-white mb-3">
                            Join the BookVerse Community
                        </h2>

                        <p className="text-sm tablet:text-base text-slate-400 leading-relaxed mb-8 max-w-lg">
                            Subscribe to our newsletter to receive curated reading lists, exclusive author interviews, and seasonal platform updates directly in your inbox.
                        </p>

                        {/* Interactive Signup Form Layout Panel */}
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="w-full flex flex-col sm:flex-row gap-3 items-stretch justify-center max-w-lg"
                        >
                            <div className="relative flex-1">
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    required
                                    className="w-full h-11 px-4 rounded-lg bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[var(--theme-primary)] focus:ring-1 focus:ring-[var(--theme-primary)] transition-all duration-300"
                                    aria-label="Email address for newsletter subscription"
                                />
                            </div>

                            <button
                                type="submit"
                                className="shrink-0 h-11 bg-gradient-to-r from-theme-secondary-purple to-theme-primary hover:opacity-90 text-white text-sm font-bold rounded-lg px-6 shadow-md shadow-theme-primary/10 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                            >
                                <span>Subscribe</span>
                                <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M22 2L11 13" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M22 2L15 22L11 13L2 9L22 2Z" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </form>

                        {/* Micro-text policy terms verification */}
                        <p className="text-[11px] text-slate-500 mt-3 tracking-wide">
                            Zero spam. Unsubscribe at any time.
                        </p>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Newsletter