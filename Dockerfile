FROM node:12.16.3-alpine

ENV NODE_ENV=production
ENV PORT=$PORT

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn --frozen-lockfile --cache-folder /dev/shm/yarn

COPY src /app/src

USER node

ENTRYPOINT ["yarn", "start"]
