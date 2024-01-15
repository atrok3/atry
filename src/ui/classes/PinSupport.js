import Canvas from "./Canvas";
import Beam from "./Beam";
import Mark from "./Mark";
import { PS } from "../../../consts";

class PinSupport {

  x; 
  y; 
  y1; 
  x1;
  offset = 10;
  type = PS;

  pos = 0; // readable/ real value
  label;

  constructor(offset){
    this.setOffset(offset);
  }

  setOffset = (offset) => {
    this.offset = ((offset * (Beam.endX - Beam.startX)) / Beam.len) + Beam.startX;
    this.pos = offset;
    this.label = Beam.addLabel(this.pos);
  }

  draw(){
    let ctx = Canvas.context;
    let beamEndY = Beam.endY;

    let x = this.offset;
    
    this.x = x - 10;
    this.x1 = x + 10;
    this.y = beamEndY;
    this.y1 = beamEndY + 20;

    new Mark(x - Beam.startX, this.pos);
    
    ctx.beginPath();
    ctx.moveTo(x, beamEndY);
    ctx.lineTo(x - 10, beamEndY + 20);
    ctx.lineTo(x + 10, beamEndY + 20);
    ctx.closePath();
    ctx.stroke();
  }

}

export default PinSupport;
