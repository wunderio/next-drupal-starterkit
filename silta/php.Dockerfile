# Dockerfile for the PHP container.
FROM wunderio/silta-php-fpm:8.3-fpm-v1

COPY --chown=www-data:www-data . /app

USER www-data