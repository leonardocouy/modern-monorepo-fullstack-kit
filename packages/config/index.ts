export const config = {
  app: {
    name: process.env.APP_NAME || 'My Life Manager',
    version: process.env.APP_VERSION || '1.0.0',
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  server: {
    port: parseInt(process.env.PORT || '8080', 10),
    host: process.env.HOST || 'localhost',
  },
  frontend: {
    url: process.env.FRONTEND_URL || 'http://localhost:5173',
  },
  database: {
    url: process.env.DATABASE_URL || './dev.db',
  },
} as const;

export type Config = typeof config;
