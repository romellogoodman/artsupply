export const fractal = (size, minSize, items = []) => {
  if (size <= minSize) return items;

  const nextStep = size / 2;

  items.push(nextStep);

  return fractal(nextStep, minSize, items);
};

export const subdivision = (
  x,
  y,
  width,
  height,
  subdivisionSize = 0.5,
  subdivisionDirection = false
) => {
  const areaOne = {};
  const areaTwo = {};
  const subdivisionWidth = width * subdivisionSize;
  const subdivisionHeight = height * subdivisionSize;

  // Left & Right
  if (subdivisionDirection) {
    areaOne.x = x;
    areaOne.y = y;
    areaOne.width = subdivisionWidth;
    areaOne.height = height;

    areaTwo.x = x + subdivisionWidth;
    areaTwo.y = y;
    areaTwo.width = width - subdivisionWidth;
    areaTwo.height = height;
  } else {
    // Up & Down
    areaOne.x = x;
    areaOne.y = y;
    areaOne.width = width;
    areaOne.height = subdivisionHeight;

    areaTwo.x = x;
    areaTwo.y = y + subdivisionHeight;
    areaTwo.width = width;
    areaTwo.height = height - subdivisionHeight;
  }

  return [areaOne, areaTwo];
};
