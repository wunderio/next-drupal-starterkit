FROM wunderio/silta-node:20-alpine-v1

# Note: this dockerfile is meant to be used in combination with Silta and CircleCI.
# Because the build happens in CircleCI, we don't need to build the app in the dockerfile itself.
# For a more generic solution, you can check next.js's official docker example here:
# https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

# Because we are using the standalone mode, we copy only the needed files
# to the image.
COPY ./.next/standalone /app
COPY ./.next/static /app/.next/static
# We copy the fetch cache so that the cache handler can
# prepopulate redis with it:
COPY ./.next/cache/fetch-cache/ /app/.next/cache/fetch-cache
COPY ./public /app/public

WORKDIR /app

ENV PORT 3000
# Fix for next.js not being able to find sharp: https://nextjs.org/docs/messages/sharp-missing-in-production
ENV NEXT_SHARP_PATH /app/node_modules/sharp

ENV NEXT_PUBLIC_INIT_REDIS true

# server.js is created by next build from the standalone output:
CMD ["node", "server.js"]
