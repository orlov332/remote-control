import { getMousePos, screen } from 'robotjs';
import Jimp from 'jimp';

const printScreenService = {
  captureSquare: async (position = getMousePos(), size = 200) => {
    const { x, y } = position;
    const sx = x - size / 2;
    const sy = y - size / 2;
    const img = screen.capture(sx < 0 ? 0 : sx, sy < 0 ? 0 : sy, size, size);
    const data = [];
    const bitmap = img.image;
    for (let i = 0; i < bitmap.length; i += 4) {
      data.push(bitmap[i + 2], bitmap[i + 1], bitmap[i], bitmap[i + 3]);
    }

    return new Jimp({
      data: new Uint8Array(data),
      width: img.width,
      height: img.height,
    })
      .getBase64Async(Jimp.MIME_PNG)
      .then((buf) => buf.replace('data:image/png;base64,', ''));
  },
};

export default printScreenService;
