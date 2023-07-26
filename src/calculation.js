export const clamp = (number, min, max) => {
  return number < min ? min : number > max ? max : number;
};

export const map = (number, inMin, inMax, outMin, outMax) => {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

export const polarToCartesian = (x, y, radius, angleInDegrees) => {
  // TODO: Refactor to use toRadians
  // const angleInRadians = toRadians(angleInDegrees);
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: x + radius * Math.cos(angleInRadians),
    y: y + radius * Math.sin(angleInRadians)
  };
};

export const toDegrees = (angle) => {
  return angle * (180 / Math.PI);
};

export const toRadians = (angle) => {
  return angle * (Math.PI / 180);
};
