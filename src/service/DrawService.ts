import { dragMouse, getMousePos, mouseClick, mouseToggle, setMouseDelay } from 'robotjs';

const drawService = {
  circle(radius: number) {
    setMouseDelay(1);
    mouseClick();
    mouseToggle('down');
    const steps = 360;
    const { x: centerX, y: centerY } = getMousePos();
    for (let i = 0; i < steps; i++) {
      const x = centerX + radius * Math.cos(2 * Math.PI * (i / steps));
      const y = centerY + radius * Math.sin(2 * Math.PI * (i / steps));

      dragMouse(x, y);
    }
    mouseToggle('up');
  },

  rectangle(width: number, length: number) {
    const { x, y } = getMousePos();

    setMouseDelay(100);
    mouseClick();
    mouseToggle('down');
    dragMouse(x + width, y);
    dragMouse(x + width, y + length);
    dragMouse(x, y + length);
    dragMouse(x, y);
    mouseToggle('up');
  },

  square(l: number) {
    this.rectangle(l, l);
  },
};

export default drawService;
