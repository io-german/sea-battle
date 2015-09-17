import play.sbt.PlayRunHook
import sbt._

object Gulp {
  def apply(base: File): PlayRunHook = {
    object GulpProcess extends PlayRunHook {
      override def beforeStarted(): Unit = {
        Process("gulp dist", base).run()
      }
    }

    GulpProcess
  }
}
