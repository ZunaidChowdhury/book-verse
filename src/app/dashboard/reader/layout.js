import { requireRole } from '@/lib/core/session';
import React from 'react';

const ReaderLayout = async({children}) => {
    await requireRole('reader');
    return children;
};

export default ReaderLayout;