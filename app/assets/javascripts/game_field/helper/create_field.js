export default function () {
  var rows = [];

  for (let i = 0; i < 10; i++) {
    let col = [];

    for (let j = 0; j < 10; j++) {
      col.push('');
    }
    rows.push(col);
  }

  return rows;
}
