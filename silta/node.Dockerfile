FROM wunderio/silta-node:20-alpine-v1

# Because we are using the standalone mode, we copy only the needed files
# to the image.
COPY ./.next/standalone /app
COPY ./.next/static /app/.next/static
COPY ./public /app/public

WORKDIR /app

ENV PORT 3000

# server.js is created by next build from the standalone output
CMD ["node", "server.js"]
