FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

RUN npm install -g serve

COPY . .

RUN yarn build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]