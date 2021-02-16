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

WORKDIR /usr/local/src

COPY . .
RUN rush update
RUN rush rebuild

### Second stage:
### - load built product
### - configure nginx service
### - expose service to serve content

#### TODO: production build only in second stage

FROM node:14.15.5-alpine3.13

RUN apk update
RUN apk --no-cache add ca-certificates

RUN apk add --no-cache nodejs nginx
