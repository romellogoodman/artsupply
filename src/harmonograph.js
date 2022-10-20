/**
 * Taken From: https://github.com/alex-page/harmonograph-xy
 *
 * Around November 2021. MIT LICENSE
 *
 * The harmonograph is a mechanical apparatus that uses pendulums to create a geometric image. This function uses the drawing time, size and pendulums to create X and Y coordinates for a harmonograph.
 *
 * Options
 * drawingTime - number - How long the pendulum swings in seconds
 * size - number - The size of the svg
 * pendulums - object - Two pendulums require four items ( x, y and x, y ). Each X and Y value is an object that contains amplitude, frequency, phase, and damping ( see pendulum options below )
 *
 * Pendulums Object
 * pendulum.amplitude - number - How far a pendulum swings back and forth, must be from `0` - `360` degrees
 * pendulum.frequency - number - How fast a pendulum swings back and forth, for best results use decimal values around `2` and `3`
 * pendulum.phase - number - The rate that a pendulum loses its energy, or slows down, must be from `0` to `π`
 * pendulum.damping - number - The offset from the normal starting position of a pendulum, must be from `0` to `0.01`
 *
 */

/**
 * Rounds a number to three decimal places
 *
 * @param   {number} numberToRound - The number to round
 * @param   {number} maxDecimals   - The maximum number of decimals
 *
 * @returns {number}               - The rounded number
 */
const round = (numberToRound, maxDecimals = 3) =>
  Number(Math.round(numberToRound + 'e' + maxDecimals) + 'e-' + maxDecimals);

/**
 * Get a random number inside a maximum and minimum value
 *
 * @param  {number}  max       - The maximum value
 * @param  {number}  min       - The minimum value
 * @param  {boolean} isRounded - If the number should be rounded
 *
 * @return {number}            - The randomised number
 */
const randomNumber = (max, min, isRounded) => {
  min = min ? min : 0;
  isRounded = isRounded ? isRounded : false;

  const randomNumber = Math.random() * (max - min);

  if (isRounded) {
    return round(randomNumber + min, 0);
  }

  return randomNumber + min;
};

/**
 * Move XY points to start at 0, 0 and make sure they fit in the size
 *
 * @param {object} points - The x and y coordinates
 * @param {number} size   - The size of the harmonograph
 *
 * @return {object}       - The new x and y coordinates
 */
export const adjustXY = (points, size) => {
  const { x, y } = points;
  const minValue = Math.min(...x, ...y);

  const xStartingFromZero = x.map((xValue) => xValue + minValue * -1);
  const yStartingFromZero = y.map((yValue) => yValue + minValue * -1);

  const maxValue = Math.max(...xStartingFromZero, ...yStartingFromZero);
  const scale = size / maxValue;

  const adjustedX = xStartingFromZero.map((xValue) => round(xValue * scale));
  const adjustedY = yStartingFromZero.map((yValue) => round(yValue * scale));

  return {
    x: adjustedX,
    y: adjustedY,
    points: adjustedX.map((x, index) => {
      return [adjustedX[index], adjustedY[index]];
    })
  };
};

/**
 * Create a randomised pendulum swing
 *
 * Resources:
 * - http://www.worldtreesoftware.com/harmonograph-intro.html
 *
 * @return {object} settings            - The settings for the pendulum
 * @return {number} settings.amplitude  - How far a pendulum swings back and forth
 * @return {number} settings.frequency  - How fast a pendulum swings back and forth
 * @return {number} settings.phase      - The rate that a pendulum loses its energy, or slows down
 * @return {number} settings.damping    - The offset from the normal starting position of a pendulum
 */
export const randomPendulums = (numberOfPendulums = 4) => {
  const generatePendulum = () => ({
    amplitude: 200,
    frequency: round(randomNumber(4, 2, true) + randomNumber(0.02, -0.02)),
    phase: round(randomNumber(0, Math.PI)),
    damping: round(randomNumber(0, 0.01))
  });
  const pendulums = [];

  for (let x = 0; x < numberOfPendulums; x++) {
    pendulums.push(generatePendulum());
  }

  return pendulums;
};

/**
 * Draw all the XY points on the harmonograph
 *
 * @param {number} drawingTime - Total time the pendulums swing
 * @param {number} size        - The size of the pendulum
 * @param {object} pendulums    - The pendulum settings, see randomPendulum
 *
 * @returns {object}           - The x and y points
 */
export const generateHarmonograph = (drawingTime, size, pendulums = randomPendulums()) => {
  let i = 0;
  let time = 0;
  const timeIncrement = 0.01;
  const harmonograph = {
    x: [],
    y: [],
    points: []
  };

  // Iterate and draw the harmonograph
  while (i < drawingTime * 60) {
    i++;

    // Calculate the pendulum movement
    const movement = pendulums.map((p) => {
      return p.amplitude * Math.sin(p.frequency * time + p.phase) * Math.exp(-p.damping * time);
    });

    // Apply the movement to x and y coordinates
    const x = movement[0] + movement[1];
    const y = movement[2] + movement[3];

    harmonograph.x.push((x + size) / 2);
    harmonograph.y.push((y + size) / 2);
    harmonograph.points.push([(x + size) / 2, (y + size) / 2]);

    time += timeIncrement;
  }

  const adjustedPoints = adjustXY(harmonograph, size);

  return adjustedPoints;
};
