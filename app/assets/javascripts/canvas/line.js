export default function (context, from, to) {
  context.moveTo(from.x, from.y);
  context.lineTo(to.x, to.y);
}
