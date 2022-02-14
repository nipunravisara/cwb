import { Express } from 'express';
import Authentication from './authentication';

function routes(app: Express): void {
  app.use('/api/auth', Authentication);
}

export default routes;
