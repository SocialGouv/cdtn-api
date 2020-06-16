FROM node:12.16.3-alpine

ENV NODE_ENV=production
ENV PORT=$PORT

WORKDIR /app

COPY . .

RUN yarn --production --pure-lockfile

USER node

ENTRYPOINT ["yarn", "start"]
