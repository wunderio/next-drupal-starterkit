# Dockerfile for the PHP container.
FROM wunderio/silta-php-fpm:8.2-fpm-v1

COPY --chown=www-data:www-data . /app
