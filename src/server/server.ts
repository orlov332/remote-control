import { createWebSocketStream, WebSocketServer } from 'ws';
import { processCommand } from '../controller/controller';

export function startServer(port: number) {
  const wss = new WebSocketServer({ port }, () => {
    console.log(`Start Web Socket server on port: ${port}`);
  });

  wss.on('connection', async (ws) => {
    const wsStream = createWebSocketStream(ws, { encoding: 'utf8' });
    ws.on('error', (e) => console.error('Server error: ', e));

    await processCommand(wsStream, wsStream);
  });
}
