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

const points = _supply.functionName()
```

## API

### Calculation

#### constrain

More tk

#### heightAlongSinWave

More tk

#### map

More tk

#### polarToCartesian

More tk

#### toDegrees

More tk

#### toRadians

More tk

### Color

#### getHSLColor

More tk

#### hexToHSL

More tk

#### hslToHex

More tk

#### isolateColorLayer

More tk

#### modulateColorHSL

More tk

#### modulateColorHex

More tk

#### palettes

More tk

#### getPaletteColor

More tk

### Flow Field

#### generateParticles

Creates the particles for a flow field.

- `@param {Number} count` Number of particles in the field.
- `@param {Number} height` Height of space.
- `@param {Number} margin` Percent of height/width to create a padding.
- `@param {String} seed` Random (random-js) seed.
- `@param {Number} width` Width of space.
- `@return {Array}` List of particle objects containing the starting x and y coordinates.

#### generateField

Creates a flow field with particles and lines.

- `@param {Number} amplitude` Controls the range of values we get from the noise function. Default to `5`.
- `@param {Number} count` Number of particles in the field. Default to `1000`.
- `@param {Number} damping` Percentage that slows down the particle (think friction). Default to `0.1`.
- `@param {Number} height` Height of space.
- `@param {Number} margin` Percent of height/width to create a padding. Default to `0.1`.
- `@param {Object} particles` List of particles to use instead of generating them.
- `@param {String} scale` Used to compute frequency, number of steps and step length. Default to `1`.
- `@param {String} seed` Random (random-js) seed.
- `@param {Number} width` Width of space.
- `@return {Array}` List of particle objects containing the line coordinates.

#### moveParticle

Computes the new position for a particle and adds it to the `particle.line` array.

- `@param {Number} amplitude` Controls the range of values we get from the noise function.
- `@param {Number} damping` Slows down the particle (think friction).
- `@param {Number} frequency` Controls how quickly/slowly the noise function is "evolving over time".
- `@param {Number} lengthOfStep` Amount to move the coordinate.
- `@param {Object} particle` Particle object containing the.
- `@return {Void}` Operates on the particle and returns nothing.

### Harmonograph

#### adjustXY

More tk

#### generateHarmonograph

More tk

#### randomPendulums

More tk

### Interpolation

#### lerp

More tk

#### lerpColor

More tk

#### lerpColorMulti

More tk

#### linearInterpolation

Interpolate the values of two objects' keys. More tk.

### Misc

#### fractal

More tk

#### subdivision

More tk

### Noise

#### noise1D

More tk

#### noise2D

More tk

#### noise3D

More tk

#### noise4D

More tk

#### octive2D

More tk

### Points

#### centroidOfPoints

More tk

#### dist2

More tk

#### distanceBetweenTwoPoints

More tk

#### distanceToSegment

More tk

#### getAngleOfPolygonPoints

More tk

#### getPolygonPoints

More tk

#### getRandomPoints

More tk

#### getSprialPoints

More tk

#### spline

More tk

#### toPoints

More tk

### Poisson

#### PoissonDisk

More tk

### Quadtree

#### generateQtGrid

More tk

### Random

#### getRandom

More tk

#### getRandomWithSeed

More tk

#### randomBias

More tk

### Voronoi

#### generateVoronoi

More tk

## Contributing

All contributors and all contributions both big and small are welcome in this project.

## Author

[Romello Goodman](https://www.romellogoodman.com/)
