package actors

import akka.actor.{Actor, ActorRef, Props}

object ClientActor {

  def props(out: ActorRef) = Props(new ClientActor(GameActor(), out))

}

class ClientActor(game: ActorRef, out: ActorRef) extends Actor {

  override def aroundPreStart(): Unit = {
    game ! Subscribe
  }

  override def receive: Receive = {
    case msg: String => {
      MessageDeserializer(msg) match {
        case Some(message) => game ! message
        case _ => sys.error("unknown message")
      }
    }
    case serverMsg: ServerMessage => out ! MessageSerializer(serverMsg)
  }

}
