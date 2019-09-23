FROM node:12.10.0-slim

WORKDIR /usr/app

COPY ./package.json ./
RUN apt-get update -qq && apt-get install -y build-essential && apt-get install -y python
RUN npm install
RUN npm install sequelize-cli -g
RUN sequelize init
COPY . .
