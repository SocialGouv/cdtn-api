FROM node:12.16.3-alpine

ENV NODE_ENV=production
ENV PORT=$PORT

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn --production --pure-lockfile

COPY src /app/src

USER node

ENTRYPOINT ["yarn", "start"]
