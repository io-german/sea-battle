package fsm

import scala.util.Random

sealed trait State
sealed trait OperationVertex[I, O <: State] extends State {
  def next(inputData: I): O
}
sealed trait ConditionalVertex[O1 <: State, O2 <: State] extends State {
  def output1: O1
  def output2: O2
  def predicate: Boolean

  def next =
    if (predicate) output1
    else output2
}
sealed trait EndVertex extends State

case object InitialState extends OperationVertex[String, Player2Connection] {
  override def next(player1: String): Player2Connection = Player2Connection(player1)
}

case class Player2Connection(player1: String) extends OperationVertex[String, ArrangementOp] {
  override def next(player2: String): ArrangementOp = ArrangementOp(Seq(player1, player2))
}

case class ArrangementOp(players: Seq[String], player1Finished: Boolean = false, player2Finished: Boolean = false) extends OperationVertex[String, ArrangementCond] {
  override def next(finishedPlayer: String): ArrangementCond = {
    val player1 :: player2 :: _ = players

    if (player1 == finishedPlayer) ArrangementCond(players, true, this.player2Finished)
    else if (player2 == finishedPlayer) ArrangementCond(players, this.player1Finished, true)
    else sys.error("Unexpected player finishes the arrangement")
  }
}

case class ArrangementCond(players: Seq[String], player1Finished: Boolean = false, player2Finished: Boolean = false, random: Random = Random) extends ConditionalVertex[PlayerMoveState, ArrangementOp] {
  override def predicate = player1Finished && player2Finished

  override def output1: PlayerMoveState = PlayerMoveState(players, random.nextInt(1))

  override def output2: ArrangementOp = ArrangementOp(players, player1Finished, player2Finished)
}

case class PlayerMoveState(players: Seq[String], currentPlayer: Int, deadShips: Seq[Int] = Seq(0, 0)) extends OperationVertex[String, PlayerMoveResponseOp] {
  def next(movingPlayer: String): PlayerMoveResponseOp = {
    if (movingPlayer != players(currentPlayer)) sys.error("")

    PlayerMoveResponseOp(players, deadShips, currentPlayer)
  }
}

case class PlayerMoveResponseOp(players: Seq[String], deadShips: Seq[Int], currentPlayer: Int) extends OperationVertex[Boolean, PlayerMoveResponseCond] {
  override def next(shipKilled: Boolean): PlayerMoveResponseCond = {
    val opponentIndex = 1 - currentPlayer
    val opponentDeadShips = deadShips(opponentIndex)
    val deadShipDiff = if (shipKilled) 1 else 0
    val newDeadShipCount = opponentDeadShips + deadShipDiff
    val newDeadShips = deadShips.patch(opponentIndex, Seq(newDeadShipCount), 1)

    PlayerMoveResponseCond(players, newDeadShips, currentPlayer)
  }
}

case class PlayerMoveResponseCond(players: Seq[String], deadShips: Seq[Int], currentPlayer: Int) extends ConditionalVertex[GameEnd, PlayerMoveState] {
  val opponentIndex = 1 - currentPlayer

  override def predicate: Boolean = deadShips(opponentIndex) == 10

  override def output1: GameEnd = GameEnd(players(currentPlayer))

  override def output2: PlayerMoveState = PlayerMoveState(players, opponentIndex, deadShips)
}

case class GameEnd(winner: String) extends EndVertex
