import { createWebSocketStream, WebSocketServer } from 'ws';
import { processCommand } from '../controller/controller';

export function startServer(port: number) {
  const wss = new WebSocketServer({ port }, () => {
    console.log(`Start Web Socket server on port: ${port}`);
  });

  wss.on('connection', async (ws) => {
    ws.on('error', (e) => console.error('Server error: ', e));
    ws.on('send', (s) => console.log('Server response: ', s));

    const wsStream = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: true });
    await processCommand(wsStream, wsStream, ws);
  });
}
