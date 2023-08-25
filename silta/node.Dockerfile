FROM wunderio/silta-node:18-alpine-v0.1.2

COPY . /app

CMD npm run start
