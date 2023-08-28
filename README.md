# artsupply

[![npm version](https://badge.fury.io/js/artsupply.svg)](https://badge.fury.io/js/artsupply)

A utility library for creative coding.

## Usage

### Install

npm

```
npm i artsupply
```

unpkg

```
<script src="https://unpkg.com/artsupply"></script>
```

### Use

```
import _supply from 'artsupply';

const foobar = _supply.functionName()
```

## API

### Calculation

#### clamp

Keep a number within a range of numbers.

- `@param {Number} number` The number to check.
- `@param {Number} min` The min of the range.
- `@param {Number} max` The max of the range.
- `@return {Number}` The number within the range.

#### map

Map a number from one range to another range. The code is derived from: https://gist.github.com/xposedbones/75ebaef3c10060a3ee3b246166caab56.

- `@param {Number} number` The number to convert.
- `@param {Number} inMin` The min of the range for the input number.
- `@param {Number} inMax` The max of the range for the input number.
- `@param {Number} outMin` The min of the range for the output number.
- `@param {Number} outMax` The max of the range for the output number.
- `@return {Number}` The number within the output range.

#### polarToCartesian

Convert polar coordinates to cartesian coordinates. [Polar Coordinates Explainer](https://en.wikipedia.org/wiki/Polar_coordinate_system).

- `@param {Number} x` Polar x coordinate.
- `@param {Number} y` Polar y coordinate.
- `@param {Number} radius` The distance from the polar point.
- `@param {Number} angleInDegrees` The angle from the polar point.
- `@return {Object} point` The cartesian point.
- `@return {Object} point.x` Cartesian x coordinate.
- `@return {Object} point.y` Cartesian y coordinate.

#### toDegrees

Convert an angle in radians to degrees. The code is derived from: https://stackoverflow.com/questions/9705123/how-can-i-get-sin-cos-and-tan-to-use-degrees-instead-of-radians.

- `@param {Number} angle` An angle in radians.
- `@return {Number}` An angle in degrees.

#### toRadians

Convert an angle in degrees to radians. The code is derived from: https://stackoverflow.com/questions/9705123/how-can-i-get-sin-cos-and-tan-to-use-degrees-instead-of-radians.

- `@param {Number} angle` An angle in degrees.
- `@return {Number}` An angle in radians.

### Grids

#### grid

Create a grid and run a function for each item it has.

- `@param {Object} grid` An object containing information about the grid.
- `@param {Number} grid.columns` The number of columns in the grid.
- `@param {Number} grid.rows` The number of rows in the grid.
- `@param {Number} grid.width` The width of the grid.
- `@param {Number} grid.height` The height of the grid.
- `@param {Function} callback` The function to run. The function contains information about each item in the grid.
- `@return {Void}` Returns nothing.

#### times

Run a function `x` number of times.

- `@param {Number} number` The number of times to run the function.
- `@param {Function} callback` The function to run. The function contains the current index of the loop.
- `@return {Void}` Returns nothing.

### Interpolation

#### lerp

Interpolate the number between a set of numbers.

- `@param {Number} start` The number to start at.
- `@param {Number} end` The number to end at.
- `@return {Number}` Returns the interpolated number.

#### lerpColor

A linear interpolator for hexadecimal colors. The code is derived from: https://gist.github.com/rosszurowski/67f04465c424a9bc0dae.

- `@param {String} colorA` The hexadecimal color to start at.
- `@param {String} colorB` The hexadecimal color to end at.
- `@return {String}` Returns the interpolated hex color.

#### linearInterpolation

Compute an object full of interpolations.

- `@param {Number} number` The number of times to interpolate.
- `@param {Object} values` An object containing the start and end numbers in an array.
- `@return {Array}` Returns the list of interpolations.

#### smoothstep

[Smoothstep](https://en.wikipedia.org/wiki/Smoothstep) performs Hermite interpolation between two values.

- `@param {Number} number` The number to interpolate.
- `@param {Number} min` The min of the range.
- `@param {Number} max` The max of the range.
- `@return {Number}` Returns a value between 0.0 to 1.0.

### Noise

The noise functions are built on top of [simplex-noise](https://www.npmjs.com/package/simplex-noise). You can read an exapliner about noise by Varun Vachhar called [Noise in Creative Coding](https://varun.ca/noise/). A quick note, `frequency` controls how quickly or slowly the noise function is "evolving over time". A low frequency would produce values that are very close to each other for close values of `x`, while a high frequency would have more volatility, and probably look more similar to the random function. `amplitude` controls the range of values we get from the noise function. `Random.noise1D` will return numbers between `-amplitude` and `amplitude`. This is very similar to the parameters of `Random.range(minValue, maxValue)`, but compressed in a single parameter.

#### noise1D

Created noise in 1 dimension.

- `@param {Number} x` x dimension.
- `@param {Number} frequency` How often to change. Usually a number between `0` and `1`
- `@param {Number} amplitude` The amplitude of the wave, how much to change in each direction.

#### noise2D

Created noise in 2 dimensions.

- `@param {Number} x` x dimension.
- `@param {Number} y` y dimension.
- `@param {Number} frequency` How often to change. Usually a number between `0` and `1`
- `@param {Number} amplitude` The amplitude of the wave, how much to change in each direction.

#### noise3D

Created noise in 3 dimensions.

- `@param {Number} x` x dimension.
- `@param {Number} y` y dimension.
- `@param {Number} z` z dimension.
- `@param {Number} frequency` How often to change. Usually a number between `0` and `1`
- `@param {Number} amplitude` The amplitude of the wave, how much to change in each direction.

#### noise4D

Created noise in 4 dimensions.

- `@param {Number} x` x dimension.
- `@param {Number} y` y dimension.
- `@param {Number} z` z dimension.
- `@param {Number} time` time dimension.
- `@param {Number} frequency` How often to change. Usually a number between `0` and `1`
- `@param {Number} amplitude` The amplitude of the wave, how much to change in each direction.

## Contributing

All contributors and all contributions both big and small are welcome in this project.
