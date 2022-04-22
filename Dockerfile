FROM node:14.18.2-alpine3.12

RUN apk add --no-cache git

ARG PORT
ARG REDIS_URL

ENV NODE_ENV=production
ENV PORT=$PORT
ENV REDIS_URL=$REDIS_URL

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY src ./src
COPY scripts ./scripts

USER node

ENTRYPOINT ["yarn", "start"]
