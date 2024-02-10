FROM node:21-bookworm-slim AS build
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile && yarn cache clean

COPY . .
RUN yarn build

FROM node:21-bookworm-slim AS run
WORKDIR /app

COPY yarn.lock package.json /app/

ENV NODE_ENV production
RUN yarn install --prod --frozen-lockfile && yarn cache clean

COPY conf.d /app/conf.d
COPY --from=build /app/dist /app/dist

CMD ["node", "--enable-source-maps", "--unhandled-rejections=strict", "/app/dist/server/index.js"]
