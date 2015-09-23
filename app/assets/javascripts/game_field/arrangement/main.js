import view from './view.js';
import Model from './model.js';

export default function () {
  var a = new Model(view);

  console.log(a);
}
