FROM wunderio/silta-node:18-alpine-v3.17

COPY . /app

CMD npm run start --no-experimental-fetch
