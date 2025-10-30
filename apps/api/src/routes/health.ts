import { config } from '@starter/config';
import { Router, type Request, type Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    app: config.app.name,
    version: config.app.version,
    environment: config.app.nodeEnv,
  });
});

export { router as healthRouter };
