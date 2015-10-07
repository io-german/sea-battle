package messages

import org.junit.runner.RunWith
import org.scalatest.junit.JUnitRunner
import org.scalatestplus.play.PlaySpec

@RunWith(classOf[JUnitRunner])
class MessageDeserializerSpec extends PlaySpec {

  /* TODO: add more tests for invalid inputs */

  "MessageDeserializer" should {
    "correctly deserialize connection_request message" in {
      val msg =
        """
          |{
          |  "message": "connection_request",
          |  "user_name": "user"
          |}
        """.stripMargin
      MessageDeserializer(msg) must be (Some(ConnectionRequest("user")))
    }

    "correctly deserialize arrangement_finished message" in {
      val msg =
        """
          |{
          |  "message": "arrangement_finished",
          |  "gen_name": "user",
          |  "auth": "token"
          |}
        """.stripMargin
      MessageDeserializer(msg) must be (Some(ArrangementFinished("user", "token")))
    }

    "correctly deserialize player_move message" in {
      val msg =
        """
          |{
          |  "message": "player_move",
          |  "gen_name": "user",
          |  "auth": "token",
          |  "row": 2,
          |  "col": 2
          |}
        """.stripMargin
      MessageDeserializer(msg) must be (Some(PlayerMove("user", "token", 2, 2)))
    }

    "correctly deserialize player_move_result message" in {
      val msg =
        """
          |{
          |  "message": "player_move_result",
          |  "gen_name": "user",
          |  "auth": "token",
          |  "row": 2,
          |  "col": 2,
          |  "result": "k"
          |}
        """.stripMargin
      MessageDeserializer(msg) must be (Some(PlayerMoveResult("user", "token", 2, 2, "k")))
    }

    "return None in case of unknown message" in {
      val msg =
        """
          |{
          |  "message": "unknown_message"
          |}
        """.stripMargin
      MessageDeserializer(msg) must be (None)
    }
  }
}
