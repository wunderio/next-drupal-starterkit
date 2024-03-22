FROM wunderio/silta-node:20-alpine-v1

# Because we are using the standalone mode, we copy only the needed files
# to the image.
COPY ./.next/standalone /app
COPY ./.next/static /app/.next/static
COPY ./public /app/public

WORKDIR /app

ENV PORT 3000

# In standalone mode, we cannot use npm run start, we have to use the server.js file
CMD ["node", "server.js"]
