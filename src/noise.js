/**
 * Generally speaking:
 *
 * `frequency` controls how quickly or slowly the noise function is "evolving over time". A low frequency would produce values that are very close to each other for close values of `x`, while a high frequency would have more volatility, and probably look more similar to the random function.
 *
 * `amplitude` controls the range of values we get from the noise function. `Random.noise1D` will return numbers between `-amplitude` and `amplitude`. This is very similar to the parameters of `Random.range(minValue, maxValue)`, but compressed in a single parameter.
 */
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

export const noise4D = (x, y, z, w, frequency, amplitude) => {
  const noise = createNoise4D();

  return noise(x * frequency, y * frequency, z * frequency, w * frequency) * amplitude;
};

/**
 * Taken from: https://cmaher.github.io/posts/working-with-simplex-noise/
 */
export const octive2D = (numberOfOctives, x, y, persistence, scale, low, high) => {
  let maxAmp = 0;
  let amp = 1;
  let freq = scale;
  let noise = 0;

  // add successively smaller, higher-frequency terms
  for (let i = 0; i < numberOfOctives; ++i) {
    noise += noise2D(x * freq, y * freq) * amp;
    maxAmp += amp;
    amp *= persistence;
    freq *= 2;
  }

  // take the average value of the iterations
  noise /= maxAmp;

  // normalize the result
  noise = (noise * (high - low)) / 2 + (high + low) / 2;

  return noise;
};
