<?php

namespace Drupal\wunder_translations\Commands;

use Consolidation\AnnotatedCommand\CommandError;
use Drupal\Core\Entity\EntityStorageException;
use Drupal\user\Entity\User;
use Drush\Commands\DrushCommands;
use Drupal\consumers\Entity\Consumer;

/**
 * A Drush commandfile.
 *
 */
class WunderNextCommands extends DrushCommands {

  const ARTICLE_CONTENT_TYPE = 'article';
  const BASIC_CONTENT_TYPE = 'page';

  /**
   * Enable translations for basic content types.
   *
   * @usage wunder_translations-commandName
   *
   * @command wunder_translations:translate-content
   * @aliases wtrans
   */
  public function translateContent() {

    \Drupal::service('content_translation.manager')->setEnabled('node', self::ARTICLE_CONTENT_TYPE, true);
    \Drupal::service('content_translation.manager')->setEnabled('node', self::BASIC_CONTENT_TYPE, true);
    \Drupal::entityTypeManager()->clearCachedDefinitions();
    \Drupal::service('router.builder')->setRebuildNeeded();

    $this->logger()->success(dt('Translations enabled for Article and Basic pages.'));
  }

}
