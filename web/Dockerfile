FROM node:17.3-slim AS builder

WORKDIR /app

COPY ./.browserslistrc /app/
COPY ./karma.conf.js /app/
COPY ./angular.json /app/
COPY ./tsconfig.app.json /app/
COPY ./tsconfig.json /app/
COPY ./package.json /app/
COPY ./package-lock.json /app/
COPY ./src/ /app/src/

RUN rm package-lock.json
RUN npm i --only=prod
RUN npm run build

FROM nginx:1.21.5-alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/ /usr/share/nginx/html/