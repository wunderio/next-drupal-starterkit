<?php

namespace Drupal\wunder_next\Plugin\Validation\Constraint;

use Drupal\node\Entity\Node;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

/**
 * Validates the UniqueFrontpage constraint.
 */
class UniqueFrontpageValidator extends ConstraintValidator {

  /**
   * {@inheritdoc}
   */
  public function validate($node, Constraint $constraint) {
    /** @var \Drupal\node\Entity\Node $node */
    if ($node->bundle() === 'frontpage') {
      $existing_translation = $this->findFrontpageTranslation($node);

      // If we find an existing translation, raise a violation.
      if ($existing_translation !== FALSE) {
        $violation = t(
          'A frontpage already exists for the language (@language). <a href="@url">Edit the existing frontpage</a>',
          [
            '@language' => $node->language()->getName(),
            '@url' => $existing_translation->toUrl()->toString(),
          ]
        );

        $this->context->addViolation($violation);
      }
    }
  }

  /**
   * Find existing frontpage translation.
   *
   * @param \Drupal\node\Entity\Node $node
   *   The current node being validate.
   *
   * @return mixed
   *   An entity if found || FALSE
   */
  private function findFrontpageTranslation(Node $node) {
    $langcode = $node->language()->getId();

    // Get all frontpage entities that has the current entity's translation.
    $storage = \Drupal::entityTypeManager()->getStorage('node');
    $entities = $storage->loadByProperties(
      [
        'langcode' => $langcode,
        'type' => 'frontpage',
      ]
    );

    foreach ($entities as $entity) {
      if ($entity->id() != $node->id()) {
        // Return the existing node if we find one.
        return $entity;
      }
    }

    return FALSE;
  }

}
