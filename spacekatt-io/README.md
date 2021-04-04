# The International SpaceKatt Station

[![Build Status](https://travis-ci.org/SpaceKatt/spacekatt-io.svg?branch=main)](https://travis-ci.org/SpaceKatt/spacekatt-io)

Code for a [public website](https://spacekatt.io) to display SpaceKatt's projects, art, and other "stuff."

> Visit > [spacekatt.io](https://spacekatt.io) < today!

This website is built using [Docusaurus 2](https://v2.docusaurus.io/), a modern static website generator.

- [The International SpaceKatt Station](#the-international-spacekatt-station)
  - [Setup](#setup)
  - [Build](#build)
  - [Local Development](#local-development)
  - [CI/CD](#cicd)
  - [Deployment](#deployment)
    - [Publishing static build to gcloud](#publishing-static-build-to-gcloud)
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
npm run build
```

These commands generate static content into the `build` directory and can be served using any static contents hosting service.

## Local Development

```bash
npm start
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

## CI/CD

Please see the section on CI/CI in the [parent README](../README.md#CI/CD).

## Deployment

Built, static assets are [distributed](https://spacekatt.io/) using [Google CDN](https://cloud.google.com/cdn), a ["`backend bucket`"](https://cloud.google.com/cdn/docs/setting-up-cdn-with-bucket#gcloud-or-gsutil) through an [external HTTPS load balancer](https://cloud.google.com/iap/docs/load-balancer-howto), and [Namecheap DNS and domain registration](https://www.namecheap.com/domains/).

### Publishing static build to gcloud

```bash
gsutil rsync -Rd build/ gs://<BUCKET_NAME>
```

## Observability

The follow table describes different views to the system's performance:

| Observability Service                                                         | Description                                                                               |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [Google Analytics](https://analytics.google.com/)                             | Flexible analytics platform to measure how users flow through site content                |
| [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) | Google service to measure how responsive and usable a page is                             |
| [Search Console](https://support.google.com/webmasters/answer/9205520)        | The Search Console provides the Core Web Vitals report and a litany of usable information |
