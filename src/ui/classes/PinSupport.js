import Canvas from "./Canvas";
import Beam from "./Beam";
import Mark from "./Mark";
import { PS } from "../../../consts";
import Load from "./Load";

class PinSupport extends Load {

  x; 
  y; 
  y1; 
  x1;
  offset = 10;
  type = PS;

  pos = 0; // readable/ real value
  label;
  index;
  name = "Pin Support";
  relativePos;
  aPos;

  constructor(offset){
    super();
    this.setOffset(offset);
  }

  setOffset = ({ pos, index }) => {
    let _pos = Beam.getAbsolutePosition({ pos, index })
    this.offset = Beam.getRatioPosition(_pos);
    this.pos = _pos;
    this.label = Beam.addLabel(this.pos);
    this.index = index;
    this.relativePos = pos;
    this.aPos = _pos;
  }

  draw(){
    let ctx = Canvas.context;
    let beamEndY = Beam.endY;

    let x = this.offset;
    
    this.x = x - 10;
    this.x1 = x + 10;
    this.y = beamEndY;
    this.y1 = beamEndY + 20;

    //new Mark(x - Beam.startX, this.pos);
    
    ctx.beginPath();
    ctx.moveTo(x, beamEndY);
    ctx.lineTo(x - 10, beamEndY + 20);
    ctx.lineTo(x + 10, beamEndY + 20);
    ctx.closePath();
    ctx.stroke();
  }

}

export default PinSupport;
