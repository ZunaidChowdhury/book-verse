'use client';

import { useSession } from '@/lib/auth-client';
import React from 'react'

const WriterDashBoardPage = () => {
    const { data: session, isPending } = useSession();
        const user = session?.user;
  return (
    <div>
        <h2 className="text-4xl">Welcome back, {user?.name}</h2>
        {/* writer dashboard */}
    </div>
  )
}

export default WriterDashBoardPage