FROM node:12.22.6

WORKDIR /app

COPY package.json ./

RUN npm i --only=prod

COPY dist/ ./dist

CMD [ "npm", "start" ]
