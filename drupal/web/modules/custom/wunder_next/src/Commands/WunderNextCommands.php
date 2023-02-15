<?php

namespace Drupal\wunder_next\Commands;

use Consolidation\AnnotatedCommand\CommandError;
use Drupal\Core\Entity\EntityStorageException;
use Drupal\user\Entity\User;
use Drush\Commands\DrushCommands;
use Drupal\consumers\Entity\Consumer;

/**
 * Drush command file for the wunder_next module.
 */
class WunderNextCommands extends DrushCommands {

  const API_USER_NAME = 'next-api-user';
  const API_USER_ROLE = 'next_api_role';
  const API_USER_MAIL = 'next-api-user@domain.tld';
  const CONSUMER_NAME = 'next-drupal-consumer';

  /**
   * Generates a user and a consumer to be used to view next-drupal previews.
   *
   * @param array $options
   *   An associative array of options whose values come from cli, aliases,
   *   config, etc.
   *
   * @option secret
   *   The secret to assign to the consumer
   * @usage wunder_next-commandName --secret=somesecret
   *   Use the --secret option to set the secret for the consumer.
   *   If you leave it blank, the env var DRUPAL_CLIENT_SECRET
   *   will be used, if not available a random value will be generated.
   *
   * @command wunder_next:setup-user-and-consumer
   * @aliases wnsuac
   */
  public function setupUserAndConsumer(array $options = ['secret' => '']) {

    // For the secret, use the env var if defined, otherwise
    // generate a random value:
    $secret = $_ENV['DRUPAL_CLIENT_SECRET'] ?: base64_encode(random_bytes('20'));

    // But if a value was provided as parameter to the command,
    // use that instead:
    $secret = $options['secret'] ?: $secret;

    // Create a new user with the required role:
    $new_user = [
      'name' => self::API_USER_NAME,
      'pass' => '',
      'mail' => self::API_USER_MAIL,
      'access' => '0',
      'status' => 1,
      'roles' => [self::API_USER_ROLE],
    ];

    $account = User::create($new_user);
    try {
      $violations = $account->validate();
      // Check if the account can be created:
      if ($violations->count() > 0) {
        foreach ($violations as $violation) {
          $this->logger()->error($violation->getMessage());
          return new CommandError("Could not create a new user account with the name " . self::API_USER_NAME . ".");
        }
      }
      $account->save();
    }
    catch (EntityStorageException $e) {
      return new CommandError("Could not create a new user account with the name " . self::API_USER_NAME . ".");
    }

    /** @var \Drupal\consumers\Entity\Consumer $consumer */
    $consumer = Consumer::create([
      'client_id' => $_ENV['DRUPAL_CLIENT_ID'] ?? self::CONSUMER_NAME,
      'label' => 'Consumer for next-drupal',
      'description' => 'This consumer was created by the wunder_next:create-user-and-consumer drush command.',
      'is_default' => FALSE,
      'user_id' => $account->id(),
      'roles' => [self::API_USER_ROLE],
      'secret' => $secret,
    ]);

    try {
      $violations = $consumer->validate();
      // Check if the consumer can be created:
      if ($violations->count() > 0) {
        foreach ($violations as $violation) {
          $this->logger()->error($violation->getMessage());
          return new CommandError('Could not create a new consumer.');
        }
      }

      $consumer->save();
    }
    catch (EntityStorageException $e) {
      return new CommandError('Could not create a new consumer.');
    }

    $client_id = $consumer->getClientId();

    // Output instructions to the user:
    $this->logger()->success(dt('User and consumer created. Add these two lines to the .env file for the Next application:'));
    $this->output()->writeln("DRUPAL_CLIENT_ID=$client_id");
    $this->output()->writeln("DRUPAL_CLIENT_SECRET=$secret");
  }

}
