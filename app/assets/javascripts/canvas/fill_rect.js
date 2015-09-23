export default function (context, rect, color) {
  var old_fill_style = context.fillStyle;

  context.fillStyle = color;
  context.fillRect(rect. left, rect.top, rect.width, rect.height);

  context.fillStyle = old_fill_style;
}
