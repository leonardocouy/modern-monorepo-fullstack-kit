import { createFileRoute } from '@tanstack/react-router';

import { Protected } from '~/modules/auth';

export const Route = createFileRoute('/_protected')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Protected />;
}
