package actors

import akka.actor.{Actor, ActorRef, Props}

object ClientActor {

  def props(out: ActorRef) = Props(new ClientActor(RoomActor(), out))

}

class ClientActor(rooms: ActorRef, out: ActorRef) extends Actor {

  override def aroundPreStart(): Unit = {
    rooms ! Subscribe
  }

  override def receive: Receive = {
    case msg: String =>
      rooms ! Message(msg)
    case Message(s) =>
      out ! s
  }

}
