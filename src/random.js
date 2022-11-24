import { MersenneTwister19937, Random } from 'random-js';

export const getRandom = (randomSeed) => {
  const seed = randomSeed || MersenneTwister19937.autoSeed();

  return new Random(seed);
};

export const getRandomWithSeed = (randomSeed) => {
  const seed = randomSeed || MersenneTwister19937.autoSeed();

  return { random: new Random(seed), seed };
};

/**
 * Taken From:
 * https://github.com/georgedoescode/generative-utils/blob/master/src/randomBias.js
 */
export const randomBias = (min, max, bias, influence = 0.5) => {
  const random = getRandom();
  const base = random.integer(min, max);
  const mix = random.integer(0, 1) * influence;

  return base * (1 - mix) + bias * mix;
};
