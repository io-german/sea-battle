package messages

sealed abstract class ServerMessage(val message: String)
case class ConnectionResponse(genName: String, authToken: String) extends ServerMessage("connection_response")
case object ArrangementFinishedConfirmation extends ServerMessage("arrangement_finished_confirmation")
case class PlayerMoveConfirmation(row: Int, col: Int) extends ServerMessage("player_move_confirmation")
case class PlayerMoveResultConfirmation(genName: String, row: Int, col: Int, result: String) extends ServerMessage("player_move_result_confirmation")
case object ArrangementStartNotification extends ServerMessage("arrangement_start")
case object GameStartNotification extends ServerMessage("game_start")
case object YourTurnNotification extends ServerMessage("your_turn")
case class GameOverNotification(winner: String) extends ServerMessage("game_over")
