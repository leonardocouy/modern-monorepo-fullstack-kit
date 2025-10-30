import { type Request } from 'express';
import { betterAuth } from 'better-auth';
import { fromNodeHeaders, toNodeHandler } from 'better-auth/node';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin } from 'better-auth/plugins';
import { db, verification, account, session, user } from '@starter/db';
import { config } from '@starter/config';
import { AppError } from '@starter/validator';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'sqlite',
    schema: {
      verification,
      account,
      session,
      user,
    },
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    },
  },
  emailVerification: {
    expiresIn: 604_800, // ONE WEEK
    autoSignInAfterVerification: true,
  },
  trustedOrigins: [config.frontend.url],
  appName: config.app.name,
  advanced: {
    cookiePrefix: 'starter_auth',
  },
  plugins: [
    admin({
      defaultRole: 'user',
    }),
  ],
});

interface IUserBetterAuth {
  id: string;
  role?: string | null;
  email: string;
}

export const authHandler = toNodeHandler(auth);

export const authentication = async (
  req: Request,
  plugins: ((user: IUserBetterAuth) => Promise<void> | void)[] = []
) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session || !session.user) {
    throw new AppError(
      'Unauthorized',
      'Please sign in to access the resource',
      401
    );
  }

  if (plugins.length > 0) {
    for (const plugin of plugins) {
      await plugin(session.user);
    }
  }

  return {
    user: session.user,
  };
};
