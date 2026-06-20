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

export default function LogInPage() {

  const router = useRouter();
  const sp = useSearchParams();

  const redirectTo = sp?.get("redirect") || "/";

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
      // toast.success("Login successful!", { autoClose: 3000, });
      // console.log('log in success, user: ', data)
      router.push(redirectTo);
    }

    if (authError) {
      setErrors({ form: authError.message || "Authentication failed" });
    }
  }

  // Consistent input wrapper styling using theme variables to support dark/light modes
  const inputClass = "w-full bg-foreground/[0.03] hover:bg-foreground/[0.06] border border-foreground/10 hover:border-foreground/20 focus:border-[var(--theme-primary)] focus:ring-1 focus:ring-[var(--theme-primary)]/40 transition-all duration-200 rounded-md h-11 pl-10 pr-4 text-foreground placeholder:text-foreground/40 text-sm outline-none";
  const passwordInputClass = "w-full bg-foreground/[0.03] hover:bg-foreground/[0.06] border border-foreground/10 hover:border-foreground/20 focus:border-[var(--theme-primary)] focus:ring-1 focus:ring-[var(--theme-primary)]/40 transition-all duration-200 rounded-md h-11 pl-10 pr-10 text-foreground placeholder:text-foreground/40 text-sm outline-none";

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12 bg-background transition-colors duration-300">
      {/* Decorative Blur Background (styled from theme) */}
      <div className="absolute -z-10 h-[380px] w-[380px] rounded-full bg-[var(--theme-primary)]/10 blur-[90px] pointer-events-none" />

      {/* Main Form Container Card */}
      <div className="w-full max-w-[440px] rounded-lg border border-foreground/5 bg-background/50 backdrop-blur-md px-6 py-8 tablet:px-8 shadow-xl transition-all duration-300">

        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Welcome back
          </h1>
          <p className="mt-1.5 text-sm text-foreground/60">
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
          className="border border-foreground/15 dark:border-white/15 bg-transparent hover:bg-foreground/5 text-foreground/80 hover:text-foreground font-semibold h-11 rounded-md transition-all duration-200"
          onClick={() => {googleSignIn()}}
        >
          <FcGoogle size={24} />
          Continue with Google
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-[1px] bg-foreground/10" />
          <span className="text-xs font-semibold text-foreground/40 uppercase tracking-widest">
            or
          </span>
          <div className="flex-1 h-[1px] bg-foreground/10" />
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

          {/* Form Level Error */}
          {errors.form && (
            <div className="rounded-md border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/30 px-3.5 py-2.5">
              <span className="text-rose-700 dark:text-rose-400 text-sm">{errors.form}</span>
            </div>
          )}

          {/* Email Field */}
          <TextField
            isInvalid={!!errors.email}
            className="flex flex-col gap-1.5"
          >
            <Label className="text-foreground/80 text-sm font-medium">
              Email Address
            </Label>
            <div className="relative flex items-center">
              <Envelope className="absolute left-3 text-foreground/40 shrink-0" width={16} height={16} />
              <Input
                type="email"
                placeholder="name@domain.com"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={inputClass}
              />
            </div>
            {errors.email && (
              <span className="text-rose-500 text-xs mt-0.5">{errors.email}</span>
            )}
          </TextField>

          {/* Password Field */}
          <TextField
            isInvalid={!!errors.password}
            className="flex flex-col gap-1.5"
          >
            <div className="flex items-center justify-between">
              <Label className="text-foreground/80 text-sm font-medium">
                Password
              </Label>
              <Link
                href="/auth/forgot-password"
                className="text-[var(--theme-primary)] hover:underline text-xs font-medium transition-all duration-150"
              >
                Forgot?
              </Link>
            </div>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 text-foreground/40 shrink-0" width={16} height={16} />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className={passwordInputClass}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 text-foreground/40 hover:text-foreground transition-colors focus:outline-none"
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
              <span className="text-rose-500 text-xs mt-0.5">{errors.password}</span>
            )}
          </TextField>

          {/* Log In Action Button */}
          <Button
            id="login-submit"
            type="submit"
            fullWidth
            className="mt-2 h-11 bg-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/90 text-white font-semibold text-sm shadow-lg shadow-[var(--theme-primary)]/20 transition-all cursor-pointer rounded-md"
          >
            Log In
          </Button>
        </form>

        {/* Footer / Alternate actions */}
        <p className="mt-6 text-center text-sm text-foreground/50">
          Don't have an account?{" "}
          <Link
            href={`/auth/register`}
            className="text-[var(--theme-primary)] hover:underline font-semibold transition-all duration-150"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}