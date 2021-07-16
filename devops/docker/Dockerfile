FROM node:14

COPY . /project
WORKDIR /project

RUN npm ci
RUN npm run build
RUN npm run lint
