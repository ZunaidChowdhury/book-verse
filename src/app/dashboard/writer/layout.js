import { requireRole } from '@/lib/core/session';
import React from 'react'

const WriterLayout = async ({ children }) => {
    await requireRole('writer')
    return children;
}

export default WriterLayout