# spacekatt-io

Shared code for public website and profile.

## Build Toolchain

This project uses [Rush Stack](https://rushstack.io/) and [Heft](https://rushstack.io/pages/heft/overview/) for build and test orchestration.

### Installation

1. Install

### Useful commands

```bash
rush update
rush build
```

### Testing

```bash
cd <package_dir>
heft test
```

## Docker

### Local Docker Dev

#### Build Container Locally

```bash
docker build -t spacekatt/spacekatt-io:latest .
```

#### Run Container Locally

```bash
docker ps
docker exec -it <container_name> /bin/sh
```
