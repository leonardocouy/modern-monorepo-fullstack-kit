import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';

import { api } from '~/lib/api';

export const Route = createFileRoute('/finance')({
  component: FinancePage,
});

function FinancePage() {
  const { data: health } = useQuery({
    queryKey: ['health'],
    queryFn: async () => {
      const response = await api.get('/api/health');
      return response.data;
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                ← Home
              </Link>
              <h1 className="text-xl font-bold text-gray-900">Finance</h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Welcome to Finance Manager
          </h2>
          <p className="text-gray-600 mb-4">
            This is a placeholder module to demonstrate the monorepo structure.
            You can expand this to include:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
            <li>Expense tracking</li>
            <li>Budget management</li>
            <li>Financial goals</li>
            <li>Reports and analytics</li>
            <li>Investment tracking</li>
          </ul>

          {health && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded">
              <p className="text-sm text-green-800">
                <strong>API Connection:</strong> Connected successfully
              </p>
              <p className="text-xs text-green-600 mt-1">
                Backend: {health.app} v{health.version} ({health.environment})
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Transactions
            </h3>
            <p className="text-3xl font-bold text-blue-600">-</p>
            <p className="text-sm text-gray-500 mt-1">Coming soon</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Monthly Budget
            </h3>
            <p className="text-3xl font-bold text-green-600">-</p>
            <p className="text-sm text-gray-500 mt-1">Coming soon</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Savings Goal
            </h3>
            <p className="text-3xl font-bold text-purple-600">-</p>
            <p className="text-sm text-gray-500 mt-1">Coming soon</p>
          </div>
        </div>
      </main>
    </div>
  );
}
