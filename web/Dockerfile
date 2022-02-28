FROM node:17.3-slim AS builder

WORKDIR /app

COPY ./.browserslistrc /app/
COPY ./karma.conf.js /app/
COPY ./angular.json /app/
COPY ./nginx.conf /app/
COPY ./tsconfig.app.json /app/
COPY ./tsconfig.json /app/
COPY ./package.json /app/
COPY ./package-lock.json /app/
COPY ./src/ /app/src/

RUN rm package-lock.json
RUN npm i
RUN npm run build

FROM nginx:1.21.5-alpine

COPY --from=builder /app/dist/ /usr/share/nginx/html/
COPY /app/nginx.conf /etc/nginx/conf.d/default.conf