# this is where docker gets the image from
FROM node:23.6.0-alpine

# code executes in the command line INSIDE the docker container
RUN mkdir -p /usr/app/

# set your working directory so that . is now /usr/src/app
WORKDIR /usr/app

COPY ./package*.json ./
# COPY ./tsconfig.json ./

RUN npm i

# this copies everything you need into from local into your docker container to start
COPY ./src ./src/
COPY ./.sequelizerc ./.sequelizerc
# COPY ./dist ./dist/

CMD ["node", "./src/server.js"]