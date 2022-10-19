# artsupply

[![npm version](https://badge.fury.io/js/goodgraphics.svg)](https://badge.fury.io/js/artsupply)

A utility library for creative coding.

## Usage

### Install

npm

```
npm i artsupply
```

unpkg

```
<script src="https://unpkg.com/goodgraphics"></script>
```

### Use

```
import _art from 'artsupply';

const points = _art.functionName()
```

## API

### Section

More tk

### Flow Fields

<!-- https://github.com/romellogoodman/flow-field.js -->

#### generateParticles

Creates the particles for a flow field.

- `@param {Number} count` Number of particles in the field.
- `@param {Number} height` Height of space.
- `@param {Number} margin` Percent of height/width to create a padding.
- `@param {String} seed` Random (random-js) seed.
- `@param {Number} width` Width of space.
- `@return {Array}` List of particle objects containing the starting x and y coordinates.

#### moveParticle

Computes the new position for a particle and adds it to the `particle.line` array.

- `@param {Number} amplitude` Controls the range of values we get from the noise function.
- `@param {Number} damping` Slows down the particle (think friction).
- `@param {Number} frequency` Controls how quickly/slowly the noise function is "evolving over time".
- `@param {Number} lengthOfStep` Amount to move the coordinate.
- `@param {Object} particle` Particle object containing the.
- `@return {Void}` Operates on the particle and returns nothing.

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

## Contributing

All contributors and all contributions both big and small are welcome in this project.

## Author

[Romello Goodman](https://www.romellogoodman.com/)
