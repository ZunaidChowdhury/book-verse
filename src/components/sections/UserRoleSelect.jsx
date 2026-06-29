'use client'

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { FaRegPenToSquare } from "react-icons/fa6";
import { LiaBookReaderSolid } from "react-icons/lia";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import { updateUserRole } from "@/lib/actions/user";
import { authClient } from "@/lib/auth-client";
import { useSelector, useDispatch } from "react-redux";

const UserRoleSelect = () => {
      const { isDark } = useSelector((state) => state.theme);
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
        <div className="w-full py-30 flex items-center justify-center p-6 text-center">
            <div className={`w-full max-w-[440px] p-8 rounded-xl border shadow-md transition-all duration-300 ${isDark
                    ? 'bg-gradient-to-b from-[#111836] to-[#0b0f24] border-white/5 shadow-black/40'
                    : 'bg-foreground border-black/5 shadow-black/5'
                }`}>

                {/* Clear, bold heading matching your first component's theme structure */}
                <h4 className={`text-xl font-bold tracking-tight mb-6 select-none ${isDark ? 'text-text-primary' : 'text-text-primary'}`}>
                    I'm a...
                </h4>

                {/* Grid Layout for Selection Roles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">

                    {/* Option 1: Reader Card Component */}
                    <Button
                        size="lg"
                        disabled={isSubmitting}
                        onClick={() => setSelectedRole("reader")}
                        className={`flex flex-col items-center justify-center gap-3 w-full aspect-square h-auto p-5 font-semibold rounded-xl border transition-all duration-300 cursor-pointer group whitespace-normal ${selectedRole === "reader"
                                ? "bg-[var(--theme-primary)]/10 border-[var(--theme-primary)] shadow-lg shadow-[var(--theme-primary)]/10 text-[var(--theme-primary)]"
                                : isDark
                                    ? "bg-white/5 border-white/5 text-white hover:bg-[var(--theme-primary)]/5 hover:border-[var(--theme-primary)]/30"
                                    : "bg-black/5 border-black/5 text-black hover:bg-[var(--theme-primary)]/5 hover:border-[var(--theme-primary)]/20"
                            }`}
                    >
                        {/* Icon Container */}
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${selectedRole === "reader"
                                ? "bg-[var(--theme-primary)]/20"
                                : isDark ? "bg-white/5 group-hover:bg-[var(--theme-primary)]/20" : "bg-black/5 group-hover:bg-[var(--theme-primary)]/20"
                            }`}>
                            <LiaBookReaderSolid className={`w-6 h-6 transition-transform duration-300 group-hover:scale-110 ${selectedRole === "reader" ? "text-[var(--theme-primary)]" : "text-text-secondary group-hover:text-[var(--theme-primary)]"
                                }`} />
                        </div>

                        {/* Text Metadata */}
                        <div className="flex flex-col items-center justify-center text-center">
                            <span className={`text-sm font-bold tracking-wide transition-colors ${selectedRole === "reader"
                                    ? "text-[var(--theme-primary)]"
                                    : isDark ? "text-white group-hover:text-[var(--theme-primary)]" : "text-black group-hover:text-[var(--theme-primary)]"
                                }`}>
                                Reader
                            </span>
                            <span className="text-[11px] text-text-secondary font-normal mt-1 max-w-[130px] leading-tight block opacity-80">
                                Browse, purchase, and review digital ebooks.
                            </span>
                        </div>
                    </Button>

                    {/* Option 2: Writer Card Component */}
                    <Button
                        size="lg"
                        disabled={isSubmitting}
                        onClick={() => setSelectedRole("writer")}
                        className={`flex flex-col items-center justify-center gap-3 w-full aspect-square h-auto p-5 font-semibold rounded-xl border transition-all duration-300 cursor-pointer group whitespace-normal ${selectedRole === "writer"
                                ? "bg-[var(--theme-primary)]/10 border-[var(--theme-primary)] shadow-lg shadow-[var(--theme-primary)]/10 text-[var(--theme-primary)]"
                                : isDark
                                    ? "bg-white/5 border-white/5 text-white hover:bg-[var(--theme-primary)]/5 hover:border-[var(--theme-primary)]/30"
                                    : "bg-black/5 border-black/5 text-black hover:bg-[var(--theme-primary)]/5 hover:border-[var(--theme-primary)]/20"
                            }`}
                    >
                        {/* Icon Container */}
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${selectedRole === "writer"
                                ? "bg-[var(--theme-primary)]/20"
                                : isDark ? "bg-white/5 group-hover:bg-[var(--theme-primary)]/20" : "bg-black/5 group-hover:bg-[var(--theme-primary)]/20"
                            }`}>
                            <FaRegPenToSquare className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${selectedRole === "writer" ? "text-[var(--theme-primary)]" : "text-text-secondary group-hover:text-[var(--theme-primary)]"
                                }`} />
                        </div>

                        {/* Text Metadata */}
                        <div className="flex flex-col items-center justify-center text-center">
                            <span className={`text-sm font-bold tracking-wide transition-colors ${selectedRole === "writer"
                                    ? "text-[var(--theme-primary)]"
                                    : isDark ? "text-white group-hover:text-[var(--theme-primary)]" : "text-black group-hover:text-[var(--theme-primary)]"
                                }`}>
                                Writer
                            </span>
                            <span className="text-[11px] text-text-secondary font-normal mt-1 max-w-[130px] leading-tight block opacity-80">
                                Publish stories and list indie ebooks for sale.
                            </span>
                        </div>
                    </Button>

                </div>

                {/* Primary Action Button */}
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