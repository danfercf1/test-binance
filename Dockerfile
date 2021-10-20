FROM node:12.22.6

WORKDIR /app

RUN npm i tsc -g

COPY package.json ./

RUN npm i --only=prod

RUN npm run build

COPY dist/ /app/dist

CMD [ "npm", "start" ]
