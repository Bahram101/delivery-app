FROM node:18

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .
COPY .env .env
RUN npx prisma generate

RUN yarn build

EXPOSE 4001
# CMD ["yarn", "start:dev"]
CMD npx prisma migrate deploy && yarn start:dev