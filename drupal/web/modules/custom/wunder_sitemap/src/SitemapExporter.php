<?php

namespace Drupal\wunder_sitemap;

use Drupal\Core\File\Exception\FileException;
use Drupal\Core\File\FileSystemInterface;
use Drupal\Core\Logger\LoggerChannelInterface;
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
  protected LoggerChannelInterface $loggerChannelTeklacomSitemap;

  /**
   * Drupal\simple_sitemap\Manager\Generator definition.
   *
   * @var \Drupal\simple_sitemap\Manager\Generator
   */
  protected Generator $simpleSitemapGenerator;

  /**
   * Drupal\Core\File\FileSystem definition.
   *
   * @var \Drupal\Core\File\FileSystemInterface
   */
  protected FileSystemInterface $fileSystem;

  /**
   * Constructs a new TeklacomSitemapExporter object.
   */
  public function __construct(LoggerChannelInterface $logger_channel_wunder_sitemap, Generator $simple_sitemap_generator, FileSystemInterface $fileSystem) {
    $this->loggerChannelTeklacomSitemap = $logger_channel_wunder_sitemap;
    $this->simpleSitemapGenerator = $simple_sitemap_generator;
    $this->fileSystem = $fileSystem;
  }

  /**
   * Exports a sitemap (created by the simple_sitemap module to a file)
   *
   * @param string $variant
   *   The variant of the sitemap, according to simple_sitemap config.
   * @param string $filepath
   *   The path to save the file to.
   */
  public function exportSitemapToFile($variant, $filepath): void {
    // Get the current sitemap:
    $output = $this->simpleSitemapGenerator->setVariants($variant)->getContent();
    // Delete the existing file, otherwise s3 will not overwrite it:
    try {
      $this->fileSystem->delete($filepath);
    }
    catch (FileException $e) {
      $this->loggerChannelTeklacomSitemap->error('Error deleting existing sitemap file: @error', [
        '@error' =>
        $e->getMessage(),
      ]);
    }
    // Save a new file with the contents:
    $saved_path = $this->fileSystem->saveData($output, $filepath, $this->fileSystem::EXISTS_REPLACE);
    if ($saved_path) {
      $this->loggerChannelTeklacomSitemap->info('Sitemap exported to the filepath: @filepath', [
        '@filepath' =>
        $saved_path,
      ]);
    }
    else {
      $this->loggerChannelTeklacomSitemap->error('Sitemap could not be exported to the requested filepath: @requested_filepath', [
        '@requested_filepath' =>
        $filepath,
      ]);
    }
  }

}
