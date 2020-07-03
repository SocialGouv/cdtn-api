FROM node:12.16.3-alpine

ARG TRAVIS

ENV NODE_ENV=production
ENV PORT=$PORT
ENV TRAVIS=$TRAVIS

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn --frozen-lockfile --cache-folder /dev/shm/yarn

COPY src /app/src

USER node

ENTRYPOINT ["yarn", "start"]
