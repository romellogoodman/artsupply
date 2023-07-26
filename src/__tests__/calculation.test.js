import { map, toDegrees, toRadians } from '../calculation.js';

test('map', () => {
  expect(map(1, 0, 10, 0, 100)).toEqual(10);
});

test('toDegrees', () => {
  expect(toDegrees(Math.PI)).toEqual(180);
});

test('toRadians', () => {
  expect(toRadians(180)).toEqual(Math.PI);
});
