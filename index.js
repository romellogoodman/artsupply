/**
 * Constrains a number to be within a minimum and maximum range.
 * @param {number} number - The number to clamp
 * @param {number} min - The minimum value of the range
 * @param {number} max - The maximum value of the range
 * @returns {number} The clamped value between min and max
 */
const clamp = (number, min, max) => {
  return number < min ? min : number > max ? max : number;
};

/**
 * Maps a number from one range to another range.
 * @param {number} number - The number to map
 * @param {number} inMin - The minimum value of the input range
 * @param {number} inMax - The maximum value of the input range
 * @param {number} outMin - The minimum value of the output range
 * @param {number} outMax - The maximum value of the output range
 * @returns {number} The mapped value in the output range
 */
const map = (number, inMin, inMax, outMin, outMax) => {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

/**
 * Performs linear interpolation between two values.
 * @param {number} percent - The interpolation percentage (0-1)
 * @param {number} start - The starting value
 * @param {number} end - The ending value
 * @returns {number} The interpolated value
 */
const lerp = (percent, start, end) => {
  return start + percent * (end - start);
};

/**
 * Converts polar coordinates to Cartesian coordinates.
 * @param {number} x - The x-coordinate of the center point
 * @param {number} y - The y-coordinate of the center point
 * @param {number} radius - The radius from the center point
 * @param {number} angleInDegrees - The angle in degrees
 * @returns {{x: number, y: number}} An object containing the Cartesian coordinates
 */
const polarToCartesian = (x, y, radius, angleInDegrees) => {
  const angleInRadians = toRadians(angleInDegrees);

  return {
    x: x + radius * Math.cos(angleInRadians),
    y: y + radius * Math.sin(angleInRadians),
  };
};

/**
 * Converts an angle from radians to degrees.
 * @param {number} angle - The angle in radians
 * @returns {number} The angle in degrees
 */
const toDegrees = (angle) => {
  return angle * (180 / Math.PI);
};

/**
 * Converts an angle from degrees to radians.
 * @param {number} angle - The angle in degrees
 * @returns {number} The angle in radians
 */
const toRadians = (angle) => {
  return angle * (Math.PI / 180);
};

/**
 * Executes a callback function a specified number of times.
 * @param {number} number - The number of times to execute the callback
 * @param {function(number): void} callback - The function to execute, receives the current index as an argument
 */
const times = (number, callback) => {
  for (let index = 0; index < number; index++) {
    callback(index);
  }
};

/**
 * Creates a grid and executes a callback for each cell in the grid.
 * @param {Object} config - The grid configuration object
 * @param {number} [config.grid] - The size for both width and height of the grid
 * @param {number} [config.columns=config.grid] - The number of columns in the grid
 * @param {number} [config.rows=config.grid] - The number of rows in the grid
 * @param {number} [config.size] - The size for both width and height
 * @param {number} [config.height=config.size] - The total height of the grid
 * @param {number} [config.width=config.size] - The total width of the grid
 * @param {function({ columnIndex: number, rowIndex: number, loopIndex: number, x: number, y: number, height: number, width: number }): void} callback - Function to execute for each grid cell
 */
const grid = (
  {
    grid: gridSize,
    columns = gridSize,
    rows = gridSize,
    size,
    height = size,
    width = size,
  },
  callback
) => {
  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
      const loopIndex = columnIndex + rowIndex * rows;
      const x = map(columnIndex, 0, columns, 0, width);
      const y = map(rowIndex, 0, rows, 0, height);
      const itemHeight = height / rows;
      const itemWidth = width / columns;

      callback({
        columnIndex,
        rowIndex,
        loopIndex,
        x,
        y,
        height: itemHeight,
        width: itemWidth,
      });
    }
  }
};
