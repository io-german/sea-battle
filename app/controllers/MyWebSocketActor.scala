package controllers

import akka.actor.{Actor, ActorRef, Props}

object MyWebSocketActor {

  def props(out: ActorRef) = Props(new MyWebSocketActor(out))

}

class MyWebSocketActor(out: ActorRef) extends Actor {

  override def receive: Receive = {
    case msg: String =>
      out ! s"I received you message: $msg"
  }

}
