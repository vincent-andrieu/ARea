FROM nginx:1.21.5-alpine

WORKDIR /app

COPY ./.browserslistrc /app/
COPY ./karma.conf.js /app/
COPY ./angular.json /app/
COPY ./tsconfig.app.json /app/
COPY ./tsconfig.json /app/
COPY ./package.json /app/
COPY ./package-lock.json /app/
COPY ./src/ /app/src/
COPY app /usr/share/nginx/html