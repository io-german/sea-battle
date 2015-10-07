package messages

import play.api.libs.json.Json

object MessageSerializer {

  def apply(msg: ServerMessage): String = (msg match {
    case ConnectionResponse(genName, authToken) => connectionResponse(genName, authToken)
    case PlayerMoveConfirmation(row, col) => playerMoveConfirmation(row, col)
    case PlayerMoveResultConfirmation(genName, row, col, result) => playerMoveResultConfirmation(genName, row, col, result)
    case GameOverNotification(winner) => gameOverNotification(winner)
    case other => Json.obj("message" -> other.message)
  }).toString()

  private def connectionResponse(genName: String, authToken: String) = Json.obj(
    "message" -> "connection_response",
    "gen_name" -> genName,
    "auth" -> authToken)

  private def playerMoveConfirmation(row: Int, col: Int) = Json.obj(
    "message" -> "player_move_confirmation",
    "row" -> row,
    "col" -> col)

  private def playerMoveResultConfirmation(genName: String, row: Int, col: Int, result: String) = Json.obj(
    "message" -> "player_move_result_confirmation",
    "gen_name" -> genName,
    "row" -> row,
    "col" -> col,
    "result" -> result)

  private def gameOverNotification(winner: String) = Json.obj(
    "message" -> "game_over",
    "winner" -> winner)
}
