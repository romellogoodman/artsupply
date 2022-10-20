// Replace all the colors in the list with white except for the index layer.
export const isolateColorLayer = (list, index) => {
  const colors = new Array(list.length).fill(null).map(() => '#ffffff');

  colors[index] = list[index];

  return colors;
};

export const getHSLColor = (step) => {
  return `hsl(${step % 360}, 100%, 50%)`;
};
