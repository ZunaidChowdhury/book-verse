"use client";

import React, { useState, useMemo, useRef } from "react";
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
  ArrowUpFromLine,
  CircleCheck,
} from "@gravity-ui/icons";

import { authClient, googleSignIn } from '@/lib/auth-client';
import { useRouter, useSearchParams } from "next/navigation";
import { useUploadThing } from "@/lib/uploadthing";
import { BiBookReader } from "react-icons/bi";
import { FaRegPenToSquare } from "react-icons/fa6";
import { LiaBookReaderSolid } from "react-icons/lia";
import { useSelector } from "react-redux";

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

function ProfileImageUploader({ onUploadComplete, onUploadError, onUploadBegin }) {
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const { startUpload, isUploading } = useUploadThing("profileImage", {
    onClientUploadComplete: (res) => {
      if (res && res.length > 0) {
        onUploadComplete(res);
        // clear any previous profile image error after successful upload
        try {
          // caller may pass a state updater that clears errors; we'll attempt a safe no-op here
          // the parent component will clear errors when it receives the upload result
        } catch (e) {
          // no-op
        }
      }
    },
    onUploadError: (error) => {
      onUploadError(error);
    },
    onUploadBegin: () => {
      onUploadBegin();
    },
  });

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    startUpload([file]);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragOver(false);
    if (isUploading) return;
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    startUpload([file]);
  }

  function handleDragOver(e) {
    e.preventDefault();
    setIsDragOver(true);
  }

  function handleDragLeave(e) {
    // Only clear when leaving the drop zone entirely (not child elements)
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => !isUploading && fileInputRef.current?.click()}
      className={`border-2 border-dashed rounded-xl p-6 transition-all duration-200 flex flex-col items-center justify-center gap-2 cursor-pointer select-none
        ${isDragOver
          ? "border-[var(--theme-primary)] bg-[var(--theme-primary)]/10 scale-[1.01] shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
          : "border-text-primary/15 hover:border-[var(--theme-primary)]/40 bg-text-primary/[0.03] hover:bg-[var(--theme-primary)]/8"
        }
        ${isUploading ? "pointer-events-none opacity-70" : ""}
      `}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        onClick={(e) => e.stopPropagation()}
      />

      {/* Icon */}
      <div className={`transition-transform duration-200 ${isDragOver ? "scale-110" : ""}`}>
        <ArrowUpFromLine
          className={`w-5 h-5 transition-colors duration-200 ${isDragOver ? "text-[var(--theme-primary)]" : "text-text-primary/60"
            }`}
        />
      </div>

      {/* Text */}
      <p className={`text-sm font-semibold transition-colors duration-200 ${isDragOver ? "text-[var(--theme-primary)]" : "text-text-primary/70"
        }`}>
        {isUploading
          ? "Uploading..."
          : isDragOver
            ? "Drop to upload"
            : "Drag & drop or click to choose"}
      </p>

      {/* Button */}
      {!isDragOver && !isUploading && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
          className="mt-1 bg-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/90 text-white font-semibold text-xs shadow-md shadow-[var(--theme-primary)]/20 transition-all rounded-md px-3 h-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)]"
        >
          Choose File
        </button>
      )}

      <span className="text-xs text-text-primary/55 mt-0.5">Image (4MB max)</span>
    </div>
  );
}

export default function RegisterForm() {
  const { isDark } = useSelector((state) => state.theme);

  const router = useRouter();

  const sp = useSearchParams();

  const redirectTo = sp?.get("redirect") || "/";

  const [form, setForm] = useState({
    fullName: "",
    profileImage: null,
    profileImageUrl: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "reader",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isUploading, setIsUploading] = useState(false);

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

    // Require profile image upload
    if (!form.profileImageUrl) {
      newErrors.profileImage = "Profile image is required.";
    }

    return newErrors;
  }

  async function handleGoogleSignUp() {
    try {
      await googleSignIn();
      // AuthInitializer will automatically sync the session to Redux
      // No need to manually handle redirect - better-auth handles it
    } catch (error) {
      console.error('Google sign-up failed:', error);
      setErrors({ form: error?.message || "Google sign-up failed" });
    }
  }

  async function handleSubmit(e) {

    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log("Successfully validated and submitted:", form);

    // submit logic here
    const { fullName, email, profileImageUrl, password, role } = form;

    const { data, error: authError } = await authClient.signUp.email({
      name: fullName,
      email,
      password,
      image: profileImageUrl,
      role,
    });

    if (data) {
      console.log("submitted data:", data);
      setErrors({});
      await authClient.signOut();
      // console.log('register success, user: ', data)
      router.push(redirectTo);
    }

    if (authError) {
      setErrors(authError);
    }

  }

  // Consistent input wrapper styling using theme variables to support dark/light modes
  const inputClass = "w-full h-11 pl-10 pr-4 rounded-lg bg-text-primary/5 border border-text-primary/15 text-text-primary placeholder-text-primary/45 text-sm focus:outline-none focus:border-[var(--theme-primary)] focus:ring-1 focus:ring-[var(--theme-primary)] focus-visible:outline-2 focus-visible:outline-[var(--theme-primary)] transition-all duration-300";
  const passwordInputClass = "w-full h-11 pl-10 pr-10 rounded-lg bg-text-primary/5 border border-text-primary/15 text-text-primary placeholder-text-primary/45 text-sm focus:outline-none focus:border-[var(--theme-primary)] focus:ring-1 focus:ring-[var(--theme-primary)] focus-visible:outline-2 focus-visible:outline-[var(--theme-primary)] transition-all duration-300";

  return (
    <div className={`flex-1 flex items-center justify-center px-4 py-12 transition-colors duration-300 bg-background`}>
      {/* Decorative Blur Background (styled from theme) */}
      <div className="absolute -z-10 h-[380px] w-[380px] rounded-full bg-[var(--theme-primary)]/10 blur-[90px] pointer-events-none" />

      {/* Main Form Container Card with standard dark-gradient theme architecture */}
      <div className={`w-full max-w-[780px] rounded-2xl border px-6 py-8 tablet:px-8 shadow-xl transition-all duration-300 ${isDark
          ? 'bg-gradient-to-b from-[#111836] to-[#0b0f24] border-white/5'
          : 'bg-foreground border-black/5'
        }`}>

        {/* Header — full width */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Create your account</h1>
          <p className="mt-1.5 text-sm text-text-primary/70">
            Join{" "}
            <span className="text-[var(--theme-primary)] font-semibold">BookVerse</span>
            {" "}— your reading &amp; writing community
          </p>
        </div>

        {/* Google OAuth — full width */}
        <Button
          type="button"
          variant="bordered"
          fullWidth
          className="w-full flex items-center justify-center gap-2.5 border border-text-primary/10 bg-text-primary/5 text-text-primary/80 hover:text-text-primary hover:bg-text-primary/10 font-semibold h-11 rounded-lg focus-visible:outline-2 focus-visible:outline-[var(--theme-primary)] transition-all duration-200 cursor-pointer"
          onClick={handleGoogleSignUp}
        >
          <FcGoogle size={20} />
          <span>Continue with Google</span>
        </Button>

        {/* Divider — full width */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-[1px] bg-text-primary/5" />
          <span className="text-xs font-semibold text-text-primary/40 uppercase tracking-widest">
            or
          </span>
          <div className="flex-1 h-[1px] bg-text-primary/5" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

          {/* Form Level Error */}
          {errors.form && (
            <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-3.5 py-2.5">
              <span className="text-rose-400 text-sm font-medium">{errors.form}</span>
            </div>
          )}

          {/* Row 1: Full Name | Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField isInvalid={!!errors.fullName} className="flex flex-col gap-1.5">
              <Label className="text-text-primary/90 text-sm font-medium">Full Name</Label>
              <div className="relative flex items-center">
                <Person className="absolute left-3.5 text-text-primary/40 shrink-0" width={16} height={16} />
                <Input
                  placeholder="Jane Doe"
                  value={form.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  className={inputClass}
                />
              </div>
              {errors.fullName && <span className="text-rose-400 text-xs mt-0.5 font-medium">{errors.fullName}</span>}
            </TextField>

            <TextField isInvalid={!!errors.email} className="flex flex-col gap-1.5">
              <Label className="text-text-primary/90 text-sm font-medium">Email Address</Label>
              <div className="relative flex items-center">
                <Envelope className="absolute left-3.5 text-text-primary/40 shrink-0" width={16} height={16} />
                <Input
                  type="email"
                  placeholder="name@domain.com"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={inputClass}
                />
              </div>
              {errors.email && <span className="text-rose-400 text-xs mt-0.5 font-medium">{errors.email}</span>}
            </TextField>
          </div>

          {/* Row 2: Password | Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Password */}
            <TextField isInvalid={!!errors.password} className="flex flex-col gap-1.5">
              <Label className="text-text-primary/90 text-sm font-medium">Password</Label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 text-text-primary/40 shrink-0" width={16} height={16} />
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
                  className="absolute right-3 text-text-primary/40 hover:text-text-primary transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-[var(--theme-primary)] cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeSlash width={18} height={18} /> : <Eye width={18} height={18} />}
                </button>
              </div>
              {errors.password && <span className="text-rose-400 text-xs mt-0.5 font-medium">{errors.password}</span>}
            </TextField>

            {/* Confirm Password */}
            <TextField isInvalid={!!errors.confirmPassword} className="flex flex-col gap-1.5">
              <Label className="text-text-primary/90 text-sm font-medium">Confirm Password</Label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 text-text-primary/40 shrink-0" width={16} height={16} />
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
                  className="absolute right-3 text-text-primary/40 hover:text-text-primary transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-[var(--theme-primary)] cursor-pointer"
                  aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                >
                  {showConfirmPassword ? <EyeSlash width={18} height={18} /> : <Eye width={18} height={18} />}
                </button>
              </div>
              {errors.confirmPassword && <span className="text-rose-400 text-xs mt-0.5 font-medium">{errors.confirmPassword}</span>}
            </TextField>
          </div>

          {/* Password strength checker — full width, below both password fields */}
          {form.password.length > 0 && (
            <div className={`flex flex-col sm:flex-row sm:items-center sm:gap-6 gap-1.5 rounded-md border px-4 py-3 transition-all duration-300 ${allRulesPassed
              ? "border-emerald-500/30 bg-emerald-500/5"
              : "border-text-primary/10 bg-text-primary/[0.03]"
              }`}>
              {allRulesPassed ? (
                <div className="flex items-center gap-2">
                  <CircleCheckFill className="text-emerald-500 shrink-0" width={16} height={16} />
                  <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Password looks great!</span>
                </div>
              ) : (
                <>
                  <RuleRow label="At least 6 characters" passed={rules.minLength} />
                  <RuleRow label="One uppercase (A–Z)" passed={rules.hasUppercase} />
                  <RuleRow label="One lowercase (a–z)" passed={rules.hasLowercase} />
                </>
              )}
            </div>
          )}

          {/* Row 3: Profile Image — full width */}
          <div className="flex flex-col gap-1.5">
            <label className="text-text-primary/90 text-sm font-medium">Profile Image</label>
            {!form.profileImageUrl ? (
              <ProfileImageUploader
                onUploadComplete={(res) => {
                  setForm((prev) => ({ ...prev, profileImageUrl: res[0].url, profileImage: res[0] }));
                  // clear profile image error if present
                  setErrors((prev) => ({ ...prev, profileImage: null }));
                  setIsUploading(false);
                }}
                onUploadError={(error) => {
                  setErrors((prev) => ({ ...prev, profileImage: `Upload failed: ${error.message}` }));
                  setIsUploading(false);
                }}
                onUploadBegin={() => setIsUploading(true)}
              />
            ) : (
              <div className="border border-emerald-500/20 bg-emerald-500/5 rounded-md p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <CircleCheck className="text-emerald-500 shrink-0 w-5 h-5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-text-primary text-sm font-medium truncate">
                      {form.profileImage?.name || "Image uploaded"}
                    </p>
                    <p className="text-text-primary/50 text-xs">
                      {form.profileImage?.size ? (form.profileImage.size / 1024).toFixed(2) + " KB" : "Successfully uploaded"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setForm((prev) => ({ ...prev, profileImageUrl: "", profileImage: null }));
                    if (errors.profileImage) setErrors((prev) => ({ ...prev, profileImage: null }));
                  }}
                  className="text-[var(--theme-primary)] hover:text-text-primary text-sm font-medium transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-[var(--theme-primary)] cursor-pointer"
                >
                  Clear
                </button>
              </div>
            )}
            {errors.profileImage && <span className="text-rose-400 text-xs mt-0.5 font-medium">{errors.profileImage}</span>}
          </div>

          {/* Row 4: I'm a — icon cards */}
          <div className="flex flex-col gap-2">
            <span className="text-text-primary/90 text-sm font-medium">I&apos;m a</span>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "reader", label: "Reader", Icon: LiaBookReaderSolid },
                { value: "writer", label: "Writer", Icon: FaRegPenToSquare },
              ].map(({ value, label, Icon }) => {
                const isSelected = form.role === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleChange("role", value)}
                    className={`flex flex-col items-center justify-center gap-2.5 h-20 w-full rounded-xl border-2 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)]/50 cursor-pointer
                      ${isSelected
                        ? "border-[var(--theme-primary)] bg-[var(--theme-primary)]/8 text-[var(--theme-primary)] shadow-md shadow-[var(--theme-primary)]/10"
                        : "border-text-primary/15 bg-text-primary/[0.03] text-text-primary/60 hover:border-[var(--theme-primary)]/40 hover:bg-[var(--theme-primary)]/5 hover:text-[var(--theme-primary)]/80"
                      }`}
                  >
                    <Icon size={22} strokeWidth={isSelected ? 2.5 : 1.8} />
                    <span className="text-sm font-semibold tracking-wide">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit — full width, gradient button matching LogInForm */}
          <Button
            id="register-submit"
            type="submit"
            fullWidth
            className="mt-2 w-full h-11 bg-gradient-to-r from-[var(--theme-secondary-purple)] to-[var(--theme-primary)] hover:opacity-90 text-white font-bold text-sm shadow-lg shadow-[var(--theme-primary)]/20 transition-all duration-300 cursor-pointer rounded-lg focus-visible:outline-2 focus-visible:outline-[var(--theme-primary)]"
          >
            Create Account
          </Button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-text-primary/70">
          Have an account?{" "}
          <Link
            href={`/auth/log-in`}
            className="ml-1 text-[var(--theme-primary)] hover:text-text-primary font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[var(--theme-primary)]"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
