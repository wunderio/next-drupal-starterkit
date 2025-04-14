#!/bin/bash

# Exit if no plugins specified
[ -z "$ELASTICSEARCH_PLUGINS" ] && echo "No plugins specified in ELASTICSEARCH_PLUGINS" && exit 0

echo "Installing Elasticsearch plugins: $ELASTICSEARCH_PLUGINS"
needs_restart=false

# Process each plugin
for plugin in $ELASTICSEARCH_PLUGINS; do
    # Skip if already installed
    if bin/elasticsearch-plugin list | grep -q "$plugin"; then
        echo "✓ Plugin $plugin already installed"
        continue
    fi

    # Install plugin
    echo "Installing $plugin plugin..."
    if bin/elasticsearch-plugin install "$plugin"; then
        chown -R elasticsearch:root "/usr/share/elasticsearch/plugins/$plugin" && \
        chmod -R 755 "/usr/share/elasticsearch/plugins/$plugin" && \
        echo "✓ Plugin $plugin installed successfully" && \
        needs_restart=true
    else
        echo "✗ Failed to install plugin $plugin"
        exit 1
    fi
done

# Signal for restart if needed
if [ "$needs_restart" = true ]; then
    echo "New plugins were installed. Elasticsearch needs to be restarted."

    # Create a marker file in the mounted config directory (visible to host)
    touch /mnt/ddev_config/elasticsearch/restart_needed
fi

exit 0