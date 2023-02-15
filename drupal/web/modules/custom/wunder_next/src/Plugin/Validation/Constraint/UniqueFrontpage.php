<?php

namespace Drupal\wunder_next\Plugin\Validation\Constraint;

use Symfony\Component\Validator\Constraint;

/**
 * Checks that frontpage translations are unique.
 *
 * @Constraint(
 *   id = "UniqueFrontpage",
 *   label = @Translation("Unique Frontpage", context = "Validation"),
 *   type = "string"
 * )
 */
class UniqueFrontpage extends Constraint {}
