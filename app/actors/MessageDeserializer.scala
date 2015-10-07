package actors

import play.api.libs.json._

/* TODO: use play's own from/to JSON mappers */
object MessageDeserializer {
  def apply(in: String): Option[PlayerMessage] = {
    val json = Json.parse(in)

    json \ "message" match {
      case JsDefined(JsString(message)) if message == "connection_request" => connectionRequest(json)
      case JsDefined(JsString(message)) if message == "arrangement_finished" => arrangementFinished(json)
      case JsDefined(JsString(message)) if message == "player_move" => playerMove(json)
      case JsDefined(JsString(message)) if message == "player_move_result" => playerMoveResult(json)
      case _ => None
    }
  }

  private def connectionRequest(json: JsValue): Option[ConnectionRequest] = for {
    JsString(userName) <- (json \ "user_name").toOption
  } yield ConnectionRequest(userName)

  private def arrangementFinished(json: JsValue): Option[ArrangementFinished] = for {
    JsString(genName) <- (json \ "gen_name").toOption
    JsString(authToken) <- (json \ "auth").toOption
  } yield ArrangementFinished(genName, authToken)

  private def playerMove(json: JsValue): Option[PlayerMove] = for {
    JsString(genName) <- (json \ "gen_name").toOption
    JsString(authToken) <- (json \ "auth").toOption
    JsNumber(row) <- (json \ "row").toOption
    JsNumber(col) <- (json \ "col").toOption
  } yield PlayerMove(genName, authToken, row.intValue(), col.intValue())

  private def playerMoveResult(json: JsValue): Option[PlayerMoveResult] = for {
    JsString(genName) <- (json \ "gen_name").toOption
    JsString(authToken) <- (json \ "auth").toOption
    JsNumber(row) <- (json \ "row").toOption
    JsNumber(col) <- (json \ "col").toOption
    JsString(result) <- (json \ "result").toOption
  } yield PlayerMoveResult(genName, authToken, row.intValue(), col.intValue(), result)
}
