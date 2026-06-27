"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button, TextField, Label, Input } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import {
    Eye,
    EyeSlash,
    Envelope,
    Lock,
} from "@gravity-ui/icons";

import { authClient, googleSignIn } from '@/lib/auth-client';
import { useRouter, useSearchParams } from "next/navigation";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function LogInForm() {

      const { isDark } = useSelector((state) => state.theme);

    const router = useRouter();
    const sp = useSearchParams();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    function handleChange(field, value) {
        setForm((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: null }));
        }
    }

    function validate() {
        const newErrors = {};

        if (!form.email.trim()) {
            newErrors.email = "Email address is required.";
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = "Please enter a valid email address.";
        }
        if (!form.password) {
            newErrors.password = "Password is required.";
        }

        return newErrors;
    }

    async function handleGoogleSignIn() {
        try {
            await googleSignIn();
            // AuthInitializer will automatically sync the session to Redux
            // No need to manually fetch and dispatch user data
        } catch (error) {
            console.error('Google sign-in failed:', error);
            setErrors({ form: error?.message || "Google sign-in failed" });
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        // console.log("Successfully validated and submitted:", form);

        // submit logic here
        const { email, password } = form;

        const { data, error: authError } = await authClient.signIn.email({
            email,
            password,
        });

        if (data) {
            // AuthInitializer will automatically sync the session to Redux
            // Just redirect to the intended page
            // console.log("Login successful, redirecting..., data: ", data);
            toast.success("Login successful!");
            router.push(sp?.get("redirect") || `/dashboard/${data.user.role}`);
        }

        if (authError) {
            toast.error("Authentication failed.");
            setErrors({ form: authError.message || "Authentication failed" });
        }
    }

    // Consistent input wrapper styling using theme variables to support dark/light modes
    const inputClass = "w-full bg-foreground/[0.03] hover:bg-foreground/[0.06] border border-foreground/10 hover:border-foreground/20 focus:border-[var(--theme-primary)] focus:ring-1 focus:ring-[var(--theme-primary)]/40 transition-all duration-200 rounded-md h-11 pl-10 pr-4 text-foreground placeholder:text-foreground/40 text-sm outline-none";
    const passwordInputClass = "w-full bg-foreground/[0.03] hover:bg-foreground/[0.06] border border-foreground/10 hover:border-foreground/20 focus:border-[var(--theme-primary)] focus:ring-1 focus:ring-[var(--theme-primary)]/40 transition-all duration-200 rounded-md h-11 pl-10 pr-10 text-foreground placeholder:text-foreground/40 text-sm outline-none";

    return (
        <div className={`flex-1 flex items-center justify-center px-4 py-12 transition-colors duration-300 bg-background`}>
            {/* Decorative Blur Background (styled from theme) */}
            <div className="absolute -z-10 h-[380px] w-[380px] rounded-full bg-[var(--theme-primary)]/10 blur-[90px] pointer-events-none" />

            {/* Main Form Container Card with your standard dark-gradient theme architecture */}
            <div className={`w-full max-w-[440px] rounded-2xl border px-6 py-8 tablet:px-8 shadow-xl transition-all duration-300 ${isDark
                    ? 'bg-gradient-to-b from-[#111836] to-[#0b0f24] border-white/5'
                    : 'bg-foreground border-black/5'
                }`}>

                {/* Header Section */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold tracking-tight text-text-primary">
                        Welcome back
                    </h1>
                    <p className="mt-1.5 text-sm text-text-primary/70">
                        to{" "}
                        <span className="text-[var(--theme-primary)] font-semibold">
                            BookVerse
                        </span>
                    </p>
                </div>

                {/* OAuth Buttons */}
                <Button
                    type="button"
                    variant="bordered"
                    fullWidth
                    className="w-full flex items-center justify-center gap-2.5 border border-text-primary/10 bg-text-primary/5 text-text-primary/80 hover:text-text-primary hover:bg-text-primary/10 font-semibold h-11 rounded-lg focus-visible:outline-2 focus-visible:outline-[var(--theme-primary)] transition-all duration-200 cursor-pointer"
                    onClick={handleGoogleSignIn}
                >
                    <FcGoogle size={20} />
                    <span>Continue with Google</span>
                </Button>

                {/* Divider */}
                <div className="flex items-center gap-3 my-6">
                    <div className="flex-1 h-[1px] bg-text-primary/5" />
                    <span className="text-xs font-semibold text-text-primary/40 uppercase tracking-widest">
                        or
                    </span>
                    <div className="flex-1 h-[1px] bg-text-primary/5" />
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

                    {/* Form Level Error */}
                    {errors.form && (
                        <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-3.5 py-2.5">
                            <span className="text-rose-400 text-sm font-medium">{errors.form}</span>
                        </div>
                    )}

                    {/* Email Field */}
                    <TextField
                        isInvalid={!!errors.email}
                        className="flex flex-col gap-1.5"
                    >
                        <Label className="text-text-primary/90 text-sm font-medium">
                            Email Address
                        </Label>
                        <div className="relative flex items-center">
                            <Envelope className="absolute left-3.5 text-text-primary/40 shrink-0" width={16} height={16} />
                            <Input
                                type="email"
                                placeholder="name@domain.com"
                                value={form.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                className="w-full h-11 pl-10 pr-4 rounded-lg bg-text-primary/5 border border-text-primary/10 text-text-primary placeholder-text-primary/40 text-sm focus:outline-none focus:border-[var(--theme-primary)] focus:ring-1 focus:ring-[var(--theme-primary)] focus-visible:outline-2 focus-visible:outline-[var(--theme-primary)] transition-all duration-300"
                            />
                        </div>
                        {errors.email && (
                            <span className="text-rose-400 text-xs mt-0.5 font-medium">{errors.email}</span>
                        )}
                    </TextField>

                    {/* Password Field */}
                    <TextField
                        isInvalid={!!errors.password}
                        className="flex flex-col gap-1.5"
                    >
                        <div className="flex items-center justify-between">
                            <Label className="text-text-primary/90 text-sm font-medium">
                                Password
                            </Label>
                            <Link
                                href="/auth/forgot-password"
                                className="text-[var(--theme-primary)] hover:text-text-primary transition-colors text-xs font-medium focus-visible:outline-2 focus-visible:outline-[var(--theme-primary)]"
                            >
                                Forgot?
                            </Link>
                        </div>
                        <div className="relative flex items-center">
                            <Lock className="absolute left-3.5 text-text-primary/40 shrink-0" width={16} height={16} />
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={form.password}
                                onChange={(e) => handleChange("password", e.target.value)}
                                className="w-full h-11 pl-10 pr-10 rounded-lg bg-text-primary/5 border border-text-primary/10 text-text-primary placeholder-text-primary/40 text-sm focus:outline-none focus:border-[var(--theme-primary)] focus:ring-1 focus:ring-[var(--theme-primary)] focus-visible:outline-2 focus-visible:outline-[var(--theme-primary)] transition-all duration-300"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 text-text-primary/40 hover:text-text-primary transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-[var(--theme-primary)] cursor-pointer"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <EyeSlash width={18} height={18} />
                                ) : (
                                    <Eye width={18} height={18} />
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <span className="text-rose-400 text-xs mt-0.5 font-medium">{errors.password}</span>
                        )}
                    </TextField>

                    {/* Log In Action Button with full gradient layout configuration */}
                    <Button
                        id="login-submit"
                        type="submit"
                        fullWidth
                        className="mt-2 w-full h-11 bg-gradient-to-r from-[var(--theme-secondary-purple)] to-[var(--theme-primary)] hover:opacity-90 text-white font-bold text-sm shadow-lg shadow-[var(--theme-primary)]/20 transition-all duration-300 cursor-pointer rounded-lg focus-visible:outline-2 focus-visible:outline-[var(--theme-primary)]"
                    >
                        Log In
                    </Button>
                </form>

                {/* Footer / Alternate actions */}
                <p className="mt-6 text-center text-sm text-text-primary/70">
                    Don't have an account?{" "}
                    <Link
                        href={`/auth/register`}
                        className="ml-1 text-[var(--theme-primary)] hover:text-text-primary font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[var(--theme-primary)]"
                    >
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    );
}