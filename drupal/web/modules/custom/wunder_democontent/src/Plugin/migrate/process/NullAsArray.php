<?php

namespace Drupal\wunder_democontent\Plugin\migrate\process;

use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\Row;

/**
 * Transforms a null value as an empty array usable on sub_process.
 *
 * When using migration_lookup, the return values may be NULL, meaning the
 * lookup as not found any match.
 * Then, SubProcess fails if input is array([0] => NULL).
 * This process intend to transform null value into an empty array to prevent
 * sub_process fail when mixing multiple nullable sources.
 *
 *
 * Example:
 *
 * @code
 * process:
 *   field_string:
 *     plugin: null_as_array
 *     source: my_nullable_value
 * @endcode
 *
 * @code
 * standard_migration:
 *   -
 *     plugin: migration_lookup
 *     migration: migration_that_is_required
 *
 * nullable_migration:
 *   -
 *     plugin: migration_lookup
 *     migration: migration_that_may_found_nothing
 *   -
 *     plugin: null_as_array
 *
 *   field_content:
 *      plugin: sub_process
 *     source:
 *       - '@nullable_migration'
 *       - '@standard_migration'
 *     process:
 *       target_id:
 *          plugin: skip_on_empty
 *          method: process
 *          message: 'Cannot import empty paragraph'
 *          source: '0'
 * @endcode
 *
 * @MigrateProcessPlugin(
 *     id="null_as_array"
 * )
 */
class NullAsArray extends ProcessPluginBase {

  /**
   * {@inheritdoc}
   */
  public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property) {
    if ($value === NULL) {
      return [];
    }

    return $value;
  }

}
