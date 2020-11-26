FROM node:12.20.0-alpine

RUN apk add --no-cache git

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn --frozen-lockfile --cache-folder /dev/shm/yarn

COPY scripts /app/scripts
COPY src /app/src

USER node

ENTRYPOINT ["yarn", "cache:update"]
