import Model from './model.js';
import View from './view.js';

export default function () {
  var ownField       = document.getElementById('own-field'),
      rivalField     = document.getElementById('rival-field'),
      ownFieldView   = new View(ownField),
      rivalFieldView = new View(rivalField),
      own            = new Model(ownFieldView),
      rival          = new Model(rivalFieldView);

  document.addEventListener('click', function (e) {
    console.log('click');
  });
};
