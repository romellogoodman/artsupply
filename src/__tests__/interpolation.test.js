import { smoothstep } from '../interpolation.js';

test('smoothstep', () => {
  expect(smoothstep(15, 10, 20)).toEqual(0.5);
});
