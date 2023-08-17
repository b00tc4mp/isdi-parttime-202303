FROM node:18-alpine as build

WORKDIR /frontend/com
COPY ./staff/flors-rueda/fullstack/project/com .
RUN ls

WORKDIR /frontend/app
COPY ./staff/flors-rueda/fullstack/project/app/package*.json ./
RUN npm install
ENV VITE_API_URL=http://15.188.51.248:80/api
COPY ./staff/flors-rueda/fullstack/project/app/ .
RUN npm run build


FROM nginx:stable-alpine
COPY --from=build /frontend/app/dist /bin/www
COPY ./staff/flors-rueda/fullstack/project/docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]