'use client'

const PaymentSuccessful = () => {
    return (
        <div className="success-banner relative flex items-center justify-between gap-4 p-4 mb-6 text-emerald-900 border border-emerald-400 bg-emerald-100/90 shadow-sm rounded-none">

            {/* Invisible spacer to perfectly balance the Close Button on the right and keep content dead-center */}
            <div className="w-5 shrink-0 hidden sm:block"></div>

            {/* Centered Content */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center mx-auto">
                {/* Success Icon */}
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-600 text-white shrink-0 shadow-sm">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                {/* Text Elements */}
                <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                    <h3 className="font-bold text-sm sm:text-base text-emerald-950">Payment Successful!</h3>
                    <span className="hidden sm:inline text-emerald-400">•</span>
                    <p className="text-xs sm:text-sm text-emerald-900 font-medium">Thank you for your purchase! Enjoy your book.</p>
                </div>
            </div>

            {/* Native Native-DOM Dismiss Button (Works flawlessly inside Server Components) */}
            <button
                onClick={(e) => e.currentTarget.closest('.success-banner').remove()}
                className="text-emerald-700 hover:text-emerald-950 hover:bg-emerald-200/50 p-1 transition-colors shrink-0"
                aria-label="Dismiss message"
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    )
}

export default PaymentSuccessful