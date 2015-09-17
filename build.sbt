import play.sbt.PlayImport.PlayKeys.playRunHooks

name := """sea-battle"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.11.6"

libraryDependencies ++= Seq(
  jdbc,
  cache,
  ws,
  specs2 % Test
)

resolvers += "scalaz-bintray" at "http://dl.bintray.com/scalaz/releases"

// Play provides two styles of routers, one expects its actions to be injected, the
// other, legacy style, accesses its actions statically.
routesGenerator := InjectedRoutesGenerator

// Hooks for run, clean and dist targets
playRunHooks <+= baseDirectory.map(base => Gulp(base))

val beforeDistTask = TaskKey[Unit]("before-dist")

beforeDistTask := {
  Process("gulp dist") !
}

val assetsCleanup = TaskKey[Unit]("assets-cleanup")

assetsCleanup := {
  Process("gulp clean") !
}

val jsTestsRun = TaskKey[Unit]("js-tests-run")

jsTestsRun := {
  Process("gulp test") !
}

dist <<= dist dependsOn beforeDistTask

clean <<= clean dependsOn assetsCleanup

(test in Test) <<= (test in Test) dependsOn jsTestsRun
