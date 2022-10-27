<?php

namespace Drush\Commands;

use Consolidation\AnnotatedCommand\AnnotationData;
use Consolidation\SiteAlias\SiteAliasManagerAwareInterface;
use Consolidation\SiteAlias\SiteAliasManagerAwareTrait;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Yaml\Yaml;

/**
 * Class SiltaAliasAlterCommands.
 *
 * @package Drush\Commands
 */
class SiltaAliasAlterCommands extends DrushCommands implements SiteAliasManagerAwareInterface {

    use SiteAliasManagerAwareTrait;

    /**
     * Alter feature alias.
     *
     * Silta generates environment URLs and hostnames dynamically based on the
     * branch name. This attempts to mimic the same behaviour in order to
     * dynamically target the specific Silta environment of the branch you're on.
     *
     * @param \Symfony\Component\Console\Input\InputInterface $input
     *   Input interface instance.
     * @param \Consolidation\AnnotatedCommand\AnnotationData $annotationData
     *   Annotation data.
     *
     * @hook pre-init *
     */
    public function alter(InputInterface $input, AnnotationData $annotationData) {
        $self = $this->siteAliasManager()->getSelf();

        $aliases_to_alter = ['@self.current', '@self.main'];

        if (in_array($self->name(), $aliases_to_alter)) {
            // Get branch name we're currently on.
            $branch = exec('git rev-parse --abbrev-ref HEAD');

            $environment_name = $this->prepareEnvironmentName($branch);
            $repository_name = exec('basename -s .git `git config --get remote.origin.url`');
            $project_name = $this->getProjectName();

            // If project name is not explicitly set in silta.yml then we use the
            // default - repository name.
            if (is_null($project_name)) {
                $project_name = $repository_name;
            }

            // Create new values for host and uri settings.
            $new_host = str_replace('${ENVIRONMENT}', $environment_name, $self->get('host'));
            $new_host = str_replace('${REPOSITORY}', $repository_name, $new_host);
            $new_uri = str_replace('${ENVIRONMENT}', $environment_name, $self->get('uri'));
            $new_uri = str_replace('${PROJECT}', $project_name, $new_uri);

            // Fire the missiles!
            $self->set('host', $new_host);
            $self->set('uri', $new_uri);
        }

    }

    /**
     * Prepare environment name to be used in the alias.
     *
     * Mimic what Silta does - replace all non-alphanumeric characters with
     * dahses to create environment name.
     *
     * @param string $branch
     *   Git branch name.
     *
     * @return string
     *   Environment name matching what Silta has generated.
     *
     * @see https://github.com/wunderio/charts/blob/master/drupal/templates/_domains.tpl#L4
     */
    private function prepareEnvironmentName(string $branch) {

        $environment_name = preg_replace('/[^\da-z]/i', '-', $branch);

        // If environment name exceeds 64 then we trim it to 64 chars and add
        // first chars for sha hash to it.
        if (strlen($environment_name) > 64) {
            $environment_name = substr($environment_name, 0, 64);
            $sha = hash('sha256', $environment_name);
            $prefix = substr($sha, 0, 3);
            $environment_name = $prefix . $environment_name;
        }

        // Finally make it all lowercase and return.
        return strtolower($environment_name);
    }

    /**
     * Get project name.
     *
     * Attempts to read Silta project name form silta.yml file.
     *
     * @return string|null
     *   Silta project name or NULL.
     */
    private function getProjectName() {
        $silta_config_file = 'silta/silta.yml';
        if (file_exists($silta_config_file)) {
            $silta_config = Yaml::parse(file_get_contents($silta_config_file));
            if ($project_name = $silta_config['projectName']) {
                return $project_name;
            }
        }
        return NULL;
    }

}
