# Dockerfile for the PHP container.
FROM wunderio/silta-php-fpm:8.2-fpm-v1.0.0

COPY --chown=www-data:www-data . /app
