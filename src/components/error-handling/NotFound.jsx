'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { GrFormPreviousLink } from 'react-icons/gr'
import { RiHome2Line } from 'react-icons/ri'

const NotFound = () => {
    const router = useRouter()
    return (
        <div className=" bg-background min-h-screen text-text-primary py-20">
            {/* container */}
            <div className="w-full max-w-350 mx-auto p-20 text-center bg-foreground rounded-lg shadow-sm border border-foreground">

                <h2 className="text-9xl font-semibold text-text-primary mb-10">404</h2>

                {/* Clear, bold heading */}
                <h4 className="text-3xl font-semibold tracking-tight text-text-primary mb-3">
                    Page not found.
                </h4>

                {/* Simple, helpful subtext */}
                <p className="text-lg text-neutral-500 max-w-md mx-auto leading-tight mb-10 ">
                    It might have been moved or deleted. Check the address and try again.
                </p>

                {/* Apple-esque Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center ">
                    <Link
                        href="/"
                        className="w-50 inline-flex items-center justify-center px-6 py-3 rounded-full bg-theme-primary text-white font-medium  transition-colors"
                    >
                        <RiHome2Line className='w-6 h-5 mr-2' />
                        Home Page
                    </Link>
                    <button
                        onClick={() => router.back()}
                        className="cursor-pointer w-50 inline-flex items-center justify-center px-6 py-3 rounded-full bg-neutral-100 text-black font-medium hover:bg-neutral-200 transition-colors"
                    >
                        <GrFormPreviousLink className='w-6 h-5 mr-2' />
                        Previous Page
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NotFound