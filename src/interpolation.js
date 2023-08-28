import { clamp, map } from './calculation';

export const lerp = (start, end, percent) => {
  return start * (1 - percent) + end * percent;
};

export const lerpColor = (colorA, colorB, amount) => {
  const ah = parseInt(colorA.replace(/#/g, ''), 16);
  const ar = ah >> 16;
  const ag = (ah >> 8) & 0xff;
  const ab = ah & 0xff;
  const bh = parseInt(colorB.replace(/#/g, ''), 16);
  const br = bh >> 16;
  const bg = (bh >> 8) & 0xff;
  const bb = bh & 0xff;
  const rr = ar + amount * (br - ar);
  const rg = ag + amount * (bg - ag);
  const rb = ab + amount * (bb - ab);

  return '#' + (((1 << 24) + (rr << 16) + (rg << 8) + rb) | 0).toString(16).slice(1);
};

export const linearInterpolation = (times, values = {}) => {
  return Object.entries(values, ([key, value], index) => {
    return {
      [key]: map(index, 0, times - 1, value[0], value[1])
    };
  });
};

export const smoothstep = (number, min, max) => {
  const value = clamp((number - min) / (max - min), 0, 1);

  return value * value * (3 - 2 * value);
};
