FROM node:latest as node
WORKDIR /app
COPY ./ /app/
RUN npm install
ARG configuration=production
RUN npm run build --configuration=$configuration

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:alpine
COPY --from=node /app/dist/angular-carga-horas /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
