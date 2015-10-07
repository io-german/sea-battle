package messages

sealed abstract class PlayerMessage(val message: String)
case class ConnectionRequest(userName: String) extends PlayerMessage("connection_request")
case class ArrangementFinished(genName: String, authToken: String) extends PlayerMessage("arrangement_finished")
case class PlayerMove(genName: String, authToken: String, row: Int, col: Int) extends PlayerMessage("player_move")
case class PlayerMoveResult(genName: String, authToken: String, row: Int, col: Int, result: String) extends PlayerMessage("player_move_result")
