'use client'

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { FaRegPenToSquare } from "react-icons/fa6";
import { LiaBookReaderSolid } from "react-icons/lia";
import { updateUserRole } from "@/lib/actions/user";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const UserRoleSelect = () => {
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // const handleLogOut = async () => {
    //     await authClient.signOut({
    //         fetchOptions: {
    //             onSuccess: () => {
    //                 router.push("/auth/log-in");
    //             },
    //         },
    //     });
    // }

    const handleRoleSubmit = async (role) => {

        setIsSubmitting(true);

        try {
            // Example:
            // await fetch('/api/user/update-role', { method: 'POST', body: JSON.stringify({ role }) });
            const data = { role: role }
            const res = await updateUserRole(data)
            if (res.modifiedCount > 0) {
                handleLogOut()
                router.push('/auth/log-in')
                toast.success("Done. Sign in to continue.");
            }
            else toast.error("Failed to update.");
        } catch (error) {
            toast.error("Failed to update.");
            // console.error("Failed to update role:", error);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="flex min-h-[400px] items-center justify-center bg-[#0B0D17] px-4 text-white">
            <div className="w-full max-w-[440px] rounded-xl border border-white/5 bg-[#050811] p-8 text-center shadow-xl shadow-black/40 backdrop-blur-xl">

                {/* Title Heading Header */}
                <h1 className="text-3xl font-bold tracking-tight text-white mb-8">
                    I'm a,
                </h1>

                {/* HeroUI Buttons Layout Column Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    {/* Option 1: Reader Card Component */}
                    <Button
                        size="lg"
                        isLoading={isSubmitting && selectedRole === "reader"}
                        disabled={isSubmitting}
                        onClick={() => setSelectedRole("reader")}
                        className="flex flex-col items-center justify-center gap-4 w-full aspect-square h-auto p-6 bg-white/5 hover:bg-[#9945FF]/10 border border-white/5 hover:border-[#9945FF]/30 text-white font-semibold rounded-xl transition-all cursor-pointer group whitespace-normal"
                    >
                        {/* Render icon inside a clean rounded circle shell */}
                        <div className="w-14 h-14 rounded-full bg-white/5 group-hover:bg-[#9945FF]/20 flex items-center justify-center transition-colors duration-200 shrink-0">
                            <LiaBookReaderSolid className="w-7 h-7 text-[#9945FF] group-hover:scale-110 transition-transform duration-200" />
                        </div>
                        <div className="flex flex-col items-center justify-center text-center">
                            <span className="text-base text-white font-bold tracking-wide transition-colors group-hover:text-[#B46EFF]">
                                Reader
                            </span>
                            <span className="text-xs text-slate-500 font-light mt-1 max-w-[140px] leading-tight block">
                                Browse, purchase, and review digital ebooks.
                            </span>
                        </div>
                    </Button>

                    {/* Option 2: Writer Card Component */}
                    <Button
                        size="lg"
                        isLoading={isSubmitting && selectedRole === "writer"}
                        disabled={isSubmitting}
                        onClick={() => setSelectedRole("writer")}
                        className="flex flex-col items-center justify-center gap-4 w-full aspect-square h-auto p-6 bg-white/5 hover:bg-[#9945FF]/10 border border-white/5 hover:border-[#9945FF]/30 text-white font-semibold rounded-xl transition-all cursor-pointer group whitespace-normal"
                    >
                        {/* Render icon inside a clean rounded circle shell */}
                        <div className="w-14 h-14 rounded-full bg-white/5 group-hover:bg-[#9945FF]/20 flex items-center justify-center transition-colors duration-200 shrink-0">
                            <FaRegPenToSquare className="w-6 h-6 text-[#9945FF] group-hover:scale-110 transition-transform duration-200" />
                        </div>
                        <div className="flex flex-col items-center justify-center text-center">
                            <span className="text-base text-white font-bold tracking-wide transition-colors group-hover:text-[#B46EFF]">
                                Writer
                            </span>
                            <span className="text-xs text-slate-500 font-light mt-1 max-w-[140px] leading-tight block">
                                Publish stories and list indie ebooks for sale.
                            </span>
                        </div>
                    </Button>

                </div>

                <Button
                    size="lg"
                    isLoading={isSubmitting && selectedRole !== null}
                    disabled={isSubmitting}
                    onClick={() => {
                        if (selectedRole === null) {
                            toast.error("Please select a role before continuing.");
                            return;
                        }
                        handleRoleSubmit(selectedRole)
                    }}
                    className=" w-full  "
                >
                    Continue
                </Button>
            </div>
        </div>
    );
}

export default UserRoleSelect