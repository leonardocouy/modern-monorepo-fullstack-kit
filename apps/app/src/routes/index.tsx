import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          My Life Manager
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          A modular application to manage various aspects of your life.
        </p>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Available Apps</h2>

          <div className="grid gap-4">
            <Link
              to="/finance"
              className="block p-6 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
            >
              <h3 className="text-xl font-semibold text-blue-900 mb-2">
                Finance
              </h3>
              <p className="text-blue-700">
                Manage your personal finances, track expenses, and monitor budgets.
              </p>
            </Link>

            <div className="p-6 bg-gray-100 rounded-lg border border-gray-200 opacity-50">
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                More apps coming soon...
              </h3>
              <p className="text-gray-500">
                This monorepo is designed to grow with your needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
