// components/CssSpinner.js
'use client';

export default function MyCustomSpinner({ text }) {
    return (
        <div className="flex flex-col justify-center items-center h-60">
            <div className="w-12 h-12 border-4 border-t-[#4e67fc] border-gray-200 rounded-full animate-spin"></div>
            {/* Subtle Animated Text */}

            {
                text ? (
                    <span className="mt-6 text-sm font-medium text-gray-400 animate-pulse tracking-widest capitalize">
                        {text}
                    </span>
                ) : (
                    <span className="mt-6 text-sm font-medium text-gray-400 animate-pulse tracking-widest uppercase">
                        Loading
                    </span>
                )
            }

        </div >
    );
}