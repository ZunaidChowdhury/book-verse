'use client'

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { FaRegPenToSquare } from "react-icons/fa6";
import { LiaBookReaderSolid } from "react-icons/lia";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import { updateUserRole } from "@/lib/actions/user";
import { authClient } from "@/lib/auth-client";


const UserRoleSelect = () => {
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/auth/log-in");
                    toast.success("Done. Sign in to continue.");
                },
            },
        });
    }

    const handleRoleSubmit = async (role) => {
        setIsSubmitting(true);

        try {
            const data = { role: role }
            const res = await updateUserRole(data)
            if (res.modifiedCount > 0) {
                handleLogOut()
                // router.push('/auth/log-in')

            }
            else toast.error("Failed to update.");
        } catch (error) {
            toast.error("Failed to update.");
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
<div className="flex min-h-[400px] items-center justify-center bg-[#0B0D17] px-4 text-white">
    <div className="w-full max-w-[440px] rounded-xl border border-white/5 bg-[#050811] p-8 text-center shadow-xl shadow-black/40 backdrop-blur-xl">

        {/* Title Heading Header */}
        <h1 className="text-3xl font-bold tracking-tight text-text-primary mb-8 select-none">
            I'm a,
        </h1>

        {/* HeroUI Buttons Layout Column Grid */}
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 w-full">
            
            {/* Option 1: Reader Card Component */}
            <Button
                size="lg"
                disabled={isSubmitting}
                onClick={() => setSelectedRole("reader")}
                className={`flex flex-col items-center justify-center gap-4 w-full aspect-square h-auto p-6 text-white font-semibold rounded-xl transition-all cursor-pointer group whitespace-normal ${
                    selectedRole === "reader"
                        ? "bg-[#9945FF]/10 border-[#9945FF] shadow-[0_0_20px_rgba(153,69,255,0.15)]"
                        : "bg-white/5 border-white/5 hover:bg-[#9945FF]/10 hover:border-[#9945FF]/30"
                }`}
            >
                {/* Render icon inside a clean rounded circle shell */}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-200 shrink-0 ${
                    selectedRole === "reader" ? "bg-[#9945FF]/20" : "bg-white/5 group-hover:bg-[#9945FF]/20"
                }`}>
                    <LiaBookReaderSolid className="w-7 h-7 text-[#9945FF] group-hover:scale-110 transition-transform duration-200" />
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                    <span className={`text-base font-bold tracking-wide transition-colors ${
                        selectedRole === "reader" ? "text-[#B46EFF]" : "text-white group-hover:text-[#B46EFF]"
                    }`}>
                        Reader
                    </span>
                    <span className="text-xs text-text-secondary font-light mt-1 max-w-[140px] leading-tight block">
                        Browse, purchase, and review digital ebooks.
                    </span>
                </div>
            </Button>

            {/* Option 2: Writer Card Component */}
            <Button
                size="lg"
                disabled={isSubmitting}
                onClick={() => setSelectedRole("writer")}
                className={`flex flex-col items-center justify-center gap-4 w-full aspect-square h-auto p-6 text-white font-semibold rounded-xl transition-all cursor-pointer group whitespace-normal ${
                    selectedRole === "writer"
                        ? "bg-[#9945FF]/10 border-[#9945FF] shadow-[0_0_20px_rgba(153,69,255,0.15)]"
                        : "bg-white/5 border-white/5 hover:bg-[#9945FF]/10 hover:border-[#9945FF]/30"
                }`}
            >
                {/* Render icon inside a clean rounded circle shell */}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-200 shrink-0 ${
                    selectedRole === "writer" ? "bg-[#9945FF]/20" : "bg-white/5 group-hover:bg-[#9945FF]/20"
                }`}>
                    <FaRegPenToSquare className="w-6 h-6 text-[#9945FF] group-hover:scale-110 transition-transform duration-200" />
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                    <span className={`text-base font-bold tracking-wide transition-colors ${
                        selectedRole === "writer" ? "text-[#B46EFF]" : "text-white group-hover:text-[#B46EFF]"
                    }`}>
                        Writer
                    </span>
                    <span className="text-xs text-text-secondary font-light mt-1 max-w-[140px] leading-tight block">
                        Publish stories and list indie ebooks for sale.
                    </span>
                </div>
            </Button>

        </div>

        {/* Global Action Submission Block */}
        <div className="mt-6 w-full">
            <Button
                size="lg"
                isLoading={isSubmitting}
                disabled={isSubmitting}
                onClick={() => {
                    if (selectedRole === null) {
                        toast.error("Please select a role before continuing.");
                        return;
                    }
                    handleRoleSubmit(selectedRole);
                }}
                className="w-full bg-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/90 text-white font-semibold text-sm shadow-lg shadow-[var(--theme-primary)]/20 transition-all rounded-md h-11 cursor-pointer"
            >
                Continue
            </Button>
        </div>
    </div>
</div>
    );
}

export default UserRoleSelect