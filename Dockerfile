FROM node:latest

WORKDIR /app

EXPOSE 3000

COPY package.json /app

RUN npm install

COPY . .

CMD ["npm", "start"]


