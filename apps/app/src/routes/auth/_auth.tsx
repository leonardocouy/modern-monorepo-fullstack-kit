import { createFileRoute } from '@tanstack/react-router';

import { AuthLayout } from '~/modules/auth';

export const Route = createFileRoute('/auth/_auth')({
  component: LayoutComponent,
});

function LayoutComponent() {
  return <AuthLayout />;
}
