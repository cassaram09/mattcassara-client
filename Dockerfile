
FROM node:12

ENV NEXT_PUBLIC_SERVER_URL https://mattcassara-server.herokuapp.com

WORKDIR /app
COPY ./package.json ./yarn.lock ./
RUN yarn
COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]

