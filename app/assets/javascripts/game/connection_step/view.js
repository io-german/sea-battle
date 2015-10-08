export default function () {
  var steps = document.getElementsByClassName('step'),
      connectionBlock = document.getElementsByClassName('connection-step')[0],
      input = connectionBlock.getElementsByTagName('input')[0];

  Array.prototype.forEach.call(steps, (step) => step.style.display = 'none');
  input.value = '';
  connectionBlock.style.display = 'block';
}
