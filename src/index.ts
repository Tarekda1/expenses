if (!process.env.ALREADY_SET) { require('dotenv').config(); }

import * as http from 'http';
import { app } from './app';
import { DatabaseService } from './app/services/databaseService';
import { Logger } from './lib/LoggerImpl';
// Composition root

const logger: any = new Logger();

DatabaseService.getConnection().then(() => {
  const server = http.createServer(app).listen(parseInt(process.env.PORT || '3000', 10));
  server.on('listening', async () => {
    logger.log('info', `App listening on ${JSON.stringify(server.address())}`);
  });
  logger.log('info', `App listening on ${JSON.stringify(server.address())}`);
})

