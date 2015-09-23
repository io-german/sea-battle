import line from './line.js';

export default function (context, rectangle) {
  line(context, rectangle.topLeft(), rectangle.bottomRight());
  line(context, rectangle.bottomLeft(), rectangle.topRight());
}
