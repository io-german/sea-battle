package actors

import akka.actor.{Props, ActorRef, Actor}
import fsa._
import play.libs.Akka

import scala.annotation.tailrec

object GameActor {
  lazy val actor = Akka.system().actorOf(Props[GameActor])

  def apply() = actor
}

case class PlayerSession(rival: Option[String], actor: ActorRef, fsm: FiniteStateMachine)

class GameActor extends Actor {

  var registeredActors: Set[ActorRef] = Set.empty
  var sessions: Map[String, PlayerSession] = Map.empty

  override def receive: Receive = {
    case Subscribe =>
      registeredActors += sender()

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
    val genName: String = generateName(userName)
    val authToken: String = generateAuthToken(genName)
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
      case fsa.PlayerMove(_, currentPlayer, _) =>
        rivalActor(genName) ! GameStartNotification
        actor ! GameStartNotification
      case _ =>
    }
  }

  private def processPlayerMove(genName: String, row: Int, col: Int) = {
    val PlayerSession(_, _, fsm) = ownSession(genName)

    fsm.op { case pm: fsa.PlayerMove => pm.next(genName) } match {
      case PlayerMoveResponseOp(players, _, _) =>
        val PlayerSession(_, rivalActor, _) = rivalSession(genName)
        rivalActor ! PlayerMoveConfirmation(row, col)
    }
  }

  private def processPlayerMoveResult(genName: String, result: String) = {
    val PlayerSession(_, ownActor, fsm) = ownSession(genName)
    val PlayerSession(_, rivalActor, _) = rivalSession(genName)

    fsm.op { case pm: fsa.PlayerMoveResponseOp => pm.next(result == "k").next } match {
      case fsa.PlayerMove(_, _, _) =>
        ownActor ! YourTurnNotification
      case GameEnd(winner) =>
        ownActor ! GameOverNotification
        rivalActor ! GameOverNotification
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

  /* TODO: change this method */
  private def generateAuthToken(genName: String): String = genName + "#auth_change_me"

  private def isValidAuth(genName: String, authToken: String): Boolean =
    generateAuthToken(genName) == authToken
}

trait PlayerMessage

trait ServerMessage

/* Initial handshake */
case class ConnectionRequest(userName: String) extends PlayerMessage

case class ConnectionResponse(genName: String, authToken: String) extends ServerMessage

/* Arrangement handshake */
case class ArrangementFinished(genName: String, authToken: String) extends PlayerMessage

case object ArrangementFinishedConfirmation extends ServerMessage

/* Player's move */
case class PlayerMove(genName: String, authToken: String, row: Int, col: Int) extends PlayerMessage

case class PlayerMoveConfirmation(row: Int, col: Int) extends ServerMessage

case class PlayerMoveResult(genName: String, authToken: String, row: Int, col: Int, result: String) extends PlayerMessage

case class PlayerMoveResultConfirmation(genName: String, row: Int, col: Int, result: String) extends ServerMessage

/* Notifications */
case object ArrangementStartNotification extends ServerMessage

case object GameStartNotification extends ServerMessage

case object YourTurnNotification extends ServerMessage

case class GameOverNotification(winner: String) extends ServerMessage
