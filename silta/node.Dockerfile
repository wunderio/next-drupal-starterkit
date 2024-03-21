FROM wunderio/silta-node:20-alpine-v1

COPY ./.next/standalone /app
COPY ./.next/static /app/.next/static
COPY ./public /app/public


CMD ["node", "server.js"]
