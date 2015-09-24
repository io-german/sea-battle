import org.junit.runner._
import org.scalatest.junit.JUnitRunner
import org.scalatestplus.play._

/**
 * add your integration spec here.
 * An integration test will fire up a whole play application in a real (or headless) browser
 */
@RunWith(classOf[JUnitRunner])
class IntegrationSpec extends PlaySpec with OneServerPerSuite with OneBrowserPerSuite with ChromeFactory {

  "Application" should {

    "work from within a browser" in  {
      go to ("http://localhost:" + port)
    }
  }
}
