FROM wunderio/silta-node:18.17-test

COPY . /app

CMD npm run start
