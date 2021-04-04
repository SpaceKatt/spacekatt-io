# spacekatt-io

Shared code for public website and profile.

## Build Toolchain

This project uses [Rush Stack](https://rushstack.io/) and [Heft](https://rushstack.io/pages/heft/overview/) for build and test orchestration.

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
