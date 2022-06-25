import { Readable, Writable } from 'stream';
import mouseService from '../service/MouseService';
import { WebSocket } from 'ws';
import drawService from '../service/DrawService';

export async function processCommand(inputStream: Readable, outputStream: Writable, ws: WebSocket) {
  for await (const input of inputStream) {
    console.log('Input command: ', input);

    const [command, first, second] = input.split(' ');
    switch (command) {
      case 'mouse_up':
        await mouseService.goUp(Number(first));
        break;
      case 'mouse_down':
        await mouseService.goDown(Number(first));
        break;
      case 'mouse_left':
        await mouseService.goLeft(Number(first));
        break;
      case 'mouse_right':
        await mouseService.goRight(Number(first));
        break;
      case 'mouse_position':
        const { x, y } = await mouseService.getPosition();
        // outputStream.write(`mouse_position ${x},${y}\0`);
        // Readable.from(`mouse_position ${x},${y}\0`, { encoding: 'utf8', objectMode: true }).pipe(outputStream);
        ws.send(`mouse_position ${x},${y}\0`);
        break;
      case 'draw_circle':
        drawService.circle(Number(first));
        break;
      case 'draw_rectangle':
        drawService.rectangle(Number(first), Number(second));
        break;
      case 'draw_square':
        drawService.square(Number(first));
        break;
      case '':
        break;
    }
  }
}
