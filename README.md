# 🦊 Trader App

## Installations
-  [Docker](https://docs.docker.com/get-docker/)
-  [docker-compose](https://docs.docker.com/compose/install/)
-  [node.js](https://nodejs.org/en/) (version 14 LTS recommended)


## Docker 
This is not needed to development purposes and is used to run the webapp without any setup: 
Run `docker-compose up` in the project root. This will take a few minutes to download and build everything, but once it's done it'll tell you to visit `http://localhost:3000`. You'll find the webapp there.

## Setup without Docker
1. In the project root, run `docker-compose up -d db`. This command will start up the mongodb database on port 27017 on your computer.
2. In the project root, run `npm install` .This will install and link dependencies.
3. In the project root, run `npm run build`, this will build all our packages in order.
4. In **packages/api** folder run: `node index` to start the API.
5. Keep the terminal in step 4 running and launch a new terminal.
5. In **packages/webapp** run `npm run start` to start the webapp at `http://localhost:3000`.