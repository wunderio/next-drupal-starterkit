<?php

/**
 * @file
 * Tokens for the Wunder next module.
 */

use Drupal\Core\Site\Settings;

/**
 * Implements hook_token_info().
 */
function wunder_next_token_info() {
  $info = [];
  $info['types']['wunder_next'] = [
    'name' => t('Wunder next tokens'),
    'description' => t('Tokens needed for the Wunder next module'),
  ];
  $info['tokens']['wunder_next']['frontend-url'] = [
    'name' => t("Link to the frontend site"),
    'description' => t('The url of the frontend site.'),
  ];
  return $info;
}

/**
 * Implements hook_tokens().
 */
function wunder_next_tokens($type, $tokens, array $data, array $options, $bubbleable_metadata) {
  $replacements = [];
  $settings = Settings::get('wunder_next.settings');
  if ($type == 'wunder_next') {
    foreach ($tokens as $name => $original) {
      switch ($name) {
        case 'frontend-url':
          $replacements[$original] = $settings['frontend_url'];
          break;
      }
    }
  }
  return $replacements;
}
