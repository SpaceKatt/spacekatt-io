# spacekatt-io

Shared code for public website and profile.

## Build Toolchain

This project uses [Rush Stack](https://rushstack.io/) and [Heft](https://rushstack.io/pages/heft/overview/) for build and test orchestration.

### Install node.v14, using `nvm`

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
source ~/.bashrc
nvm install 14
nvm use 14
```

### Install `pnpm`, `rush`, and `heft`

```bash
npm install --global pnpm
pnpm install --global @microsoft/rush @rushstack/heft
```

### Build project

```bash
rush update
rush build
```

> Run `$ rush update` after installing new packages and pulling code from remote git repository.

## Testing

```bash
cd <package_dir>
heft test
```

## Docker

### Build Container Locally

```bash
docker build -t spacekatt/spacekatt-io:latest .
```

### Run Container Locally

```bash
docker ps
docker exec -it <container_name> /bin/sh
```
