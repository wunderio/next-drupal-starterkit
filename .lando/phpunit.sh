#!/bin/sh
set -exu

# Configure PHPUnit tests for the Lando environment.
# @see: https://agile.coop/blog/drupal-phpunit-tests-lando/
#
# Initially this was part of lando build process but we decided
# to commit the phpunit.xml. Still the functionality of this
# script could be useful as it always gets the latest distributed
# configuration from core. From time to time it wouldn't hurt
# try and update the file with 'lando regenerate-phpunit-config'.

PHPUNIT_CONFIG=/app/drupal/phpunit.xml

if [ -f "$PHPUNIT_CONFIG" ]; then
  rm "$PHPUNIT_CONFIG"
fi

cd /app/drupal
cp -n web/core/phpunit.xml.dist "$PHPUNIT_CONFIG"
sed -i 's|tests\/bootstrap\.php|./web/core/tests/bootstrap.php|g' "$PHPUNIT_CONFIG"
sed -i 's|\.\/tests\/|./web/core/tests/|g' "$PHPUNIT_CONFIG"
sed -i 's|directory>\.\/|directory>./web/core/|g' "$PHPUNIT_CONFIG"
sed -i 's|directory>\.\.\/|directory>./web/core/|g' "$PHPUNIT_CONFIG"
sed -i 's|<env name="SIMPLETEST_BASE_URL" value=""\/>|<env name="SIMPLETEST_BASE_URL" value="http://appserver_nginx" force="true"/>|g' "$PHPUNIT_CONFIG"
sed -i 's|<env name="SIMPLETEST_DB" value=""\/>|<env name="SIMPLETEST_DB" value="sqlite://localhost/tmp/db.sqlite"/>|g' "$PHPUNIT_CONFIG"
sed -i 's|<file>.\/web\/core\/tests\/TestSuites\/UnitTestSuite.php<\/file>|<directory>.\/web\/modules\/custom\/*\/tests\/src\/Unit<\/directory>|g' "$PHPUNIT_CONFIG"
sed -i 's|<file>.\/web\/core\/tests\/TestSuites\/KernelTestSuite.php<\/file>|<directory>.\/web\/modules\/custom\/*\/tests\/src\/Kernel<\/directory>|g' "$PHPUNIT_CONFIG"
sed -i 's|<file>.\/web\/core\/tests\/TestSuites\/FunctionalTestSuite.php<\/file>|<directory>.\/web\/modules\/custom\/*\/tests\/src\/Functional<\/directory>|g' "$PHPUNIT_CONFIG"
sed -i 's|<file>.\/web\/core\/tests\/TestSuites\/FunctionalJavascriptTestSuite.php<\/file>|<directory>.\/web\/modules\/custom\/*\/tests\/src\/FunctionalJavascript<\/directory>|g' "$PHPUNIT_CONFIG"
sed -i '/<file>.\/web\/core\/tests\/TestSuites\/BuildTestSuite.php<\/file>/d' "$PHPUNIT_CONFIG"
vendor/bin/phpunit --migrate-configuration
rm phpunit.xml.bak
