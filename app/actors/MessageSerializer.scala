package actors

import play.api.libs.json.{JsValue, Json}

object MessageSerializer {

  def apply(msg: ServerMessage): String = (msg match {
    case ConnectionResponse(genName, authToken) => connectionResponse(genName, authToken)
    case ArrangementFinishedConfirmation => arrangementFinishedConfirmation
    case PlayerMoveConfirmation(row, col) => playerMoveConfirmation(row, col)
    case PlayerMoveResultConfirmation(genName, row, col, result) => playerMoveResultConfirmation(genName, row, col, result)
    case ArrangementStartNotification => arrangementStartNotification
    case GameStartNotification => gameStartNotification
    case YourTurnNotification => yourTurnNotification
    case GameOverNotification(winner) => gameOverNotification(winner)
  }).toString()

  private def connectionResponse(genName: String, authToken: String) = Json.obj(
    "message" -> "connection_response",
    "gen_name" -> genName,
    "auth" -> authToken)

  private lazy val arrangementFinishedConfirmation: JsValue = Json.obj(
    "message" -> "arrangement_finished")

  private def playerMoveConfirmation(row: Int, col: Int) = Json.obj(
    "message" -> "player_move_confirmation",
    "row" -> row,
    "col" -> col)

  private def playerMoveResultConfirmation(genName: String, row: Int, col: Int, result: String) = Json.obj(
    "message" -> "player_move_result_confirmation",
    "genName" -> genName,
    "row" -> row,
    "col" -> col,
    "result" -> result)

  private lazy val arrangementStartNotification = Json.obj(
    "message" -> "arrangement_start")

  private lazy val gameStartNotification = Json.obj(
    "message" -> "game_start")

  private lazy val yourTurnNotification = Json.obj(
    "message" -> "your_turn")

  private def gameOverNotification(winner: String) = Json.obj(
    "message" -> "game_over",
    "winner" -> winner)
}
