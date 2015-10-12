import { pubsub } from '../util/pubsub.js';
import setText from './setText.js';

export default function () {
  pubsub.subscribe('connection_response', (data) => setText(`You have been registered with name ${data.gen_name}`));

  pubsub.subscribe('arrangement_finished_confirmation', () => setText('Arrangement finished. Waiting for opponent...'));

  pubsub.subscribe('arrangement_start', () => setText('Arrangement started'));

  pubsub.subscribe('game_over', (data) => setText(`Game is over. Player ${data.winner} has won.`));

  pubsub.subscribe('rival_turn', () => setText('It\'s rival turn. Behold!'));

  pubsub.subscribe('your_turn', () => setText('It\'s your turn. Go get them!'));
}
