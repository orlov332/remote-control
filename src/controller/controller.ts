import { Readable, Writable } from 'stream';
import mouseService from '../service/MouseService';
import drawService from '../service/DrawService';
import printScreenService from '../service/PrintScreenService';

export async function processCommand(inputStream: Readable, outputStream: Writable) {
  for await (const input of inputStream) {
    console.log('Input command: ', input);

    let output = input; // echo by default

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
        const { x, y } = mouseService.getPosition();
        output = `mouse_position ${x},${y}\0`;
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
      case 'prnt_scrn':
        const img = await printScreenService.captureSquare();
        output = `prnt_scrn ${img}\0`;
        break;
      default:
        console.warn(`Unsupported command: ${command}`);
    }

    console.log('Response: ', output);
    Readable.from(output, { encoding: 'utf8' }).pipe(outputStream, { end: false });
  }
}
