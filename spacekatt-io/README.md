# The International SpaceKatt Station

Code for a [public website](https://spacekatt.io) to display SpaceKatt's projects, art, and other "stuff."

> Visit > [spacekatt.io](https://spacekatt.io) < today!

This website is built using [Docusaurus 2](https://v2.docusaurus.io/), a modern static website generator.

- [The International SpaceKatt Station](#the-international-spacekatt-station)
  - [Setup](#setup)
  - [Build](#build)
  - [Local Development](#local-development)
  - [Publishing static build to gcloud](#publishing-static-build-to-gcloud)

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

## Publishing static build to gcloud

```bash
gsutil rsync -Rd build/ gs://<BUCKET_NAME>
```
