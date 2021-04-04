# SpaceKatt Minesweeper

[Minesweeper implementation](https://spacekatt.io/tech/minesweeper), React 17 Hooks used as responsive application framework.

- [SpaceKatt Minesweeper](#spacekatt-minesweeper)
  - [Setup](#setup)
  - [Build](#build)
  - [Local Development](#local-development)
  - [CI/CD](#cicd)
  - [Deployment](#deployment)
    - [Publishing `npm` package](#publishing-npm-package)
    - [Updating Versioning](#updating-versioning)
  - [Observability](#observability)

## Setup

Follow the [`Build Toolchain`](https://github.com/SpaceKatt/spacekatt-io#build-toolchain) set up instructions in the [parent `README`](../README.md) before continuing.

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

## CI/CD

Please see the section on CI/CD in the [parent README](../README.md#CI/CD).

## Deployment

This project is deployed on the [`International SpaceKatt Station`](../spacekatt-io) and as a ~~[standalone `npm` package](https://www.npmjs.com/package/spacekatt-minesweeper)~~ the NPM package is currently broken (alpha).

### Publishing `npm` package

```bash

```

### Updating Versioning

```bash

```

## Observability

| Observability Service                                                 | Description                                      |
| --------------------------------------------------------------------- | ------------------------------------------------ |
| [NPM Repository](https://www.npmjs.com/package/spacekatt-minesweeper) | Measures usage and presents impactful statistics |
