# base image
FROM node:latest as node

# set working directory
WORKDIR /usr/app

# install and cache app dependencies
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm install -g @angular/cli
CMD [ "npm","start" ]