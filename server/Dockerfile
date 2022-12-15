FROM node:14-alpine

WORKDIR /server
COPY package.json .
RUN npm install
COPY . .
EXPOSE 1337
CMD node server.js