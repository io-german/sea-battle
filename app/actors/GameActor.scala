package actors

import akka.actor.{Props, ActorRef, Actor}
import fsm._
import messages._
import play.libs.Akka
import util.Security

import scala.annotation.tailrec

object GameActor {
  lazy val actor = Akka.system().actorOf(Props[GameActor])

  def apply() = actor
}

case class PlayerSession(rival: Option[String], actor: ActorRef, fsm: FiniteStateMachine)

class GameActor extends Actor {

  var sessions: Map[String, PlayerSession] = Map.empty

  override def receive: Receive = {
    case ConnectionRequest(userName) =>
      processConnectionRequest(userName)

    case ArrangementFinished(genName, authToken) if isValidAuth(genName, authToken) =>
      processArrangementFinished(genName)

    case PlayerMove(genName, authToken, row, col) if isValidAuth(genName, authToken) =>
      processPlayerMove(genName, row, col)

    case PlayerMoveResult(genName, authToken, row, col, result) if isValidAuth(genName, authToken) =>
      processPlayerMoveResult(genName, row, col, result)
  }

  private def processConnectionRequest(userName: String) = {
    val genName: String = generateName(userName)
    val authToken: String = Security.generateAuthToken(genName)
    val actor = sender()

    lazy val newMachine: FiniteStateMachine = new FiniteStateMachine()
    lazy val newSession: PlayerSession = PlayerSession(None, actor, newMachine)

    val session = findSessionWithoutPair match {
      case Some((rivalName, rivalSession)) =>
        val ownSession = newSession.copy(rival = Some(rivalName), fsm = rivalSession.fsm)
        sessions += rivalName -> rivalSession.copy(rival = Some(genName))
        sessions += genName -> ownSession
        ownSession
      case None =>
        sessions += genName -> newSession
        newSession
    }

    val nextStage = session.fsm.op {
      case InitialState => InitialState.next(genName)
      case connection: Player2Connection => connection.next(genName)
    }

    actor ! ConnectionResponse(genName, authToken)

    nextStage match {
      case ArrangementOp(_, _, _) =>
        rivalActor(genName) ! ArrangementStartNotification
        actor ! ArrangementStartNotification
      case _ =>
    }
  }

  private def processArrangementFinished(genName: String) = {
    val PlayerSession(_, actor, fsm) = ownSession(genName)

    val nextStep = fsm.op { case aop: ArrangementOp => aop.next(genName).next }

    actor ! ArrangementFinishedConfirmation

    nextStep match {
      case PlayerMoveState(_, currentPlayer, _) =>
        rivalActor(genName) ! GameStartNotification
        actor ! GameStartNotification
      case _ =>
    }
  }

  private def processPlayerMove(genName: String, row: Int, col: Int) = {
    val PlayerSession(_, _, fsm) = ownSession(genName)

    val newState = fsm.op { case pm: PlayerMoveState => pm.next(genName) }

    newState match {
      case PlayerMoveResponseOp(players, _, _) =>
        val PlayerSession(_, rivalActor, _) = rivalSession(genName)
        rivalActor ! PlayerMoveConfirmation(row, col)
    }
  }

  private def processPlayerMoveResult(genName: String, row: Int, col: Int, result: String) = {
    val PlayerSession(_, ownActor, fsm) = ownSession(genName)
    val PlayerSession(_, rivalActor, _) = rivalSession(genName)

    val newState = fsm.op { case pm: PlayerMoveResponseOp => pm.next(result == "k").next }

    newState match {
      case PlayerMoveState(_, _, _) =>
        rivalActor ! PlayerMoveResultConfirmation(row, col, result)
        ownActor ! YourTurnNotification
      case GameEnd(winner) =>
        ownActor ! GameOverNotification(winner)
        rivalActor ! GameOverNotification(winner)
    }
  }

  private def findSessionWithoutPair: Option[(String, PlayerSession)] =
    sessions.find { case (_, session) => session.rival.isEmpty }

  private def ownSession(genName: String): PlayerSession =
    sessions(genName)

  private def rivalSession(genName: String): PlayerSession = {
    val PlayerSession(rivalOpt, _, _) = ownSession(genName)

    rivalOpt match {
      case Some(rival) => ownSession(rival)
      case None => sys.error("No rival")
    }
  }

  private def rivalActor(genName: String): ActorRef = {
    val PlayerSession(_, actor, _) = rivalSession(genName)
    actor
  }

  @tailrec private def generateName(suggestedName: String): String = sessions.get(suggestedName) match {
    case Some(_) => generateName(suggestedName + System.currentTimeMillis)
    case None => suggestedName
  }

  private def isValidAuth(genName: String, authToken: String): Boolean =
    Security.generateAuthToken(genName) == authToken
}
