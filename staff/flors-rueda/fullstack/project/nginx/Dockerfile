FROM node:12-alpine as build
WORKDIR /app
COPY ./staff/flors-rueda/fullstack/project/app/package*.json ./
RUN npm install
ENV VITE_API_URL=http://15.237.84.130:80/api
COPY ./staff/flors-rueda/fullstack/project/app/ .
RUN npm run build


FROM nginx:stable-alpine
COPY --from=build /app/dist /bin/www
COPY ./staff/flors-rueda/fullstack/project/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]