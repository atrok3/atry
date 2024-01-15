import Canvas from "./Canvas";
import Beam from "./Beam";
import Mark from "./Mark";
import { CLR, PS, F, CLL } from "../../../consts";

class FixedSupport {

  x; 
  y; 
  y1; 
  x1;
  offset = 10;
  type = F;

  pos = 0; // readable/ real value
  label;

  constructor(type){    
    this.pos = type == CLL ? 0 : Beam.len;
    this.label = Beam.addLabel(this.pos);
    console.log(this.label);
    
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
