FROM node:14-alpine

ENV REACT_APP_API_URL=app-49349.on-aptible.com

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
EXPOSE 3000
RUN npm run build
RUN npm install -g serve
CMD serve -s build