'use client';

import ErrorFallback from "@/components/error-handling/ErrorFallback";


export default function Error({ error, reset }) {
    return <ErrorFallback error={error} resetErrorBoundary={reset} />;
}
