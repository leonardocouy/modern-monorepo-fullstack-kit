import { Outlet, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

import { useSession } from '../hooks/useAuth';

export const AuthLayout = () => {
  const navigate = useNavigate();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    // Redirect to home if already authenticated
    if (!isPending && session) {
      void navigate({ to: '/' });
    }
  }, [isPending, session, navigate]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Outlet />
    </div>
  );
};
