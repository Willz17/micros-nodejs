FROM node:19-alpine3.15

ENV NODE_ENV="development"

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 7070

CMD ["npm","start"]