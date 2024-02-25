# build stage
FROM node:16.20.2-alpine as build-stage

WORKDIR /app

COPY . .

RUN npm config set registry https://registry.npmmirror.com

RUN npm install pnpm -g

RUN pnpm config set registry https://registry.npmmirror.com

RUN pnpm install

RUN pnpm build:server

# production stage
FROM node:16.20.2-alpine as production-stage

COPY --from=build-stage /app/packages/server/dist /app

COPY --from=build-stage /app/packages/server/package.json /app/package.json

COPY --from=build-stage /app/pnpm-lock.yaml /app

WORKDIR /app

RUN pnpm install -P

EXPOSE 3100

CMD ["node", "./dist/main.js"]