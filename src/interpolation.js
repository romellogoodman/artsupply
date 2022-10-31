import { map } from './calculation';

export const lerp = (a, b, percent) => {
  return a * (1 - percent) + b * percent;
};

/**
 * Taken from https://gist.github.com/rosszurowski/67f04465c424a9bc0dae
 * A linear interpolator for hexadecimal colors
 *
 * @param {String} colorA
 * @param {String} colorB
 * @param {Number} amount
 * @returns {String}
 */
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

export const lerpColorMulti = (colors, currentStep, totalSteps) => {
  // TODO: THis was throwing an initialization error when not in scope for some reason
  const _lerpColor = (colorA, colorB, amount) => {
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

  const bands = colors.reduce((result, color, index) => {
    const nextColor = colors[index + 1];

    if (nextColor) {
      result.push([color, nextColor]);
    }

    return result;
  }, []);

  const stepsPerBand = totalSteps / bands.length;
  const curretBandIndex = Math.floor(currentStep / stepsPerBand);
  const curretBand = bands[curretBandIndex];
  const percentThroughBand = (currentStep % stepsPerBand) / stepsPerBand;
  const lerpColor = _lerpColor(curretBand[0], curretBand[1], percentThroughBand);

  return lerpColor;
};

export const linearInterpolation = ({ from, times = 10, to } = {}) => {
  const values = new Array(times).fill(null).map((index) => {
    const input = {};

    input.index = index;

    Object.entries(from).forEach(([key, fromValue]) => {
      const toValue = to[key];

      if (fromValue !== undefined && toValue !== undefined) {
        input[key] = map(index, 0, times - 1, fromValue, toValue);
      }
    });

    return input;
  });

  return values;
};
