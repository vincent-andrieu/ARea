FROM node:17.3-slim

WORKDIR /app
COPY ./package.json /app/
COPY ./package-lock.json /app/
COPY ./tsconfig.json /app/
COPY ./src/ /app/src/
COPY ./.env /app/
COPY ./dataset/actions.json /app/dataset/
COPY ./dataset/reactions.json /app/dataset/

RUN npm i
RUN npm run build

CMD npm run start:force