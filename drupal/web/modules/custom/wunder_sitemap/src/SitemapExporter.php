<?php

namespace Drupal\wunder_sitemap;

use Drupal\Core\Entity\EntityStorageException;
use Drupal\Core\File\FileSystemInterface;
use Drupal\Core\Logger\LoggerChannelInterface;
use Drupal\file\FileRepositoryInterface;
use Drupal\file\FileUsage\DatabaseFileUsageBackend;
use Drupal\simple_sitemap\Manager\Generator;

/**
 * Contains methods to export a sitemap to a file.
 */
class SitemapExporter {

  /**
   * Drupal\Core\Logger\LoggerChannelInterface definition.
   *
   * @var \Drupal\Core\Logger\LoggerChannelInterface
   */
  protected LoggerChannelInterface $loggerChannel;

  /**
   * Drupal\simple_sitemap\Manager\Generator definition.
   *
   * @var \Drupal\simple_sitemap\Manager\Generator
   */
  protected Generator $simpleSitemapGenerator;

  /**
   * Drupal\file\FileRepositoryInterface definition.
   *
   * @var \Drupal\file\FileRepositoryInterface
   */
  protected FileRepositoryInterface $fileRepository;

  /**
   * Drupal\file\FileUsage\DatabaseFileUsageBackend definition.
   *
   * @var \Drupal\file\FileUsage\DatabaseFileUsageBackend
   */
  protected DatabaseFileUsageBackend $fileUsageBackend;

  /**
   * Constructs a new TeklacomSitemapExporter object.
   */
  public function __construct(LoggerChannelInterface $logger_channel_wunder_sitemap, Generator $simple_sitemap_generator, FileRepositoryInterface $fileRepository, DatabaseFileUsageBackend $fileUsageBackend) {
    $this->loggerChannel = $logger_channel_wunder_sitemap;
    $this->simpleSitemapGenerator = $simple_sitemap_generator;
    $this->fileRepository = $fileRepository;
    $this->fileUsageBackend = $fileUsageBackend;
  }

  /**
   * Exports a sitemap (created by the simple_sitemap module) to a file.
   *
   * @param string $variant
   *   The variant of the sitemap, according to simple_sitemap config.
   * @param string $filepath
   *   The path to save the file to.
   */
  public function exportSitemapToFile(string $variant, string $filepath): void {
    // Get the current sitemap:
    $output = $this->simpleSitemapGenerator->setSitemaps($variant)->getContent();

    // Check that it's not empty:
    if (empty($output)) {
      $this->loggerChannel->error('No sitemap content found for the variant: @variant', [
        '@variant' => $variant,
      ]);
      return;
    }
    // Delete the existing file:
    try {
      $file = $this->fileRepository->loadByUri($filepath);
      $file?->delete();
    }
    catch (EntityStorageException $e) {
      $this->loggerChannel->error('Error deleting existing sitemap file: @error', [
        '@error' => $e->getMessage(),
      ]);
    }
    // Save a new file with the contents:
    try {
      $sitemap_file = $this->fileRepository->writeData($output, $filepath, FileSystemInterface::EXISTS_REPLACE);
      $sitemap_file->setPermanent();
      $this->fileUsageBackend->add($sitemap_file, 'wunder_sitemap', 'sitemap', 1);
      $this->loggerChannel->info('Sitemap exported to the filepath: @filepath', [
        '@filepath' => $filepath,
      ]);
    }
    catch (EntityStorageException $e) {
      $this->loggerChannel->error('Error exporting sitemap: @error', [
        '@error' => $e->getMessage(),
      ]);
    }
  }

}
