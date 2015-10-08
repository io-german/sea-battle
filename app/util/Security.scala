package util

object Security {
  def generateAuthToken(userName: String): String =
    userName + "#change_me"
}
