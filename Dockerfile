FROM node:18
WORKDIR /usr/src/main

COPY ./ ./
COPY package*.json ./
RUN npm install

EXPOSE 7500
ENV NODE_ENV=production

CMD [ "npm", "start" ]