import Canvas from "./Canvas";
import Mark from "./Mark";
import { PL } from "../../../consts";
import Arrow from "./Arrow";
import Beam from "./Beam";

class PointLoad {
  
  mag;
  pos;
  direction;
  type = PL;
  label;

  constructor(magnitude, pos, direction) {
    this.direction = direction;
    this.mag = magnitude;
    this.pos = pos;
    this.label = Beam.addLabel(this.pos);

  }

  draw(){
    const ctx = Canvas.context;
    const arrow = new Arrow(this.mag, this.pos, this.direction);
    var x = arrow.x, y = arrow.y, x1 = arrow.x1, y1 = arrow.y1, offset = arrow.offset;
    this.x = x;
    this.y = y;
    var magnitudeTextY = arrow.isUp() ? y + 15 : y - 5;
    ctx.fillText(`${this.mag}`, x, magnitudeTextY);
    new Mark(offset, this.pos);
  }

}

export default PointLoad;
