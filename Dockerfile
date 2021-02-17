#####################################################################
### spacekatt-io Dockerfile
###
### currently builds nginx container to statically serve...
###  - spacekatt.io
###  - minesweeper
###
#####################################################################
#####################################################################
#####################################################################
### First stage: Build stage
### - install dependencies
### - build code

FROM node:14.15.5-alpine3.13 as builder

RUN apk update
RUN apk add nginx

RUN apk add --update npm
RUN npm i npm@latest -g
RUN npm install --global pnpm

RUN apk add --no-cache --virtual build-dependencies \
        python3 \
        python3-dev \
        build-base \
        g++ \
        make \
    && pnpm install --global \
        @microsoft/rush \
        @rushstack/heft  \
    && apk del build-dependencies

RUN mkdir -p /usr/local/src
WORKDIR /usr/local/src

COPY . .
RUN rush update
RUN rush rebuild

#####################################################################
#####################################################################
### Second stage:
### - load built product
### - configure nginx service
### - expose service to serve content

### TODO: ensure production build only in second stage

# TODO: use nginx container
FROM nginx


#### Copy built app code
RUN mkdir -p /usr/local/src/
WORKDIR /usr/local/src

COPY --from=builder /usr/local/src .
# TODO: only copy static built apps

#### configure nginx service
# RUN adduser -D -g 'www' www
RUN mkdir -p /run/nginx
RUN mkdir -p /var/run/nginx
RUN rm -v /etc/nginx/conf.d/default.conf
RUN mv -v /etc/nginx/nginx.conf /etc/nginx/nginx.conf.orig
ADD ./deployment/etc/nginx/nginx.conf /etc/nginx

#### expose nginx service
EXPOSE 3000
