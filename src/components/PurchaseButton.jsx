'use client'

import { useEffect, useState } from 'react'
import { handlePurchase } from "@/lib/actions/user"
import { checkIfPurchased } from "@/lib/api/books"
import { authClient } from "@/lib/auth-client"
import { FaShoppingBag } from "react-icons/fa"

const PurchaseButton = ({book}) => {
    const { data: session } = authClient.useSession()
    const user = session?.user
    const [isPurchased, setIsPurchased] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isOwnBook, setIsOwnBook] = useState(false)

    useEffect(() => {
        const checkPurchaseStatus = async () => {
            try {
                setIsLoading(true)
                // Check if user is the writer
                if (user?.id === book?.writerId) {
                    setIsOwnBook(true)
                    setIsLoading(false)
                    return
                }
                
                // Check if already purchased
                const result = await checkIfPurchased(book._id)
                setIsPurchased(result?.isPurchased || false)
            } catch (error) {
                console.error('Error checking purchase status:', error)
            } finally {
                setIsLoading(false)
            }
        }

        if (user && book) {
            checkPurchaseStatus()
        } else {
            setIsLoading(false)
        }
    }, [user, book])

    if (isLoading) {
        return (
            <button disabled className="flex gap-2 cursor-not-allowed bg-gray-600 text-white font-bold px-8 py-6 rounded-xl opacity-50" type="submit">
                <FaShoppingBag className="text-lg" /> Loading...
            </button>
        )
    }

    if (!user) {
        return (
            <button onClick={() => { window.location.href = '/auth/log-in' }} className="flex gap-2 cursor-pointer bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold px-8 py-6 rounded-xl shadow-lg shadow-purple-900/30 border border-purple-500/30 transition-all transform active:scale-98" type="submit">
                <FaShoppingBag className="text-lg" /> Log in to Purchase
            </button>
        )
    }

    if (isOwnBook) {
        return (
            <button disabled className="flex gap-2 cursor-not-allowed bg-gray-600 text-white font-bold px-8 py-6 rounded-xl opacity-50 border border-gray-500/30" type="submit">
                <FaShoppingBag className="text-lg" /> Purchase for ${book.price}    
            </button>
        )
    }

    if (isPurchased) {
        return (
            <button disabled className="flex gap-2 cursor-not-allowed bg-green-600 text-white font-bold px-8 py-6 rounded-xl opacity-75 border border-green-500/30" type="submit">
                <FaShoppingBag className="text-lg" /> Already Purchased
            </button>
        )
    }

    return (
        <button onClick={() => { handlePurchase(book._id) }} className="flex gap-2 cursor-pointer bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold px-8 py-6 rounded-xl shadow-lg shadow-purple-900/30 border border-purple-500/30 transition-all transform active:scale-98" type="submit" role="link">
            <FaShoppingBag className="text-lg" /> Purchase for ${book.price}
        </button>
    )
}

export default PurchaseButton