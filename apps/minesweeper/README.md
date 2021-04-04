# SpaceKatt Minesweeper

[![Build Status](https://travis-ci.org/SpaceKatt/spacekatt-io.svg?branch=main)](https://travis-ci.org/SpaceKatt/spacekatt-io)

[Minesweeper implementation](https://spacekatt.io/tech/minesweeper), React 17 Hooks used as responsive application framework.

- [SpaceKatt Minesweeper](#spacekatt-minesweeper)
  - [Setup](#setup)
  - [Build](#build)
  - [Local Development](#local-development)
  - [Linting / Prettification](#linting--prettification)
    - [Prettier](#prettier)
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

## Linting / Prettification

### Prettier

Assuming you [installed the right tools](../README.md#Linting)...

```bash
npm run prettify-files
```

## CI/CD

Please see the section on CI/CD in the [parent README](../README.md#CI/CD).

## Deployment

This project is deployed on the [`International SpaceKatt Station`](https://github.com/SpaceKatt/spacekatt-io/tree/main/spacekatt-io) and as a ~~[standalone `npm` package](https://www.npmjs.com/package/spacekatt-minesweeper)~~ the NPM package is currently broken (alpha).

### Publishing `npm` package

```bash

```

### Updating Versioning

[Semantic versioning](https://docs.npmjs.com/about-semantic-versioning) via [using `npm`](https://docs.npmjs.com/updating-your-published-package-version-number) is standard procedure.

```bash
npm version <major|minor|patch>
```

## Observability

| Observability Service                                                 | Description                                      |
| --------------------------------------------------------------------- | ------------------------------------------------ |
| [NPM Repository](https://www.npmjs.com/package/spacekatt-minesweeper) | Measures usage and presents impactful statistics |
