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

    isClockwise() {
        return this.direction == CLOCKWISE
    }

    constructor(magnitude, pos, direction) {
        super();
        this.direction = direction;
        this.mag = magnitude;
        this.pos = pos;

        const beamStartX = Beam.startX;
        const beamStartY = Beam.startY;
        const beamEndY = Beam.endY;
        const beamHeight = Beam.height;
        this.direction = direction;

        const ctx: CanvasRenderingContext2D = Canvas.context;

        let offset = pos * 1;

        // offset in pixels
        offset = (Beam.width * offset) / Beam.len;

        magnitude *= 1;

        var x = beamStartX + offset;
        var y = beamStartY - beamHeight; //this.isClockwise() ? beamEndY + beamHeight : beamStartY - beamHeight;
        var x1 = x;
        var y1 = this.isClockwise() ? beamEndY : beamStartY;

        this.x = x;
        this.y = y;
        //this.x1 = x1;
        //this.y1 = y1;
        this.offset = offset;

        ctx.beginPath();
        //ctx.moveTo(x, y);
        ctx.arc(x, y, 15,  1.5*Math.PI,0.5*Math.PI, this.isClockwise());
        this.drawArrow(ctx, x - 15, y - 15, x, beamStartY)

        var magnitudeTextY = y + 15;
        ctx.fillText(`${magnitude}`, x, magnitudeTextY);
        
        new Mark(offset, pos);
    }

}

export default Moment;
