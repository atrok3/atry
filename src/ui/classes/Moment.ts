import Canvas from "./Canvas";
import Mark from "./Mark";
import { CLOCKWISE, M } from "../../../consts";
import Beam from "./Beam";
import ArrowHead from "./ArrowHead";

class Moment extends ArrowHead {

    mag;
    pos;
    direction;
    type = M;
    x
    y
    offset
    index;
    relativePos;
    aPos;

    isClockwise() {
        return this.direction == CLOCKWISE
    }

    constructor({ mag, pos, direction, index }) {
        super();
        let _pos = Beam.getAbsolutePosition({ pos, index })
        this.direction = direction;
        this.mag = mag;
        this.pos = _pos;
        this.index = index;
        this.offset = Beam.getRatioPosition(_pos);
        this.relativePos = pos;
        this.aPos = _pos;
    }


    draw(){
        const beamStartY = Beam.startY;
        const beamEndY = Beam.endY;
        const beamHeight = Beam.height;

        const ctx: CanvasRenderingContext2D = Canvas.context;

        const {
            pos,
            mag: magnitude,
            offset
        } = this;


        let isAntiClockwise = !this.isClockwise();

        var x = offset;
        var y = beamStartY - beamHeight; //this.isClockwise() ? beamEndY + beamHeight : beamStartY - beamHeight;
        var x1 = x;
        var y1 = isAntiClockwise ? beamEndY : beamStartY;

        this.x = x;
        this.y = y;
        //this.x1 = x1;
        //this.y1 = y1;

        ctx.beginPath();
        //ctx.moveTo(x, y);
        ctx.arc(x, y + 30, 15,  1.5 * Math.PI, 0.5 * Math.PI, isAntiClockwise);
        const arcX = isAntiClockwise ? x - 250 : x + 150;
        this.drawArrow(ctx, arcX, y, x, y + 30 + 15)

        var magnitudeTextY = y + 10;
        ctx.fillText(`${magnitude}`, x, magnitudeTextY);
        
        new Mark(offset - Beam.startX, pos);
      }
}

export default Moment;
