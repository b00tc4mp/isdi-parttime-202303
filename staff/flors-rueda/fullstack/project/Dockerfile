FROM node:18

WORKDIR /usr/src/backend/com
COPY ./com/* .

WORKDIR /usr/src/backend/api
COPY ./package*.json ./
RUN cd ./ && npm install
COPY ./api/* .

EXPOSE 4321
CMD [ "node", "index.js" ]