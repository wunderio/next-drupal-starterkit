<?php

/**
 * @file
 * Environment loader.
 *
 * This file is included very early. See autoload.files in composer.json and
 * https://getcomposer.org/doc/04-schema.md#files.
 */

use Dotenv\Dotenv;

/**
 * Load any .env file.
 *
 * See /.env.example. All of the defined variables are available
 * in the $_ENV and $_SERVER super-globals: "$username = $_ENV['USERNAME'];".
 */
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->safeLoad();
