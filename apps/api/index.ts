import 'dotenv/config';
import { config } from '@starter/config';

import { server } from './src/server';

const { port, host } = config.server;

server.listen(port, () => {
  console.warn(`[${config.app.name}] Server running on http://${host}:${port}`);
  console.warn(`[${config.app.name}] Environment: ${config.app.nodeEnv}`);
});
