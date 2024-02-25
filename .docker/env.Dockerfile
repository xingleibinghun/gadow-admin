FROM node:16.20.2

WORKDIR /app

COPY . .

RUN npm config set registry https://registry.npmmirror.com

RUN npm install pnpm -g

RUN pnpm config set registry https://registry.npmmirror.com

RUN pnpm install

EXPOSE 3100

CMD cd /app/packages/server && pnpm start:dev