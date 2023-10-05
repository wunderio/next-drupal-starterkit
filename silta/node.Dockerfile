FROM wunderio/silta-node:18-alpine-v1

COPY . /app

CMD npm run start
