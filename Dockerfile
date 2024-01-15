FROM node:16-alpine

RUN npm install -g nodemon ts-node

ENV workdir=/app

WORKDIR ${workdir}

COPY . .

EXPOSE 80

RUN yarn install

RUN yarn build

RUN yarn build:api

CMD [ "node", "dist/src/index.js" ]

