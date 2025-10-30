import { createAuthClient } from 'better-auth/react';
import { adminClient } from 'better-auth/client/plugins';
import { config } from '@starter/config';

export const authClient = createAuthClient({
  baseURL: config.backend.url,
  plugins: [adminClient()],
});
