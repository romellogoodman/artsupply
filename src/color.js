export const getHSLColor = (step) => {
  return `hsl(${step % 360}, 100%, 50%)`;
};

// Replace all the colors in the list with white except for the index layer.
export const isolateColorLayer = (list, index) => {
  const colors = new Array(list.length).fill(null).map(() => '#ffffff');

  colors[index] = list[index];

  return colors;
};

const basicPalette = (colors) => {
  const primaryColor = colors[0];
  const secondaryColor = colors[1];

  return [primaryColor, secondaryColor];
};

const alternatingPalette = (colors, index) => {
  const primaryColor = index % 2 === 0 ? colors[0] : colors[1];
  const secondaryColor = index % 2 === 0 ? colors[1] : colors[0];

  return [primaryColor, secondaryColor];
};

export const palettes = {
  alt: alternatingPalette,
  basic: basicPalette
};

export const getPaletteColor = {
  alt: (colors, index) => palettes.alt(colors)[index % 2],
  basic: (colors, index) => {
    return colors[index % colors.length];
  }
};

export const hexToHSL = (H, asObject) => {
  // Convert hex to RGB first
  let r = 0,
    g = 0,
    b = 0;
  if (H.length == 4) {
    r = '0x' + H[1] + H[1];
    g = '0x' + H[2] + H[2];
    b = '0x' + H[3] + H[3];
  } else if (H.length == 7) {
    r = '0x' + H[1] + H[2];
    g = '0x' + H[3] + H[4];
    b = '0x' + H[5] + H[6];
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  if (asObject) {
    return { h, s, l };
  }

  return 'hsl(' + h + ',' + s + '%,' + l + '%)';
};

export const hslToHex = (h, s, l) => {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0'); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

/**
 * Taken From: https://georgefrancis.dev/snacks/color-modulation/
 */
export const modulateColorHSL = (
  baseColor,
  hRange = 8,
  sRange = 8,
  lRange = 8,
  asObject = false
) => {
  // pick a random number in a given range
  const random = (min, max) => Math.random() * (max - min) + min;
  const color = {
    // add or subtract a random amount to each color property
    h: baseColor.h + random(-hRange, hRange),
    s: baseColor.s + random(-sRange, sRange),
    l: baseColor.l + random(-lRange, lRange)
  };

  return asObject ? color : `hsl(${color.h}, ${color.s}%, ${color.l}%)`;
};

export const modulateColorHex = (color) => {
  const hslColor = hexToHSL(color, true);
  const modulatedColor = modulateColorHSL(hslColor, 8, 8, 8, true);
  const hexColor = hslToHex(modulatedColor.h, modulatedColor.s, modulatedColor.l);

  return hexColor;
};
