package actors

import java.util.concurrent.TimeUnit

import akka.actor.{ActorRef, ActorSystem}
import akka.testkit.{ImplicitSender, TestActorRef, TestKit}
import akka.util.Timeout
import fsm.{ArrangementOp, FiniteStateMachine, PlayerMoveState, State}
import messages._
import org.scalatest.BeforeAndAfterAll
import org.scalatestplus.play.PlaySpec
import util.Security


class GameActorSpec extends PlaySpec with BeforeAndAfterAll {

  implicit lazy val system = ActorSystem()
  implicit val timeout = Timeout(5, TimeUnit.SECONDS)

  val player1 = "user1"
  val player2 = "user2"

  override protected def afterAll(): Unit = {
    super.afterAll()
    system.shutdown()
  }

  "GameActor" should {
    "have empty sessions map before any actions" in {
      new TestKit(system) with ImplicitSender {
        val actor = TestActorRef[GameActor]
        val sessions = actor.underlyingActor.sessions
        sessions must be(empty)
      }
    }

    "have single session after first connection request" in {
      new TestKit(system) with ImplicitSender {
        val actor = TestActorRef[GameActor]
        actor ! ConnectionRequest("user")
        actor.underlyingActor.sessions.size must be(1)
      }
    }

    "have two sessions with the same FSM after two connection requests" in {
      new TestKit(system) with ImplicitSender {
        val actor = TestActorRef[GameActor]
        actor ! ConnectionRequest("user1")
        actor ! ConnectionRequest("user2")
        val sessions = actor.underlyingActor.sessions
        val stateMachines = sessions.map { case (_, PlayerSession(_, _, fsm)) => fsm }.toSet

        sessions.size must be(2)
        stateMachines.size must be(1)
      }
    }

    "post ConnectionResponse message after first connection request" in {
      new TestKit(system) with ImplicitSender {
        val actor = TestActorRef[GameActor]
        actor ! ConnectionRequest("user")
        expectMsgType[ConnectionResponse]
      }
    }

    "post ArrangementStart message after second connection request" in {
      new TestKit(system) with ImplicitSender {
        val actor = TestActorRef[GameActor]

        actor ! ConnectionRequest("user1")
        actor ! ConnectionRequest("user2")

        expectMsgType[ConnectionResponse]
        expectMsgType[ConnectionResponse]
        expectMsg(ArrangementStartNotification)
      }
    }

    "have five sessions and three FSMs after five connection requests" in {
      new TestKit(system) with ImplicitSender {
        val actor = TestActorRef[GameActor]
        actor ! ConnectionRequest("user1")
        actor ! ConnectionRequest("user2")
        actor ! ConnectionRequest("user3")
        actor ! ConnectionRequest("user4")
        actor ! ConnectionRequest("user5")
        val sessions = actor.underlyingActor.sessions
        val stateMachines = sessions.map { case (_, PlayerSession(_, _, fsm)) => fsm }.toSet

        sessions.size must be(5)
        stateMachines.size must be(3)
      }
    }

    "post ArrangementFinishedConfirmation message if only one player have finished the arrangement" in {
      new TestKit(system) with ImplicitSender {
        val actor = TestActorRef[GameActor]
        val state = ArrangementOp(Seq(player1, player2))
        actor.underlyingActor.sessions = initGame(player1, player2, state)

        actor ! ArrangementFinished(player1, Security.generateAuthToken(player1))
        expectMsg(ArrangementFinishedConfirmation)
      }
    }

    "post GameStartConfirmation message if both players have finished the arrangement" in {
      new TestKit(system) with ImplicitSender {
        val actor = TestActorRef[GameActor]
        val state = ArrangementOp(Seq(player1, player2), true)
        actor.underlyingActor.sessions = initGame(player1, player2, state)

        actor ! ArrangementFinished(player2, Security.generateAuthToken(player2))
        expectMsg(ArrangementFinishedConfirmation)
        expectMsg(GameStartNotification)
      }
    }

    "switch to PlayerMove state if both players have finished the arrangement" in {
      new TestKit(system) with ImplicitSender {
        val actor = TestActorRef[GameActor]
        val state = ArrangementOp(Seq(player1, player2), true)
        actor.underlyingActor.sessions = initGame(player1, player2, state)

        actor ! ArrangementFinished(player2, Security.generateAuthToken(player2))
        val PlayerSession(_, _, fsm) = actor.underlyingActor.sessions(player1)

        fsm.state mustBe a[PlayerMoveState]
      }
    }
  }

  private def initGame(player1: String, player2: String, currentOp: State)(implicit testActor: ActorRef): Map[String, PlayerSession] = {
    val fsm = new FiniteStateMachine(currentOp)
    Map(
      player1 -> PlayerSession(Some(player2), testActor, fsm),
      player2 -> PlayerSession(Some(player1), testActor, fsm))
  }
}
