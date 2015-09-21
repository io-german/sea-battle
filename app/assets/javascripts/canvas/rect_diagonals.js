import line from './line.js';

export default function (context, rectangle) {
  line(context, rectangle.top_left(), rectangle.bottom_right());
  line(context, rectangle.bottom_left(), rectangle.top_right());
}
