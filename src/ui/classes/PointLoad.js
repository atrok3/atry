import Canvas from "./Canvas";
import Mark from "./Mark";
import { PL } from "../../../consts";
import Arrow from "./Arrow";

class PointLoad {
  
  mag;
  pos;
  direction;
  type = PL;

  constructor(magnitude, pos, direction) {
    this.direction = direction;
    this.mag = magnitude;
    this.pos = pos;
  
    const ctx = Canvas.context;
    const arrow = new Arrow(magnitude, pos, direction);
    var x = arrow.x, y = arrow.y, x1 = arrow.x1, y1 = arrow.y1, offset = arrow.offset;
    var magnitudeTextY = arrow.isUp() ? y + 15 : y - 5;
    ctx.fillText(`${magnitude}`, x, magnitudeTextY);
    new Mark(offset, pos);
  }

}

export default PointLoad;
