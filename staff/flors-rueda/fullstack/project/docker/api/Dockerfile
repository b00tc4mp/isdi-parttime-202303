FROM node:18

WORKDIR /usr/src/backend/com
COPY ./staff/flors-rueda/fullstack/project/com .
RUN ls

WORKDIR /usr/src/backend/api
COPY ./staff/flors-rueda/fullstack/project/api/package*.json ./
RUN cd ./ && npm install
COPY ./staff/flors-rueda/fullstack/project/api/ .
RUN ls

EXPOSE 4321
CMD [ "node", "index.js" ]