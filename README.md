# spacekatt-io

Shared code for [public website](https://spacekatt.io/) and other applications.

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

| Project                                              | Description                                                    | README (if exists)                          |
| ---------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------- |
| [spacekatt.io](https://spacekatt.io/)                | Public website, used to host content and other projects        | [README link](./spacekatt-io/README.md)     |
| [Minesweeper](https://spacekatt.io/tech/minesweeper) | Minesweeper implementation, first project using React 17 Hooks | [README link](./apps/minesweeper/README.md) |

## Testing

Each project is responsible for its own testing. All projects use `heft` (`jest` under the covers) as a test runner.

```bash
cd <package_dir>
heft test
```

## Linting

Each project is responsible for defining its own linting rules. However, all must use `ESLint` (`TSLint` is now deprecated.)

## Docker

### Build Container Locally

```bash
docker build -t spacekatt/spacekatt-io:latest .
```

### Run Container Locally

```bash
docker image ls
docker run -d -p 80:3000 spacekatt/spacekatt-io:latest
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

## Publishing static build to gcloud

```bash
gsutil rsync -Rd build/ gs://<BUCKET_NAME>
```
