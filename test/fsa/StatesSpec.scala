package fsa

import org.junit.runner.RunWith
import org.scalatest.junit.JUnitRunner
import org.scalatestplus.play.PlaySpec

import scala.util.Random

@RunWith(classOf[JUnitRunner])
class StatesSpec extends PlaySpec {

  val players = Seq("vasya", "petya")

  "Initial state" should {
    "produce Player2Connection state" in {
      InitialState.next("vasya") must be (Player2Connection("vasya"))
    }
  }

  "Player2Connextion state" should {
    "produce ArrangementOp state" in {
      Player2Connection("vasya").next("petya") must be (ArrangementOp(Seq("vasya", "petya")))
    }
  }

  "ArrangementOp state" should {
    "produce ArrangementCond state if 1st player finishes arrangement first" in {
      val initialState = ArrangementOp(players)
      val expectedState = ArrangementCond(players, true, false)

      initialState.next("vasya") must be (expectedState)
    }

    "produce ArrangementCond state if 2nd player finishes arrangement first" in {
      val initialState = ArrangementOp(players)
      val expectedState = ArrangementCond(players, false, true)

      initialState.next("petya") must be (expectedState)
    }

    "produce ArrangementCond state if both players finished an arrangement" in {
      val initialState = ArrangementOp(players, true)
      val expectedState = ArrangementCond(players, true, true)

      initialState.next("petya") must be (expectedState)
    }

    "throw an exception if invalid user name is used" in {
      a [RuntimeException] must be thrownBy ArrangementOp(players).next("kolya")
    }
  }

  "ArrangementCond state" should {
    "produce ArrangementOp if only first user finished an arrangement" in {
      val initialState = ArrangementCond(players, true, false)
      val expectedState = ArrangementOp(players, true, false)

      initialState.next must be (expectedState)
    }

    "produce ArrangementOp if only second user finished an arrangement" in {
      val initialState = ArrangementCond(players, false, true)
      val expectedState = ArrangementOp(players, false, true)

      initialState.next must be (expectedState)
    }

    "produce PlayerMove state if both players finished an arrangement" in {
      val random = new Random {
        override def nextInt(n: Int): Int = 0
      }
      val initialState = ArrangementCond(players, true, true)
      val expectedState = PlayerMove(players, 0)
    }
  }

  "PlayerMove state" should {
    "produce PlayerMoveResponseOp state" in {
      val initialState = PlayerMove(players, 0)
      val expectedState = PlayerMoveResponseOp(players, Seq(0, 0), 0)

      initialState.next("vasya") must be (expectedState)
    }

    "throw an exception if wrong player tries to move" in {
      val initialState = PlayerMove(players, 0)
      a [RuntimeException] must be thrownBy initialState.next("petya")
    }
  }

  "PlayerMoveResponseOp state" should {
    "produce PlayerMoveResponseCond state with same amount of ships if ship was not killed" in {
      val initialState = PlayerMoveResponseOp(players, Seq(0, 0), 0)
      val expectedState = PlayerMoveResponseCond(players, Seq(0, 0), 0)

      initialState.next(false) must be (expectedState)
    }

    "produce PlayerMoveResponseCond with increased amount of ships if ship was killed by 1st player" in {
      val initialState = PlayerMoveResponseOp(players, Seq(0, 0), 0)
      val expectedState = PlayerMoveResponseCond(players, Seq(0, 1), 0)

      initialState.next(true) must be (expectedState)
    }

    "produce PlayerMoveResponseCond with increased amount of ships if ship was killed by 2nd player" in {
      val initialState = PlayerMoveResponseOp(players, Seq(0, 0), 1)
      val expectedState = PlayerMoveResponseCond(players, Seq(1, 0), 1)

      initialState.next(true) must be (expectedState)
    }
  }

  "PlayerMoveResponseCond state" should {
    "produce PlayerMove state if game is not over yet and it was 1st player's move" in {
      val initialState = PlayerMoveResponseCond(players, Seq(0, 0), 0)
      val expectedState = PlayerMove(players, 1, Seq(0, 0))

      initialState.next must be (expectedState)
    }

    "produce PlayerMove state if game is not over yet and it was 2st player's move" in {
      val initialState = PlayerMoveResponseCond(players, Seq(0, 0), 1)
      val expectedState = PlayerMove(players, 0, Seq(0, 0))

      initialState.next must be (expectedState)
    }

    "produce GameEnd state if game is over and it was 1st player's move" in {
      val initialState = PlayerMoveResponseCond(players, Seq(9, 10), 0)
      val expectedState = GameEnd("vasya")

      initialState.next must be (expectedState)
    }

    "produce GameEnd state if game is over and it was 2st player's move" in {
      val initialState = PlayerMoveResponseCond(players, Seq(10, 9), 1)
      val expectedState = GameEnd("petya")

      initialState.next must be (expectedState)
    }
  }

}
