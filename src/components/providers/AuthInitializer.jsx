'use client';

import { useEffect } from 'react';
import { useSession } from '@/lib/auth-client';

export function AuthInitializer({ children }) {
  // useSession() hook will automatically fetch and manage the session
  // No need to manually dispatch to Redux - better-auth is the source of truth
  const { data: session, isPending } = useSession();

  // Session is automatically managed by better-auth
  // Components can access it via authClient.useSession() hook

  return <>{children}</>;
}
