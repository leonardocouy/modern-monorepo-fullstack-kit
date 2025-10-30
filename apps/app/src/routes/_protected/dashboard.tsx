import { createFileRoute } from '@tanstack/react-router';

import { useSession, useAuthActions } from '~/modules/auth';

export const Route = createFileRoute('/_protected/dashboard')({
  component: ProtectedHome,
});

function ProtectedHome() {
  const { data: session } = useSession();
  const { signOutFn } = useAuthActions();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6">Protected Page</h1>

          {session?.user && (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-md">
                <h2 className="text-xl font-semibold mb-2">User Information</h2>
                <p>
                  <strong>Email:</strong> {session.user.email}
                </p>
                {session.user.name && (
                  <p>
                    <strong>Name:</strong> {session.user.name}
                  </p>
                )}
                {session.user.role && (
                  <p>
                    <strong>Role:</strong> {session.user.role}
                  </p>
                )}
              </div>

              <button
                onClick={() => void signOutFn()}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
