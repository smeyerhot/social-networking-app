FROM node:latest
# Creating app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install
EXPOSE 5000
CMD ["npm", "start"]