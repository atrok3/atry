import Canvas from "./Canvas";
import Beam from "./Beam";
import Mark from "./Mark";
import { CLR, PS, F, CLL } from "../../../consts";
import Load from "./Load";

class FixedSupport extends Load {

  x; 
  y; 
  y1; 
  x1;
  offset = 10;
  type = F;

  pos = 0; // readable/ real value
  label;
  index;
  name = "Fixed Support";
  relativePos;
  aPos;

  constructor({ type }){
    super();    
    let index  = type == CLL ? "beamstart"  : "beamend";
    let pos = type == CLL ? 0 : Beam.len;
    this.pos = pos;
    let _pos = pos;
    this.offset = Beam.getRatioPosition(_pos);
    this.label = Beam.addLabel(this.pos);
    this.index = index;
    this.relativePos = pos;
    this.aPos = _pos;
  }

  draw(){
    let startX = Beam.type == CLR ? Beam.endX : Beam.startX - 10;
    let startY = Beam.startY - 30;
    let endX = 10;
    let endY = 80;

    let ctx = Canvas.context;
    ctx.beginPath();
    ctx.save();
    ctx.rect(startX, startY, endX, endY);
    ctx.stroke();
    ctx.restore();
  }

}

export default FixedSupport;
