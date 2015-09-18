package controllers

import play.api.mvc._
import play.api.Play.current

class Subscription extends Controller {

  def subscribe = WebSocket.acceptWithActor[String, String] { request => out =>
    MyWebSocketActor.props(out)
  }

}
