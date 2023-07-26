import { createNoise2D, createNoise3D, createNoise4D } from 'simplex-noise';

export const noise1D = (x, frequency, amplitude) => {
  const noise = createNoise2D();

  return noise(x * frequency, 0) * amplitude;
};

export const noise2D = (x, y, frequency, amplitude) => {
  const noise = createNoise2D();

  return noise(x * frequency, y * frequency) * amplitude;
};

export const noise3D = (x, y, z, frequency, amplitude) => {
  const noise = createNoise3D();

  return noise(x * frequency, y * frequency, z * frequency) * amplitude;
};

export const noise4D = (x, y, z, time, frequency, amplitude) => {
  const noise = createNoise4D();

  return noise(x * frequency, y * frequency, z * frequency, time * frequency) * amplitude;
};
