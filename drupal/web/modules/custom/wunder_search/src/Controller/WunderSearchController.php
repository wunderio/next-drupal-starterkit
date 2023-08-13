<?php

namespace Drupal\wunder_search\Controller;

use Drupal\Core\Controller\ControllerBase;
use Elasticsearch\Client;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * Returns responses for Wunder search routes.
 */
class WunderSearchController extends ControllerBase {

  /**
   * The elasticsearch_helper.elasticsearch_client service.
   *
   * @var \Elasticsearch\Client
   */
  protected $elasticsearchClient;

  /**
   * The controller constructor.
   *
   * @param \Elasticsearch\Client $elasticsearch_client
   *   The elasticsearch_helper.elasticsearch_client service.
   */
  public function __construct(Client $elasticsearch_client) {
    $this->elasticsearchClient = $elasticsearch_client;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('elasticsearch_helper.elasticsearch_client')
    );
  }

  /**
   * Proxy the incoming search request from frontend client to elasticsearch.
   */
  public function query(Request $request): JsonResponse {
    $jsonRequest = $request->getContent();
    $params = json_decode($jsonRequest, TRUE);
    // Get the index to query for depending on the language:
    $current_language_id = $this->languageManager()->getCurrentLanguage()->getId();
    $index_name = "content-$current_language_id";

    $results = $this->elasticsearchClient->search([
      'index' => $index_name,
      'body' => $params,
    ]);

    return new JsonResponse($results);
  }

}
