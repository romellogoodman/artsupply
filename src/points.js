import { getRandom } from './random';

const random = getRandom();

// TODO: I think this assumes a list strucure of [x1, y1, x2, y2, xETC, yETC]
export const toPoints = (list) => {
  return list.reduce((result, item, index) => {
    const isPointX = index % 2 === 0;

    if (isPointX) {
      result += item;
    } else {
      result += `,${item} `;
    }

    return result;
  }, '');
};

export const distanceBetweenTwoPoints = (point1, point2) => {
  const distance = Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));

  return distance;
};

/**
 * Taken from:
 * https://tympanus.net/codrops/2021/06/04/trigonometry-in-css-and-javascript-beyond-triangles
 */
export const getPolygonPoints = ({
  x: xPosition,
  y: yPosition,
  size,
  numberOfPoints = 360,
  radius = size
} = {}) => {
  const angleStep = (Math.PI * 2) / numberOfPoints;
  const points = [];

  for (let i = 1; i <= numberOfPoints; i++) {
    const radiusAtPoint = i % 2 === 0 ? radius : size;
    const x = xPosition + Math.cos(i * angleStep) * radiusAtPoint;
    const y = yPosition + Math.sin(i * angleStep) * radiusAtPoint;

    points.push({ x, y });
  }

  return points;
};

export const getAngleOfPolygonPoints = ({
  x: xPosition,
  y: yPosition,
  size,
  numberOfPoints = 360,
  beginAngle = 0,
  endAngle = 360
} = {}) => {
  const points = getPolygonPoints({
    x: xPosition,
    y: yPosition,
    size,
    numberOfPoints
  });

  if (beginAngle > endAngle) {
    return [].concat(points.slice(beginAngle)).concat(points.slice(0, endAngle));
  }

  return points.slice(beginAngle, endAngle);
};

export const getRandomPoints = (numberOfPoints, width, height) => {
  return [...Array(numberOfPoints)].map(() => {
    return {
      x: random.integer(0, width),
      y: random.integer(0, height)
    };
  });
};

/**
 * Taken from:
 * https://github.com/d3/d3-polygon/blob/main/src/centroid.js
 */
export const centroidOfPoints = (points) => {
  var i = -1,
    n = points.length,
    x = 0,
    y = 0,
    a,
    b = points[n - 1],
    c,
    k = 0;

  while (++i < n) {
    a = b;
    b = points[i];
    k += c = a[0] * b[1] - b[0] * a[1];
    x += (a[0] + b[0]) * c;
    y += (a[1] + b[1]) * c;
  }

  return (k *= 3), [x / k, y / k];
};

/**
 * Taken From: https://github.com/georgedoescode/generative-utils/blob/master/src/distToSegment.js
 * - dist2
 * - distanceToSegmentSquared
 * - distanceToSegment
 *
 * Credit Matt DesLauriers: https://gist.github.com/mattdesl/47412d930dcd8cd765c871a65532ffac
 * Taken From: https://stackoverflow.com/questions/849211/shortest-distance-between-a-point-and-a-line-segment
 *
 * NOTE: These functions are mostly used in common/voronoi.
 * In the future refactor them to use distanceBetweenTwoPoints and be more composable
 */

export const dist2 = (point1, point2) => {
  return Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2);
};

const distanceToSegmentSquared = (point, startPoint, endPoint) => {
  var l2 = dist2(startPoint, endPoint);
  if (l2 === 0) return dist2(point, startPoint);

  var t =
    ((point[0] - startPoint[0]) * (endPoint[0] - startPoint[0]) +
      (point[1] - startPoint[1]) * (endPoint[1] - startPoint[1])) /
    l2;
  t = Math.max(0, Math.min(1, t));

  return dist2(point, [
    startPoint[0] + t * (endPoint[0] - startPoint[0]),
    startPoint[1] + t * (endPoint[1] - startPoint[1])
  ]);
};

export const distanceToSegment = (point, startPoint, endPoint) => {
  return Math.sqrt(distanceToSegmentSquared(point, startPoint, endPoint));
};

/**
 * Generate a smooth continuous curve based on the points, using bezier curves.
 * spline() will return an svg path-data string. The arguments are (points, tension, close).
 * Play with tension and check out the effect!
 * https://github.com/georgedoescode/splinejs/blob/main/spline.js
 */
export const spline = (points = [], tension = 1, close = false, callback) => {
  function formatPoints(points, close) {
    points = [...points];
    // so that coords can be passed as objects or arrays
    if (!Array.isArray(points[0])) {
      points = points.map(({ x, y }) => [x, y]);
    }

    if (close) {
      const lastPoint = points[points.length - 1];
      const secondToLastPoint = points[points.length - 2];

      const firstPoint = points[0];
      const secondPoint = points[1];

      points.unshift(lastPoint);
      points.unshift(secondToLastPoint);

      points.push(firstPoint);
      points.push(secondPoint);
    }

    return points.flat();
  }

  points = formatPoints(points, close);

  const size = points.length;
  const last = size - 4;

  const startPointX = close ? points[2] : points[0];
  const startPointY = close ? points[3] : points[1];

  let path = 'M' + [startPointX, startPointY];

  if (callback) {
    callback('MOVE', [startPointX, startPointY]);
  }

  const startIteration = close ? 2 : 0;
  const maxIteration = close ? size - 4 : size - 2;
  const inc = 2;

  for (let i = startIteration; i < maxIteration; i += inc) {
    const x0 = i ? points[i - 2] : points[0];
    const y0 = i ? points[i - 1] : points[1];

    const x1 = points[i + 0];
    const y1 = points[i + 1];

    const x2 = points[i + 2];
    const y2 = points[i + 3];

    const x3 = i !== last ? points[i + 4] : x2;
    const y3 = i !== last ? points[i + 5] : y2;

    const cp1x = x1 + ((x2 - x0) / 6) * tension;
    const cp1y = y1 + ((y2 - y0) / 6) * tension;

    const cp2x = x2 - ((x3 - x1) / 6) * tension;
    const cp2y = y2 - ((y3 - y1) / 6) * tension;

    path += 'C' + [cp1x, cp1y, cp2x, cp2y, x2, y2];

    if (callback) {
      callback('CURVE', [cp1x, cp1y, cp2x, cp2y, x2, y2]);
    }
  }

  return path;
};

export const getSprialPoints = (xPosition, yPosition, numberOfPoints = 360, rotation) => {
  /* 6 rotations of the spiral divided by number of points */
  const angleStep = (Math.PI * 12) / numberOfPoints;

  const points = [];

  for (let i = 1; i <= numberOfPoints; i++) {
    // const r = Math.pow(i, 1.3);
    const r = Math.pow(i, 0.95);
    const x = xPosition + Math.cos(i * angleStep + rotation) * r;
    const y = yPosition + Math.sin(i * angleStep + rotation) * r;

    points.push({ x, y, r });
  }

  return points;
};
