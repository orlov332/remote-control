import { getMousePos, moveMouse } from 'robotjs';

const mouseService = {
  goRight: (step: number) => {
    const { x, y } = getMousePos();
    moveMouse(x + step, y);
  },

  goLeft: (step: number) => {
    const { x, y } = getMousePos();
    moveMouse(x - step, y);
  },

  goDown: (step: number) => {
    const { x, y } = getMousePos();
    moveMouse(x, y + step);
  },

  getPosition: () => getMousePos(),

  goUp: (step: number) => {
    const { x, y } = getMousePos();
    moveMouse(x, y - step);
  },
};

export default mouseService;
