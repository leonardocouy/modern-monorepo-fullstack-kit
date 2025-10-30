import { eq } from 'drizzle-orm';
import { db } from '../db';
import { user } from '../schemas/auth';

export const updateUserInformationByUserId = async (
  userId: string,
  data: { name?: string; image?: string }
) => {
  await db
    .update(user)
    .set({
      name: data.name,
      image: data.image,
      updatedAt: new Date(),
    })
    .where(eq(user.id, userId));
};
