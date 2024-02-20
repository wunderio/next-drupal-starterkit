FROM wunderio/silta-node:20-alpine-v1

COPY . /app

CMD npm run start
