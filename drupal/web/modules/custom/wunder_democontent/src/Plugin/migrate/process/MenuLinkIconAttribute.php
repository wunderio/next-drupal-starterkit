<?php

namespace Drupal\wunder_democontent\Plugin\migrate\process;

use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\Row;

/**
 * Provides a wunder_democontent_menu_link_icon_attribute plugin.
 *
 * Usage:
 *
 * @code
 * process:
 *   bar:
 *     plugin: wunder_democontent_menu_link_icon_attribute
 *     source: foo
 * @endcode
 *
 * @MigrateProcessPlugin(
 *   id = "wunder_democontent_menu_link_icon_attribute"
 * )
 */
class MenuLinkIconAttribute extends ProcessPluginBase {

  /**
   * {@inheritdoc}
   */
  public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property) {
    // No value, nothing to do:
    if (empty($value)) {
      return NULL;
    }

    // If a value is provided, use it to set the icon attribute:
    return [
      'attributes' => [
        'icon' => $value,
      ],
    ];

  }

}
