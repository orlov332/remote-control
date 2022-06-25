import 'dotenv/config';
import { startServer } from './server/server';

startServer(Number(process.env.WS_SERVER_PORT));
