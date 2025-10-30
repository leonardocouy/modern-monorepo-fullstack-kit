import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: ['./src/schemas/*.ts'],
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DATABASE_URL || './dev.db',
  },
});
