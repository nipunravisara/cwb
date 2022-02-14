import { Express } from 'express';
import authentication from './authentication';

function routes(app: Express): void {
  app.use('/api/auth', authentication);
}

export default routes;
