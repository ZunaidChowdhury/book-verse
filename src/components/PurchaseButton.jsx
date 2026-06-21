'use client'

import { handlePurchase } from "@/lib/actions/user"
import { FaShoppingBag } from "react-icons/fa"

const PurchaseButton = ({book}) => {
    return (
        <button onClick={() => { handlePurchase(book._id) }} className="flex gap-2 cursor-pointer bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold px-8 py-6 rounded-xl shadow-lg shadow-purple-900/30 border border-purple-500/30 transition-all transform active:scale-98" type="submit" role="link">
            <FaShoppingBag className="text-lg" /> Purchase for ${book.price}
        </button>
    )
}

export default PurchaseButton