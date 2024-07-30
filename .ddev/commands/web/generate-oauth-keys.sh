#!/bin/bash

## Description: Helper script to generate oath keys as part of the next drupal starterkit setup.
## Usage: generate-oauth-keys
## Example: "ddev  generate-oauth-keys"

cd drupal/oauth
pwd
openssl genrsa -out private.key 2048
openssl rsa -in private.key -pubout > public.key
chmod 600 public.key
