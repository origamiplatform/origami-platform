FROM nginx:alpine AS base
WORKDIR /app
EXPOSE 80

FROM node:8.11.2-alpine as build
WORKDIR /src
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN ls -la

FROM base AS final
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /src/dist /usr/share/nginx/html
COPY --from=build /src/nginx.conf /etc/nginx/conf.d/default.conf
RUN ls -la /usr/share/nginx/html
RUN cat /etc/nginx/conf.d/default.conf