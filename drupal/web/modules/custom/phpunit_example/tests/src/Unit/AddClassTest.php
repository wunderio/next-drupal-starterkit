<?php

namespace Drupal\Tests\phpunit_example\Unit;

use Drupal\phpunit_example\AddClass;
use Drupal\Tests\UnitTestCase;

/**
 * AddClass units tests.
 *
 * This test case demonstrates the following PHPUnit annotations:
 * - dataProvider
 * - expectedException.
 *
 * PHPUnit looks for classes with names ending in 'Test'. Then it
 * looks to see whether that class is a subclass of
 * \PHPUnit_Framework_TestCase. Drupal supplies us with
 * Drupal\Tests\UnitTestCase, which is a subclass of
 * \PHPUnit_Framework_TestCase. So yay, PHPUnit will find this class.
 *
 * In unit testing, there should be as few dependencies as possible.
 * We want the smallest number of moving parts to be interacting in
 * our test, or we won't be sure where the errors are, or whether our
 * tests passed by accident.
 *
 * So with that in mind, it's up to us to build out whatever
 * dependencies we need. In the case of AddClass, our needs are meager;
 * we only want an instance of AddClass so we can test its add() method.
 *
 * @ingroup phpunit_example
 *
 * @group phpunit_example
 * @group examples
 */
class AddClassTest extends UnitTestCase {

  /**
   * Very simple test of AddClass::add().
   *
   * This is a very simple unit test of a single method. It has
   * a single assertion, and that assertion is probably going to
   * pass. It ignores most of the problems that could arise in the
   * method under test, so therefore: It is not a very good test.
   */
  public function testAdd() {
    $sut = new AddClass();
    $this->assertEquals($sut->add(2, 3), 5);
  }

  /**
   * Test AddClass::add() with a data provider method.
   *
   * This method is very similar to testAdd(), but uses a data provider method
   * to test with a wider range of data.
   *
   * You can tell PHPUnit which method is the data provider using the
   * '@dataProvider' annotation.
   *
   * The data provider method just returns a big array of arrays of arguments.
   * That is, for each time you want this test method run, the data provider
   * should create an array of arguments for this method. In this case, it's
   * $expected, $a, and $b. So one set of arguments would look a bit like this
   * pseudocode:
   *
   * @code
   * [ valueForExpected, valueForA, valueForB ]
   * @endcode
   *
   * It would then wrap this up in a higher-level array, so that PHPUnit can
   * loop through them, like this pseudocode:
   *
   * @code
   * return [ [first, set], [next, set] ];
   * @endcode
   *
   * This test has a better methodology than testAdd(), because it can easily
   * be adapted by other developers, and because it tries more than one data
   * set. This test is much better than testAdd(), although it still only
   * tests 'good' data. When combined with testAddWithBadDataProvider(),
   * we get a better picture of the behavior of the method under test.
   *
   * @dataProvider addDataProvider
   *
   * @see self::addDataProvider()
   */
  public function testAddWithDataProvider($expected, $a, $b) {
    $sut = new AddClass();
    $this->assertEquals($expected, $sut->add($a, $b));
  }

  /**
   * Test AddClass::add() with data that should throw an exception.
   *
   * This method is similar to testAddWithDataProvider(), but the data
   * provider gives us data that should throw an exception.
   *
   * This test uses the setExpectedException() method to tell PHPUnit that
   * a thrown exception should pass the test. You specify a
   * fully-qualified exception class name. If you specify \Exception, PHPUnit
   * will pass any exception, whereas a more specific subclass of \Exception
   * will require that exception type to be thrown.
   *
   * Alternately, you can use try and catch blocks with assertions in order
   * to test exceptions. We won't demonstrate that here; it's a much better
   * idea to test your exceptions with setExpectedException().
   *
   * @dataProvider addBadDataProvider
   *
   * @see self::addBadDataProvider()
   */
  public function testAddWithBadDataProvider($a, $b) {
    $sut = new AddClass();
    $this->expectException(\InvalidArgumentException::class);
    $sut->add($a, $b);
  }

  /**
   * Data provider for testAddWithDataProvider().
   *
   * Data provider methods take no arguments and return an array of data
   * to use for tests. Each element of the array is another array, which
   * corresponds to the arguments in the test method's signature.
   *
   * Note also that PHPUnit tries to run tests using methods that begin
   * with 'test'. This means that data provider method names should not
   * begin with 'test'. Also, by convention, they should end with
   * 'DataProvider'.
   *
   * @return array
   *   Nested arrays of values to check:
   *   - $a
   *   - $b
   *   - $expected
   *
   * @see self::testAddWithDataProvider()
   */
  public function addDataProvider() {
    return [
      [5, 2, 3],
      [50, 20, 30],
    ];
  }

  /**
   * Data provider for testAddWithBadDataProvider().
   *
   * Since AddClass::add() can throw exceptions, it's time
   * to give it some data that will cause these exceptions.
   *
   * add() should throw exceptions if either of it's arguments are
   * not numeric, and we will generate some test data to prove that
   * this is what it actually does.
   *
   * @see self::testAddWithBadDataProvider()
   */
  public function addBadDataProvider() {
    $bad_data = [];
    // Set up an array with data that should cause add()
    // to throw an exception.
    $bad_data_types = ['string', FALSE, ['foo'], new \stdClass()];
    // Create some data where both $a and $b are bad types.
    foreach ($bad_data_types as $bad_datum_a) {
      foreach ($bad_data_types as $bad_datum_b) {
        $bad_data[] = [$bad_datum_a, $bad_datum_b];
      }
    }
    // Create some data where $a is good and $b is bad.
    foreach ($bad_data_types as $bad_datum_b) {
      $bad_data[] = [1, $bad_datum_b];
    }
    // Create some data where $b is good and $a is bad.
    foreach ($bad_data_types as $bad_datum_a) {
      $bad_data[] = [$bad_datum_a, 1];
    }
    return $bad_data;
  }

}
