import { Readable, Writable } from 'stream';

export async function processCommand(inputStream: Readable, outputStream: Writable) {
  for await (const input of inputStream) {
    console.log('Input command: ', input);
  }
}
