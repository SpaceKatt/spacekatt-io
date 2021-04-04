# spacekatt-io

[![Build Status](https://travis-ci.org/SpaceKatt/spacekatt-io.svg?branch=main)](https://travis-ci.org/SpaceKatt/spacekatt-io)

Shared code for [public website](https://spacekatt.io/) and other applications.

- [spacekatt-io](#spacekatt-io)
  - [Build Toolchain](#build-toolchain)
    - [Install node14, using `nvm`](#install-node14-using-nvm)
    - [Install `pnpm`, `rush`, and `heft`](#install-pnpm-rush-and-heft)
    - [Build all projects](#build-all-projects)
  - [Project Inventory](#project-inventory)
  - [Testing](#testing)
  - [Linting](#linting)
  - [Docker](#docker)
    - [Build Docker Image](#build-docker-image)
    - [Run Container Locally](#run-container-locally)
    - [Stop running container](#stop-running-container)
    - [Inspect running container](#inspect-running-container)
  - [Deployment && Observability](#deployment--observability)
  - [CI/CD](#cicd)

## Build Toolchain

This project uses [Rush Stack](https://rushstack.io/) and [Heft](https://rushstack.io/pages/heft/overview/) for build and test orchestration. Rush has the benefit of providing incremental builds, which makes it useful for use in the monorepo context (time savings).

### Install node14, using `nvm`

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
source ~/.bashrc

# Install node14
nvm install 14
nvm use 14
```

### Install `pnpm`, `rush`, and `heft`

```bash
npm install --global pnpm
pnpm install --global @microsoft/rush @rushstack/heft
```

### Build all projects

```bash
rush update
rush build

# force rebuild by not using build cache
rush rebuild
```

> Run `$ rush update` after installing new packages and pulling code from remote git repository.

## Project Inventory

| Project                                              | Description                                                                            | Source link                       |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------- | --------------------------------- |
| [spacekatt.io](https://spacekatt.io/)                | The `International SpaceKatt Station` website, used to host content and other projects | [Source link](./spacekatt-io)     |
| [Minesweeper](https://spacekatt.io/tech/minesweeper) | Minesweeper implementation, first project using React 17 Hooks                         | [Source link](./apps/minesweeper) |

## Testing

Each project is responsible for its own testing. All projects use `heft` (`jest` under the covers) as a test runner.

```bash
cd <package_dir>
heft test
```

## Linting

Each project is responsible for defining its own linting rules. However, all must use `ESLint` (`TSLint` is now deprecated.)

## Docker

To ensure setup instructions are 100% discoverable and documented, a [`Dockerfile`](./Dockerfile) is provided. The produced docker image may be used to serve the `International SpaceKatt Station` and all bundled projects locally at [`http://127.0.0.1/`](http://127.0.0.1/) (and accessible from your favorite browser).

The [`ngnix:alpine`](https://hub.docker.com/_/nginx) variant of [NGINX](https://www.nginx.com/) is used to serve static assets from within a container. Static assests are built in the first stage, then copied over to the `nginx:alpine` base in the second stage.

Alpline allowed for the optimization of image size; a `668MB` Docker image was reduced to `30.8MB` through the use of a multi-stage, alpine-based build.

### Build Docker Image

```bash
docker build -t spacekatt/spacekatt-io:latest .
```

### Run Container Locally

```bash
docker image ls
docker run -d -p 80:80 spacekatt/spacekatt-io:latest
```

View site running from the container at `http://127.0.0.1/` in your favorite browser.

### Stop running container

```bash
# List running containers
docker ps
docker stop <container_name>
```

### Inspect running container

```bash
# List running containers
docker ps
docker exec -it <container_name> /bin/sh
```

## Deployment && Observability

Each project is responsible for their own deployment and observability strategies. Please refer to the [`Project Inventory`](https://github.com/SpaceKatt/spacekatt-io#project-inventory) for links to `READMEs` with the relevant information.

## CI/CD
