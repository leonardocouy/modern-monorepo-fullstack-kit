import { createAuthClient } from 'better-auth/react';
import { adminClient } from 'better-auth/client/plugins';

// Use VITE_API_URL from environment
const API_URL = typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL
  ? import.meta.env.VITE_API_URL
  : 'http://localhost:8080';

export const authClient = createAuthClient({
  baseURL: API_URL,
  plugins: [adminClient()],
});
