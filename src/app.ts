import 'dotenv/config';
import { startServer } from './server/server';

const wss = startServer(Number(process.env.WS_SERVER_PORT));

process.on('SIGINT', () => {
  console.log('Close Web Socket Server');
  wss.close();
});
