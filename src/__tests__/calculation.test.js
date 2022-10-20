import { map, pointOfSinWave, polarToCartesian, toDegrees, toRadians } from '../calculation.js';

test('map', () => {
  expect(map(1, 0, 10, 0, 100)).toEqual(10);
});

test('pointOfSinWave', () => {
  expect(pointOfSinWave(20, 360, 100)).toEqual(34.20201433256687);
});

test('polarToCartesian', () => {
  expect(polarToCartesian(200, 200, 200, 90)).toEqual({ x: 200, y: 400 });
});

test('toDegrees', () => {
  expect(toDegrees(Math.PI)).toEqual(180);
});

test('toRadians', () => {
  expect(toRadians(180)).toEqual(Math.PI);
});
