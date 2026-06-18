"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Button, TextField, Label, Input } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import {
  Eye,
  EyeSlash,
  CircleCheckFill,
  CircleXmark,
  Person,
  Envelope,
  Lock,
  Picture,
} from "@gravity-ui/icons";

import { authClient, googleSignIn } from '@/lib/auth-client';
import { useRouter } from "next/navigation";


// Password rule validation hook
function usePasswordRules(password) {
  return useMemo(
    () => ({
      minLength: password.length >= 6,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
    }),
    [password]
  );
}

// Sub-component for individual rule rows
function RuleRow({ label, passed }) {
  return (
    <div className="flex items-center gap-2">
      {passed ? (
        <CircleCheckFill className="text-emerald-500 dark:text-emerald-400 shrink-0" width={14} height={14} />
      ) : (
        <CircleXmark className="text-foreground/30 shrink-0" width={14} height={14} />
      )}
      <span
        className={`text-xs transition-colors duration-200 ${passed
          ? "text-emerald-600 dark:text-emerald-400 font-medium"
          : "text-foreground/50"
          }`}
      >
        {label}
      </span>
    </div>
  );
}

export default function RegisterPage() {

  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    profileImageUrl: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const rules = usePasswordRules(form.password);
  const allRulesPassed = rules.minLength && rules.hasUppercase && rules.hasLowercase;

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  }

  function validate() {
    const newErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }
    if (!form.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (!allRulesPassed) {
      newErrors.password = "Password does not meet validation requirements.";
    }
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required.";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
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
    const { fullName, email, profileImageUrl, password } = form;

    const { data, error: authError } = await authClient.signUp.email({
      name: fullName,
      email,
      password,
      image: profileImageUrl,
    });

    if (data) {
      setErrors({});
      await authClient.signOut();
      // console.log('register success, user: ', data)
      router.push('/auth/log-in');
    }

    if (authError) {
      setErrors(authError);
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
            Create your account
          </h1>
          <p className="mt-1.5 text-sm text-foreground/60">
            to continue to{" "}
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
          {/* <FcGoogle className="text-lg shrink-0" /> */}
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

          {/* Full Name Field */}
          <TextField
            isInvalid={!!errors.fullName}
            className="flex flex-col gap-1.5"
          >
            <Label className="text-foreground/80 text-sm font-medium">
              Full Name
            </Label>
            <div className="relative flex items-center">
              <Person className="absolute left-3 text-foreground/40 shrink-0" width={16} height={16} />
              <Input
                placeholder="Jane Doe"
                value={form.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                className={inputClass}
              />
            </div>
            {errors.fullName && (
              <span className="text-rose-500 text-xs mt-0.5">{errors.fullName}</span>
            )}
          </TextField>

          {/* Profile Image URL Field */}
          <TextField
            isInvalid={!!errors.profileImageUrl}
            className="flex flex-col gap-1.5"
          >
            <Label className="text-foreground/80 text-sm font-medium">
              Profile Image URL
            </Label>
            <div className="relative flex items-center">
              <Picture className="absolute left-3 text-foreground/40 shrink-0" width={16} height={16} />
              <Input
                placeholder="https://example.com/avatar.jpg"
                value={form.profileImageUrl}
                onChange={(e) => handleChange("profileImageUrl", e.target.value)}
                className={inputClass}
              />
            </div>
            {errors.profileImageUrl && (
              <span className="text-rose-500 text-xs mt-0.5">{errors.profileImageUrl}</span>
            )}
          </TextField>

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

          {/* Password Field & Inline Checker */}
          <div className="flex flex-col gap-1.5">
            <TextField
              isInvalid={!!errors.password}
              className="flex flex-col gap-1.5"
            >
              <Label className="text-foreground/80 text-sm font-medium">
                Password
              </Label>
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

            {/* Realtime password checker */}
            {form.password.length > 0 && (
              <div className="flex flex-col gap-1.5 rounded-md border border-foreground/5 bg-foreground/[0.02] px-3.5 py-2.5 mt-1 transition-all duration-200">
                <RuleRow label="At least 6 characters" passed={rules.minLength} />
                <RuleRow label="One uppercase letter (A-Z)" passed={rules.hasUppercase} />
                <RuleRow label="One lowercase letter (a-z)" passed={rules.hasLowercase} />
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <TextField
            isInvalid={!!errors.confirmPassword}
            className="flex flex-col gap-1.5"
          >
            <Label className="text-foreground/80 text-sm font-medium">
              Confirm Password
            </Label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 text-foreground/40 shrink-0" width={16} height={16} />
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
                className={passwordInputClass}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 text-foreground/40 hover:text-foreground transition-colors focus:outline-none"
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirmPassword ? (
                  <EyeSlash width={18} height={18} />
                ) : (
                  <Eye width={18} height={18} />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="text-rose-500 text-xs mt-0.5">{errors.confirmPassword}</span>
            )}
          </TextField>

          {/* Register Action Button */}
          <Button
            id="register-submit"
            type="submit"
            fullWidth
            className="mt-2 h-11 bg-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/90 text-white font-semibold text-sm shadow-lg shadow-[var(--theme-primary)]/20 transition-all cursor-pointer rounded-md"
          >
            Register
          </Button>
        </form>

        {/* Footer / Alternate actions */}
        <p className="mt-6 text-center text-sm text-foreground/50">
          Have an account?{" "}
          <Link
            href="/auth/log-in"
            className="text-[var(--theme-primary)] hover:underline font-semibold transition-all duration-150"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
