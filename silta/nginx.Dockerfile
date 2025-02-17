# Dockerfile for the Nginx container.
FROM wunderio/silta-nginx:1.26-v1

COPY . /app/web
