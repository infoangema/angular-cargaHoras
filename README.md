# Documentacion proyecto: wallas-tiendaticket-frontend

## Indice:
### 1. comandos basicos docker.

### 1. comandos basicos docker.

#### download nginx image
```
$ docker pull nginx:alpine
```

#### crear contenedor con nginx
```
$ docker run -d -p 80:80 nginx:alpine
```

#### ver contenedores activos
```
$ docker ps -a
```

#### detener contenedores
```
$ docker stop ID
```

#### eliminar contenedores
```
$ docker rm -f nginx
```

#### eliminar contenedor por id
```
$ docker rm -f 2a3d02d4c724b0872be912a70215bf4c86fae329745718480361983ad9a9802f
```

#### eliminar todos los contenedores
```
$ docker rm -f $(docker ps -aq)
```

#### construir imagen
```
$ docker build -t angular-carga-horas:v.1.0.0.0 --build-arg configuration="production" .
```


#### correr proyecto
```
$ docker run -p 8081:80 -d angular-carga-horas:v.1.0.0.0
```

```
ng new docker-angular
ng build --prod
```


```
docker run -d -p 8080:80 -v $(pwd)/dist/wallas-tiendaticket-frontend:/usr/share/nginx/html nginx:alpine
docker run -d -p 8080:80 -v "D:\gerrdevs\devs\angular\wallas\wallas-frontend\dist\wallas-tiendaticket-frontend:/usr/share/nginx/html" nginx:alpine
```

Dockerfile v1
```
# Stage 0, based on Node.js, to build and compile Angular
FROM node:latest as node
WORKDIR /app
COPY ./ /app/
RUN npm install
RUN npm run build -- --prod

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:alpine
COPY --from=node /app/dist/docker-angular /usr/share/nginx/html
```

```
docker build .
docker build . -t docker-angular:latest
```

```
docker run -d -p 8080:80 docker-angular:latest
docker run -d -p 80:80 docker-angular:latest
```

```
ng build --prod --configuration=staging
```

```
# Stage 0, based on Node.js, to build and compile Angular
FROM node:latest as node
WORKDIR /app
COPY ./ /app/
RUN npm install
ARG configuration=production
RUN npm run build -- --prod --configuration=$configuration

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:alpine
COPY --from=node /app/dist/docker-angular /usr/share/nginx/html
```

```
docker build -t docker-angular:latest --build-arg configuration="staging" .
docker run -d -p 80:80 docker-angular:latest
```

```
nginx-custom.conf
server {
  listen 80;
  location / {
    root /usr/share/nginx/html;
    index index.html index.htm;
    try_files $uri $uri/ /index.html =404;
  }
}
```

```
# Stage 0, based on Node.js, to build and compile Angular
FROM node:latest as node
WORKDIR /app
COPY ./ /app/
RUN npm install
ARG configuration=production
RUN npm run build -- --prod --configuration=$configuration

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:alpine
COPY --from=node /app/dist/docker-angular /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
```

```
docker build -t docker-angular:latest --build-arg configuration="staging" .
docker run -d -p 80:80 docker-angular:latest
```
