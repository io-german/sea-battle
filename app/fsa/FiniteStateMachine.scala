package fsa

import scala.util.{Failure, Success, Try}

class FiniteStateMachine(var state: State = InitialState) {
  def op(suggestableOperation: State => State) = {
    Try(suggestableOperation(state)) match {
      case Success(nextState) => this.state = nextState
      case Failure(_) =>
    }

    this.state
  }
}
