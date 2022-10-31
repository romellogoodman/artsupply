export const constrain = (n, low, high) => {
  return Math.max(Math.min(n, high), low);
};

/**
 * Map a number from one range to another range
 * https://gist.github.com/xposedbones/75ebaef3c10060a3ee3b246166caab56
 */
export const map = (number, inMin, inMax, outMin, outMax) => {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

export const heightAlongSinWave = (currentIndex, numberOfPoints, height) => {
  const angle = map(currentIndex, 0, numberOfPoints, 0, 360);
  const radians = toRadians(angle);
  const sinAngle = Math.sin(radians);
  const stepHeight = height * sinAngle;

  return stepHeight;
};

/**
 * Polar coordinates explainer:
 * https://en.wikipedia.org/wiki/Polar_coordinate_system
 */
export const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  const angleInRadians = toRadians(angleInDegrees);

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
};

/**
 * Taken From:
 * https://stackoverflow.com/questions/9705123/how-can-i-get-sin-cos-and-tan-to-use-degrees-instead-of-radians
 */
export const toDegrees = (angle) => {
  return angle * (180 / Math.PI);
};

export const toRadians = (angle) => {
  return angle * (Math.PI / 180);
};
