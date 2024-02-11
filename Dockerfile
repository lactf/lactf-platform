FROM node:21-bookworm-slim AS build
WORKDIR /app

COPY . .
RUN yarn set version berry && yarn install && yarn cache clean && yarn build

FROM node:21-bookworm-slim AS run
WORKDIR /app

COPY . .
ENV NODE_ENV production
RUN yarn set version berry && yarn install && yarn cache clean

COPY conf.d /app/conf.d
COPY --from=build /app/dist /app/dist

CMD ["node", "--enable-source-maps", "--unhandled-rejections=strict", "/app/dist/server/index.js"]
