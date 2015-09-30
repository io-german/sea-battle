package actors

import akka.actor.{ActorRef, Actor}
import fsa._

class GameActor extends Actor {

  var sessions: Map[String, (ActorRef, FiniteStateMachine)] = Map.empty

  override def receive: Receive = {
    case ConnectionRequest(userName) =>
      processConnectionRequest(userName)

    case ArrangementFinished(genName, authToken) if isValidAuth(genName, authToken) =>
      processArrangementFinished(genName)

    case actors.PlayerMove(genName, authToken, row, col) if isValidAuth(genName, authToken) =>
      processPlayerMove(genName, row, col)

    case PlayerMoveResult(genName, authToken, row, int, result) if isValidAuth(genName, authToken) =>
      processPlayerMoveResult(genName, result)
  }

  private def processConnectionRequest(userName: String) = {
    val genName: String = _
    val authToken = _
    lazy val newSession: FiniteStateMachine = new FiniteStateMachine()

    val session = findSessionWithoutPair.getOrElse(newSession)
    val actor = sender()

    sessions += (genName ->(actor, session))

    session.op {
      case InitialState => InitialState.next(genName) /* Send simple confirmation */
      case connection: Player2Connection => connection.next(genName)
    } match {
      case Player2Connection(_) => actor ! ConnectionResponse(genName, authToken)
      case ArrangementOp(_, _, _) => actor ! ArrangementStartNotification
    }
  }

  private def processArrangementFinished(genName: String) = {
    val (actor, fsm) = ownSession(genName)

    fsm.op { case aop: ArrangementOp => aop.next(genName).next } match {
      case ArrangementOp(_, _, _) => actor ! ArrangementFinishedConfirmation
      case fsa.PlayerMove(_, currentPlayer, _) => actor ! GameStartNotification
    }
  }

  private def processPlayerMove(genName: String, row: Int, col: Int) = {
    val (_, fsm) = ownSession(genName)

    fsm.op { case pm: fsa.PlayerMove => pm.next(genName) } match {
      case PlayerMoveResponseOp(players, _, _) =>
        val (actor, _) = rivalSession(genName)

        actor ! PlayerMoveConfirmation(row, col)
    }
  }

  private def processPlayerMoveResult(genName: String, result: String) = {
    val (ownActor, fsm) = ownSession(genName)
    val (rivalActor, _) = rivalSession(genName)

    fsm.op { case pm: fsa.PlayerMoveResponseOp => pm.next(result == "k").next } match {
      case fsa.PlayerMove(_, _, _) => ownActor ! YourTurnNotification
      case GameEnd(winner) =>
        ownActor ! GameOverNotification
        rivalActor ! GameOverNotification
    }
  }

  private def findSessionWithoutPair: Option[FiniteStateMachine] = ???

  private def isValidAuth(genName: String, authToken: String): Boolean = ???

  private def ownSession(genName: String): (ActorRef, FiniteStateMachine) = ???

  private def rivalSession(genName: String): (ActorRef, FiniteStateMachine) = ???
}

/* Initial handshake */
case class ConnectionRequest(userName: String)

case class ConnectionResponse(genName: String, authToken: String)

/* Arrangement handshake */
case class ArrangementFinished(genName: String, authToken: String)

case object ArrangementFinishedConfirmation

/* Player's move */
case class PlayerMove(genName: String, authToken: String, row: Int, col: Int)

case class PlayerMoveConfirmation(row: Int, col: Int)

case class PlayerMoveResult(genName: String, authToken: String, row: Int, col: Int, result: String)

case class PlayerMoveResultConfirmation(genName: String, row: Int, col: Int, result: String)

/* Notifications */
case object ArrangementStartNotification

case object GameStartNotification

case object YourTurnNotification

case class GameOverNotification(winner: String)
