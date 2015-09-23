export default function (context, rect, color) {
  var oldFillStyle = context.fillStyle;

  context.fillStyle = color;
  context.fillRect(rect. left, rect.top, rect.width, rect.height);

  context.fillStyle = oldFillStyle;
}
