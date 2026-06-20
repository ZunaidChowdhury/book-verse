"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { FiArrowRight } from "react-icons/fi";

export default function SectionHeading({
    title,
    subTitle,
    description,
    actionTxtBtn,
    actionProperBtn,
    dark = false,
    classNames = "",
}) {
    const ActionProperBtnIcon = actionProperBtn?.icon;

    return (
        <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-6 ${classNames}`}>

            {/* Left Content Area */}
            <div className="flex flex-col items-start max-w-3xl">
                {subTitle && (
                    <span className="bg-gradient-to-r from-[#9945FF] to-blue-400 bg-clip-text text-transparent text-xs font-bold uppercase tracking-wider mb-2">
                        {subTitle}
                    </span>
                )}

                <h3 className={`text-2xl md:text-4xl font-serif font-bold tracking-tight mb-3 ${dark ? "text-white" : "text-foreground"
                    }`}>
                    {title}
                </h3>

                {description && (
                    <p className={`text-base md:text-lg font-light leading-relaxed ${dark ? "text-slate-400" : "text-foreground/60"
                        }`}>
                        {description}
                    </p>
                )}
            </div>

            {/* Right Interactive Action Group */}
            <div className="flex items-center gap-4 shrink-0">
                {actionTxtBtn && (
                    <Link href={actionTxtBtn.url} className="hidden tablet:inline-block">
                        <Button
                            variant="light"
                            className="bg-transparent hover:bg-foreground/5 text-[var(--theme-primary)] font-semibold text-base transition-all rounded-md group px-3 h-11"
                        >
                            {actionTxtBtn.text}
                            <FiArrowRight className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </Button>
                    </Link>
                )}

                {actionProperBtn && (
                    <Link href={actionProperBtn.url} className="hidden tablet:inline-block">
                        <Button
                            className="bg-gradient-to-r from-theme-secondary-purple via-theme-secondary-purple to-theme-primary hover:opacity-95 text-white font-semibold text-base h-11 px-5 rounded-md shadow-lg shadow-[#9945FF]/10 transition-all duration-300 cursor-pointer"
                        >
                            {ActionProperBtnIcon && <ActionProperBtnIcon className="w-5 h-5 mr-1.5" />}
                            {actionProperBtn.text}
                        </Button>
                    </Link>
                )}
            </div>

        </div>
    );
}
