export default function () {
  var rows = [];

  for (let i = 0; i < 10; i++) {
    rows.push(new Array(10).fill(''));
  }

  return rows;
}
