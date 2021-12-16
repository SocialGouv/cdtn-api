FROM node:14.18.2-alpine3.12

RUN apk add --no-cache git

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn --frozen-lockfile

COPY scripts /app/scripts
COPY src /app/src

USER node

ENTRYPOINT ["yarn", "cache:update"]
