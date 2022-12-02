FROM node:18.11-slim as build
WORKDIR /front
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.23.2
COPY --from=build /front/build /usr/share/nginx/html
COPY --from=build /front/nginx-prod.conf /etc/nginx/conf.d/default.conf
