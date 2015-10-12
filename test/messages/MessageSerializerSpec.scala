package messages

import org.junit.runner.RunWith
import org.scalatest.junit.JUnitRunner
import org.scalatestplus.play.PlaySpec

@RunWith(classOf[JUnitRunner])
class MessageSerializerSpec extends PlaySpec {

  "Message serializer" should {
    "generate valid JSON string for ConnectionResponse messages" in {
      val message = ConnectionResponse("name", "auth")
      val expectedString =
        "{" +
          "\"message\":\"connection_response\"," +
          "\"gen_name\":\"name\"," +
          "\"auth\":\"auth\"" +
        "}"
      MessageSerializer(message) must be (expectedString)
    }

    "generate valid JSON for PlayerMoveConfirmation messages" in {
      val message = RivalMove(2, 2)
      val expectedString =
        "{" +
          "\"message\":\"player_move_confirmation\"," +
          "\"row\":2," +
          "\"col\":2" +
        "}"
      MessageSerializer(message) must be (expectedString)
    }

    "generate valid JSON for PlayerMoveResultConfirmation messages" in {
      val message = PlayerMoveResultConfirmation(2, 2, "k")
      val expectedString =
        "{" +
          "\"message\":\"player_move_result_confirmation\"," +
          "\"row\":2," +
          "\"col\":2," +
          "\"result\":\"k\"" +
        "}"
      MessageSerializer(message) must be (expectedString)
    }

    "generate valid JSON for GameOverNotification message" in {
      val message = GameOverNotification("name")
      val expectedString =
        "{" +
          "\"message\":\"game_over\"," +
          "\"winner\":\"name\"" +
        "}"
      MessageSerializer(message) must be (expectedString)
    }

    "generate valid JSON for stateless notifications (YourTurnNotification example)" in {
      val expectedString =
        "{" +
          "\"message\":\"your_turn\"" +
        "}"
      MessageSerializer(YourTurnNotification) must be (expectedString)
    }
  }

}
