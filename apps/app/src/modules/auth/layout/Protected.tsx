import { Outlet, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

import { useSession } from '../hooks/useAuth';

export const Protected = () => {
  const navigate = useNavigate();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session) {
      void navigate({ to: '/auth/login' });
    }
  }, [isPending, session, navigate]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return session ? <Outlet /> : null;
};
