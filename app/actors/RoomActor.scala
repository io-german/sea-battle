package actors

import akka.actor.{Terminated, Props, Actor, ActorRef}
import play.libs.Akka

class RoomActor extends Actor {
  var rooms = Set.empty[GameRoom]

  override def receive: Receive = {
    case m: Message =>
      findMate.foreach(mate => mate ! m)
    case Subscribe =>
      addPlayer()
      context watch sender
    case Terminated(player) =>
      findRoom.foreach(rooms -= _)
  }

  private def findRoom: Option[GameRoom] = rooms.find(r => r.player1 == sender || r.player2 == sender)

  private def findMate: Option[ActorRef] = {
    findRoom.flatMap(r => Option(if (r.player1 == sender) r.player2 else r.player1))
  }

  private def addPlayer(): Unit = rooms.find(_.player2 == null) match {
    case Some(room) =>
      rooms -= room
      rooms += room.copy(player2 = sender())
    case None =>
      rooms += GameRoom(sender(), null)
  }
}

object RoomActor {
  lazy val rooms = Akka.system().actorOf(Props[RoomActor])
  def apply() = rooms
}

case class GameRoom(player1: ActorRef, player2: ActorRef)

case class Message(s: String)
object Subscribe
