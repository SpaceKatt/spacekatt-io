# SpaceKatt Minesweeper

[![Build Status](https://travis-ci.com/SpaceKatt/spacekatt-io.svg?branch=main)](https://travis-ci.com/SpaceKatt/spacekatt-io)

[Minesweeper implementation](https://spacekatt.io/tech/minesweeper), with a vaporwave color palatte. [React 17 Hooks](https://reactjs.org/docs/hooks-intro.html) was used as responsive application framework.

- [SpaceKatt Minesweeper](#spacekatt-minesweeper)
  - [Setup](#setup)
  - [Build](#build)
  - [Local Development](#local-development)
  - [Testing](#testing)
  - [Linting / Prettification](#linting--prettification)
    - [Prettier](#prettier)
  - [CI/CD](#cicd)
  - [Deployment](#deployment)
    - [Publishing `npm` package](#publishing-npm-package)
    - [Updating Versioning](#updating-versioning)
  - [Observability](#observability)

## Setup

Follow the [`Build Toolchain`](https://github.com/SpaceKatt/spacekatt-io#build-toolchain) set up instructions in the [parent `README`](https://github.com/SpaceKatt/spacekatt-io) before continuing.

## Build

We may either build this project among all of our other projects or by itself in isolation.

```bash
# To build all projects...
rush build
```

```bash
# To build only this project...
heft build
```

These commands generate static content into the `build` directory and can be served using any static contents hosting service.

## Local Development

```bash
npm start
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

## Testing

[`heft`](https://rushstack.io/pages/heft_tutorials/everyday_commands/) (`jest` under the covers) is used as a test runner.

```bash
heft test
```

## Linting / Prettification

### Prettier

Assuming you [installed the right tools](https://github.com/SpaceKatt/spacekatt-io#linting)...

```bash
npm run prettify-files
```

## CI/CD

Please see the section on CI/CD in the [parent README](https://github.com/SpaceKatt/spacekatt-io#cicd).

## Deployment

This project is deployed on the [`International SpaceKatt Station`](https://github.com/SpaceKatt/spacekatt-io/tree/main/spacekatt-io) and as a ~~[standalone `npm` package](https://www.npmjs.com/package/spacekatt-minesweeper)~~ the NPM package is currently broken (alpha).

### Publishing `npm` package

```bash
npm publish
```

### Updating Versioning

[Semantic versioning](https://docs.npmjs.com/about-semantic-versioning) via [using `npm`](https://docs.npmjs.com/updating-your-published-package-version-number) is standard procedure.

```bash
npm version <major|minor|patch>
```

> TODO: use `rush` for publish and versioning

## Observability

| Observability Service                                                 | Description                                      |
| --------------------------------------------------------------------- | ------------------------------------------------ |
| [NPM Repository](https://www.npmjs.com/package/spacekatt-minesweeper) | Measures usage and presents impactful statistics |
