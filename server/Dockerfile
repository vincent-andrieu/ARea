FROM node:17.3-slim

WORKDIR /app
COPY ./package.json /app/
COPY ./package-lock.json /app/
COPY ./tsconfig.json /app/
COPY ./src/ /app/src/
COPY ./.env /app/

RUN npm i --only=prod

ENV NODE_OPTIONS --max_old_space_size=4096

RUN npm run build

CMD npm run start:force