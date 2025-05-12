FROM node:18

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

# Генерация Prisma Client для Linux (debian-openssl-3.0.x)
RUN npx prisma generate

RUN yarn build

EXPOSE 3000
CMD ["yarn", "start:dev"]