FROM node:latest

# Creating app directory
RUN mkdir -p /usr/src/app/client
WORKDIR /usr/src/app/client

COPY package.json /usr/src/app/client

RUN npm install
EXPOSE 3000
CMD ["npm", "start"]