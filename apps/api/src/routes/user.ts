import { Router, type Request, type Response, type NextFunction } from 'express';
import { authentication } from '@starter/auth/server';
import { updateUserInformationByUserId } from '@starter/db';
import { z } from 'zod';

const router = Router();

// Example protected route - update user name
const updateNameSchema = z.object({
  name: z.string().min(2).max(100),
});

router.put(
  '/name',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Authenticate user
      const { user } = await authentication(req);

      // Validate request body
      const { name } = updateNameSchema.parse(req.body);

      // Update user
      await updateUserInformationByUserId(user.id, { name });

      res.json({ success: true, message: 'Name updated successfully' });
    } catch (error) {
      next(error);
    }
  }
);

// Example: Get current user info
router.get('/me', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = await authentication(req);
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

export { router as userRouter };
