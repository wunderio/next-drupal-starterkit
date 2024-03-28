<?php

declare(strict_types=1);

namespace Drupal\wunder_democontent\EventSubscriber;

use Drupal\Core\Logger\LoggerChannelInterface;
use Drupal\Core\State\StateInterface;
use Drupal\next\Event\EntityActionEvent;
use Drupal\next\Event\EntityEvents;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * Prevents revalidation when a state var is set.
 */
final class WunderDemocontentRevalidateSubscriber implements EventSubscriberInterface {

  const DISABLE_REVALIDATION_STATE_VARIABLE = 'wunder_democontent.disable_revalidation';

  /**
   * Constructs a WunderDemocontentSubscriber object.
   */
  public function __construct(
    private readonly LoggerChannelInterface $loggerChannelWunderDemocontent,
    private readonly StateInterface $state,
  ) {
  }

  /**
   * Revalidates the entity.
   *
   * @param \Drupal\next\Event\EntityActionEvent $event
   *   The event.
   */
  public function onAction(EntityActionEvent $event) {
    // When this module is active, and the state variable is set to true,
    // We stop propagation of the revalidation events and we log a message.
    if ($this->state->get(self::DISABLE_REVALIDATION_STATE_VARIABLE, FALSE) === TRUE) {
      $this->loggerChannelWunderDemocontent->info("Stopping revalidation of @type entity @label (@id), because the @state state variable is set to true.", [
        '@id' => $event->getEntity()->id(),
        '@type' => $event->getEntity()->getEntityTypeId(),
        '@label' => $event->getEntity()->label(),
        '@state' => self::DISABLE_REVALIDATION_STATE_VARIABLE,
      ]);
      $event->stopPropagation();
    }
  }

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents() {
    // This is higher than the priority that the next module has
    // so that this event will be executed first:
    $events[EntityEvents::ENTITY_ACTION] = ['onAction', 100];
    return $events;
  }

}
