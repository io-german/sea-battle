import org.junit.runner._
import org.scalatest.junit.JUnitRunner
import org.scalatestplus.play.{OneServerPerSuite, PlaySpec}
import play.api.test.Helpers._
import play.api.test._

/**
 * Add your spec here.
 * You can mock out a whole application including requests, plugins etc.
 * For more information, consult the wiki.
 */
@RunWith(classOf[JUnitRunner])
class ApplicationSpec extends PlaySpec with OneServerPerSuite {

  "Application" should {

    "send 404 on a bad request" in  {
      route(FakeRequest(GET, "/boum")) map status must be (Some(NOT_FOUND))
    }

    "render the index page" in  {
      val home = route(FakeRequest(GET, "/")).get

      status(home) must be (OK)
      contentType(home) must be (Some("text/html"))
    }
  }
}
